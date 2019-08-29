import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { Field } from 'redux-form';
import { expect } from 'chai';

import { setupApplication, dummyMount } from '../../../tests/helpers';
import TestForm from '../../../tests/TestForm';
import InternalContactSelection from '../InternalContactSelection';
import InternalContactSelectionInteractor from './interactor';

describe.only('InternalContactSelection', () => {
  const interactor = new InternalContactSelectionInteractor();

  setupApplication();

  beforeEach(async function () {
    await this.server.createList('contact', 10);
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

  describe('filtering options', () => {
    beforeEach(async () => {
      await interactor.clickDropdown();
      await interactor.fillFilter('m');
    });

    it('filtering renders expected number of results', () => {
      expect(interactor.selectionList.optionCount).to.equal(2);
    });

    it('filtering renders expected option', () => {
      expect(interactor.optionsList(0).text).to.equal('Economics');
    });

    it('filtering renders expected second option', () => {
      expect(interactor.optionsList(1).text).to.equal('Mathematics');
    });
  });

  describe('Change input', () => {
    beforeEach(async () => {
      await interactor.fillFilter('ma');
    });

    it('filtering renders expected option', () => {
      expect(interactor.optionsList(0).text).to.equal('Mathematics');
    });

    it('filtering renders expected number of results', () => {
      expect(interactor.selectionList.optionCount).to.equal(1);
    });
  });

  describe('Select filtered option', () => {
    beforeEach(async () => {
      await interactor.fillFilter('ma');
      await interactor.optionsList(0).click;
    });

    it('filter renders selected option', () => {
      expect(interactor.optionsList(0).text).to.equal('Mathematics');
    });
  });

  describe('Enter unavailable option', () => {
    beforeEach(async () => {
      await interactor.fillFilter('qwer');
    });

    it('filtering renders empty message', () => {
      expect(interactor.errorInteractor.text).to.equal('-List is empty-');
    });
  });
});
