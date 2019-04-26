import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { Field } from 'redux-form';
import { expect } from 'chai';
import OrganizationSelectionInteractor from './interactor';
import { setupApplication, dummyMount } from '../../../tests/helpers';
import TestForm from '../../../tests/TestForm';

import OrganizationSelection from '../OrganizationSelection';

describe('OrganizationSelection', () => {
  const orgSelection = new OrganizationSelectionInteractor();
  setupApplication();

  beforeEach(async function () {
    await this.server.createList('organization', 5);
    await dummyMount(
      <TestForm>
        <Field
          id="testId"
          name="organization"
          component={OrganizationSelection}
          path="licenses/org"
        />
      </TestForm>
    );
  });

  it('renders a selection component', () => {
    expect(orgSelection.selectInteractor.controlPresent).to.be.true;
  });

  it('renders the supplied id prop', () => {
    expect(orgSelection.id).to.equal('testId');
  });

  describe('filtering options', () => {
    beforeEach(async () => {
      await orgSelection.clickDropdown();
      await orgSelection.fillFilter('m');
    });

    it('filtering renders expected number of results', () => {
      expect(orgSelection.selectionList.optionCount).to.equal(2);
    });

    it('filtering renders expected option', () => {
      expect(orgSelection.optionsList(0).text).to.equal('Economics');
    });

    it('filtering renders expected second option', () => {
      expect(orgSelection.optionsList(1).text).to.equal('Mathematics');
    });
  });

  describe('Change input', () => {
    beforeEach(async () => {
      await orgSelection.fillFilter('ma');
    });

    it('filtering renders expected option', () => {
      expect(orgSelection.optionsList(0).text).to.equal('Mathematics');
    });

    it('filtering renders expected number of results', () => {
      expect(orgSelection.selectionList.optionCount).to.equal(1);
    });
  });

  describe('Select filtered option', () => {
    beforeEach(async () => {
      await orgSelection.fillFilter('ma');
      await orgSelection.optionsList(0).click;
    });

    it('filter renders selected option', () => {
      expect(orgSelection.optionsList(0).text).to.equal('Mathematics');
    });
  });

  describe('Enter unavailable option', () => {
    beforeEach(async () => {
      await orgSelection.fillFilter('qwer');
    });

    it('filtering renders empty message', () => {
      expect(orgSelection.errorInteractor.text).to.equal('-List is empty-');
    });
  });
});
