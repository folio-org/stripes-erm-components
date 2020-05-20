/* eslint-disable react/prop-types */

import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { Form, Field } from 'react-final-form';

import { TextField } from '@folio/stripes/components';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import { setupApplication, dummyMount } from '../../../tests/helpers';

import withAsyncValidation from '../withAsyncValidation';

const { expect, spy } = chai;

chai.use(spies);

const checkValidation = spy(() => Promise.resolve());

const TextFieldComponent = (props) => {
  const validateInput = (value, _, meta) => {
    if (!value) return '';
    return props.checkValidation('ui-agreements', 'erm/validate/subscriptionAgreement', value, meta);
  };

  return (
    <Field
      component={TextField}
      data-test-text-field
      label="name"
      name="name"
      validate={validateInput}
    />
  );
};

const WrappedComponent = withAsyncValidation(TextFieldComponent);
setupApplication();

describe('withAsyncValidation', () => {
  const interactor = new TextFieldInteractor('[data-test-text-field]');

  beforeEach(async () => {
    await dummyMount(
      <Form
        onSubmit={() => {}}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <WrappedComponent checkValidation={checkValidation} />
          </form>
        )}
      />
    );
  });
  describe('Fill input', () => {
    beforeEach(async () => {
      await interactor.fill('test');
    });

    it('checkAsyncValidation callback should be called', () => {
      expect(checkValidation).to.have.been.called();
    });

    it('renders expected payload', () => {
      expect(checkValidation).to.have.been.called.with('ui-agreements', 'erm/validate/subscriptionAgreement', 'test');
    });
  });
});
