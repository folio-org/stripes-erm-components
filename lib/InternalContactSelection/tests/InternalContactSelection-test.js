import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { Field } from 'redux-form';
import { expect } from 'chai';

import { setupApplication, dummyMount } from '../../../tests/helpers';
import TestForm from '../../../tests/TestForm';
import InternalContactSelection from '../InternalContactSelection';
import InternalContactSelectionInteractor from './interactor';

describe('InternalContactSelection', () => {
  const interactor = new InternalContactSelectionInteractor();

  setupApplication();

  let contacts;

  beforeEach(async function () {
    contacts = this.server.createList('contact', 100);

    await dummyMount(
      <TestForm>
        <Field
          id="testId"
          name="contact"
          component={InternalContactSelection}
          path="erm/contacts"
        />
      </TestForm>
    );
  });

  it('renders a selection component', () => {
    expect(interactor.selectInteractor.controlPresent).to.be.true;
  });

  it('renders the supplied id prop', () => {
    expect(interactor.id).to.equal('testId');
  });

  describe('filtering options to one result', () => {
    let contactName;

    beforeEach(async () => {
      contactName = `${contacts[5].user.personal.lastName}, ${contacts[5].user.personal.firstName}`;
      await interactor.clickDropdown();
      await interactor.fillFilter(contactName);
    });

    it('shows only one result', () => {
      expect(interactor.selectionList.optionCount).to.equal(1);
    });
  });

  describe('Enter unavailable option', () => {
    beforeEach(async () => {
      await interactor.fillFilter('qwerty');
    });

    it('filtering renders empty message', () => {
      expect(interactor.errorInteractor.text).to.equal('-List is empty-');
    });
  });
});
