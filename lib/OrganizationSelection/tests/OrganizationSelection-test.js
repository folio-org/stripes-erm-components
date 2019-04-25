import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { Field } from 'redux-form';
import { expect } from 'chai';

import SelectionInteractor from '@folio/stripes-components/lib/Selection/tests/interactor';
import OrganizationSelectionInteractor from './interactor';

import { setupApplication, dummyMount } from '../../../tests/helpers';
import TestForm from '../../../tests/TestForm';
import OrganizationSelection from '../OrganizationSelection';

describe('OrganizationSelection', () => {
  const selection = new SelectionInteractor();
  const orgSelection = new OrganizationSelectionInteractor();
  setupApplication();

  beforeEach(async function () {
    this.server.createList('organization', 5);

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

  it('is a selection component', () => {
    expect(selection.controlPresent).to.be.true;
  });

  describe('Displays the desired result', () => {
    beforeEach(async () => {
      await orgSelection.clickDropdown();
      await selection.fillFilter('he');
    });

    it('is expected output', () => {
      expect(selection.options(0).val).to.equal('Mathematics');
    });
  });
});
