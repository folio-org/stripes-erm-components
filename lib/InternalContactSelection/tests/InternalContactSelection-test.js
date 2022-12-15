import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { Field } from 'react-final-form';
import { expect } from 'chai';

import { setupApplication, dummyMount } from '../../../tests/helpers';
import TestForm from '../../../tests/TestForm';
import InternalContactSelection from '../InternalContactSelection';
import InternalContactSelectionInteractor from './interactor';

const NUMBER_OF_CONTACTS = 200;

describe.skip('InternalContactSelection', () => {
  const interactor = new InternalContactSelectionInteractor();

  setupApplication();

  let contacts;

  beforeEach(async function () {
    contacts = this.server.createList('contact', NUMBER_OF_CONTACTS);

    await dummyMount(
      <TestForm>
        <Field
          component={InternalContactSelection}
          id="testId"
          name="contact"
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

  describe('opening the dropdown', () => {
    beforeEach(async () => {
      await interactor.clickDropdown();
    });

    it('shows all results from multiple "perPage" fetches', () => {
      expect(interactor.selectionList.optionCount).to.equal(NUMBER_OF_CONTACTS);
    });
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

  describe('entering an unavailable option', () => {
    beforeEach(async () => {
      await interactor.clickDropdown();
      await interactor.fillFilter('qwerty');
    });

    it('renders empty message', () => {
      expect(interactor.errorInteractor.text).to.equal('-List is empty-');
    });
  });
});
