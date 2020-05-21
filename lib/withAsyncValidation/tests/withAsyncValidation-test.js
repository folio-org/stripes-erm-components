/* eslint-disable react/prop-types */

import React from 'react';
import { describe, beforeEach, it, afterEach } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
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

let name;
const originalFetch = window.fetch;
async function mockFetch() {
  window.fetch = function (url, options) {
    const body = options?.body && JSON.parse(options.body);

    return new Promise(resolve => {
      if (url.includes('erm/validate/subscriptionAgreement/name')) {
        if (name === body.name) {
          return resolve({ status: 422,
            json: () => ({
              'total':1,
              'errors':[
                { 'code':'unique',
                  'object':'org.olf.erm.SubscriptionAgreement',
                  'i18n_code':'org.olf.erm.SubscriptionAgreement.name.unique',
                  'message':`Agreement was not saved. Name must be unique An agreement with the name ${body.name} already exists` }]
            }) });
        } else {
          name = body.name;
          return resolve({});
        }
      } else {
        return resolve({ ok: true, json: () => Promise.resolve({ active: true }) });
      }
    });
  };
}

const WrappedComponent = withAsyncValidation(TextFieldComponent);

describe('withAsyncValidation', () => {
  const interactor = new TextFieldInteractor();
  setupApplication();

  beforeEach(async () => {
    await mockFetch();
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

  afterEach(() => {
    window.fetch = originalFetch;
  });

  describe('Entering a name in the textField', () => {
    beforeEach(async () => {
      await interactor.fillAndBlur('test');
    });

    it('should not throw a validation error', () => {
      expect(interactor.inputError).to.be.false;
    });
  });

  describe('Entering the same name in the textField', () => {
    beforeEach(async () => {
      await interactor.fillAndBlur('test');
    });

    it('should throw a validation error', () => {
      expect(interactor.inputError).to.be.true;
    });
  });
});
