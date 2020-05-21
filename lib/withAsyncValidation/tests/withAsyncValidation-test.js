/* eslint-disable react/prop-types */

import React from 'react';
import { describe, beforeEach, it, afterEach } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { faker } from '@bigtest/mirage';

import { Form, Field } from 'react-final-form';

import { TextField } from '@folio/stripes/components';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import { setupApplication, dummyMount } from '../../../tests/helpers';

import withAsyncValidation from '../withAsyncValidation';

const { expect } = chai;

chai.use(spies);

const TextFieldComponent = (props) => {
  const validateInput = (value, _, meta) => {
    if (!value) return '';
    return props.checkAsyncValidation('ui-agreements', 'erm/validate/subscriptionAgreement', value, meta);
  };

  return (
    <Field
      component={TextField}
      label="name"
      name="name"
      validate={validateInput}
    />
  );
};

function generateErrors(errorCount) {
  return Array(errorCount).fill().map(index => (
    {
      'code': faker.random.word(),
      'object': faker.random.word(),
      'i18n_code': faker.random.word(),
      'message': `error message ${index + 1}`,
    }));
}

function jsonMock({ valid, errorCount }, name) {
  const errors = generateErrors(errorCount, name);
  return !valid ? {
    status: 422,
    json: () => ({
      'total': errorCount,
      errors
    })
  } : {};
}

const originalFetch = window.fetch;
async function mockFetch(jsonMockParams) {
  window.fetch = function (url, options) {
    const body = options?.body && JSON.parse(options.body);
    return new Promise((resolve, reject) => {
      if (url.includes('erm/validate/subscriptionAgreement/name')) {
        return resolve(jsonMock(jsonMockParams, body.name));
      } else if (url.includes('saml/check')) {
        return resolve({ ok: true, json: () => Promise.resolve({ active: true }) });
      } else {
        return originalFetch(url, options)
          .then(resp => resolve(resp))
          .catch(error => reject(error));
      }
    });
  };
}

const WrappedComponent = withAsyncValidation(TextFieldComponent);

const number = Math.round(Math.random() * 100000);
const name = `Agreement #${number}`;

describe('withAsyncValidation', () => {
  const interactor = new TextFieldInteractor();

  setupApplication();

  beforeEach(async () => {
    await dummyMount(
      <Form
        onSubmit={() => {}}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <WrappedComponent />
          </form>
        )}
      />
    );
  });

  describe('Entering a name in the textField', () => {
    beforeEach(async () => {
      await mockFetch({ valid: true });
      await interactor.fillAndBlur(name);
    });

    afterEach(() => {
      window.fetch = originalFetch;
    });

    it('should not throw a validation error', () => {
      expect(interactor.inputError).to.be.false;
    });
  });

  describe('Entering the same name in the textField with one validation error', () => {
    beforeEach(async () => {
      await mockFetch({ valid: false, errorCount: 1 });
      await interactor.fillAndBlur(name);
    });

    afterEach(() => {
      window.fetch = originalFetch;
    });

    it('should throw a validation error', () => {
      expect(interactor.inputError).to.be.true;
    });
  });

  describe('Entering the same name in the textField with two validation errors', () => {
    beforeEach(async () => {
      await mockFetch({ valid: false, errorCount: 2 });
      await interactor.fillAndBlur(name);
    });

    afterEach(() => {
      window.fetch = originalFetch;
    });

    it('should throw a validation error', () => {
      expect(interactor.inputError).to.be.true;
    });
  });
});
