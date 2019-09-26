import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';
import { FieldArray } from 'react-final-form-arrays';
import { TextField } from '@folio/stripes/components';
import { mountWithContext } from '../../../tests/helpers';
import TestForm from '../../../tests/TestForm';
import OrganizationsFieldArray from '../OrganizationsFieldArray';
import OrganizationsFieldArrayInteractor from './interactor';

const addOrganizationBtnLabel = 'Add an organization to get started';
const isEmptyMessage = 'No Organizations added';
const items = [
  {
    id: 'ffb9762b-d499-4451-be22-b3cbc6658093',
    org: {
      id: 'b824be74-3f34-4f6e-a53b-c4f8eb188614',
      name: 'Ro*Co films',
      orgsUuid: '14fb6608-cdf1-11e8-a8d5-f2801f1b9fd1'
    },
    role: 'content_provider'
  },
];

const roles = [
  {
    id: '4028808d6a9800a3016a980223ca0006',
    label: 'Content Provider',
    value: 'content_provider'
  },
  {
    id: '4028808d6a9800a3016a980223d20007',
    label: 'Subscription Agent',
    value: 'subscription_agent'
  },
  {
    id: '4028808d6a9800a3016a980223d90008',
    label: 'Vendor',
    value: 'vendor'
  }
];

describe('OrganizationsFieldArray', () => {
  const interactor = new OrganizationsFieldArrayInteractor();

  beforeEach(async () => {
    await mountWithContext(
      <TestForm>
        <FieldArray
          addOrganizationBtnLabel={addOrganizationBtnLabel}
          component={OrganizationsFieldArray}
          isEmptyMessage={isEmptyMessage}
          name="OrganizationsFieldArrayTest"
          roles={roles}
          items={items}
          organizationPickerComponent={TextField}
        />
      </TestForm>
    );
  });

  it('renders the Add button', () => {
    expect(interactor.hasAddButton).to.be.true;
  });

  it('renders the Add button label', () => {
    expect(interactor.addOrganizationBtnLabel).to.equal(addOrganizationBtnLabel);
  });

  it('renders the empty message', () => {
    expect(interactor.emptyMessage).to.equal(isEmptyMessage);
  });

  describe('clicking the add button', () => {
    beforeEach(async () => {
      await interactor.clickAddButton();
    });

    it('has a field count of 1', () => {
      expect(interactor.count).to.equal(1);
    });

    it('renders an org field', () => {
      expect(interactor.hasOrg).to.be.true;
    });

    it('renders a role field', () => {
      expect(interactor.hasRole).to.be.true;
    });

    describe('setting the org field', () => {
      beforeEach(async () => {
        await interactor.setOrg('a');
      });

      it('sets the org value', () => {
        expect(interactor.orgValue).to.equal('a');
      });
    });

    describe('setting the role field', () => {
      beforeEach(async () => {
        await interactor.setRole('Content Provider');
      });

      it('sets the role value', () => {
        expect(interactor.roleValue).to.equal('content_provider');
      });
    });

    describe('clicking the add button again', () => {
      beforeEach(async () => {
        await interactor.clickAddButton();
      });

      it('has a field count of 2', () => {
        expect(interactor.count).to.equal(2);
      });
    });
  });

  describe('clicking the delete button', () => {
    beforeEach(async () => {
      await interactor.clickAddButton();
      await interactor.clickDeleteButton();
    });

    it('removes a field', () => {
      expect(interactor.count).to.equal(0);
    });
  });
});
