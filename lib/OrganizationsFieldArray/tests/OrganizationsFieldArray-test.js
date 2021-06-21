import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';
import { FieldArray } from 'react-final-form-arrays';
import { dummyMount, getPluginModule, setupApplication } from '../../../tests/helpers';
import TestForm from '../../../tests/TestForm';
import OrganizationsFieldArray from '../OrganizationsFieldArray';
import OrganizationsFieldArrayInteractor from './interactor';

const ORG = {
  id: '14fb6608-cdf1-11e8-a8d5-f2801f1b9fd1',
  name: 'Ro*Co films',
};

const items = [
  {
    id: 'ffb9762b-d499-4451-be22-b3cbc6658093',
    note: 'a test note',
    org: {
      id: 'b824be74-3f34-4f6e-a53b-c4f8eb188614',
      name: 'Ro*Co films',
      orgsUuid: '14fb6608-cdf1-11e8-a8d5-f2801f1b9fd1'
    },
    roles: [{
      role: {
        value: 'content_provider',
      }
    }],
  },
];

const roles = [
  {
    id: '4028808d6a9800a3016a980223ca0006',
    label: 'Content provider',
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

const addOrganizationBtnLabel = 'Add an organization to get started';
const isEmptyMessage = 'No Organizations added';

describe('OrganizationsFieldArray', () => {
  setupApplication();
  const interactor = new OrganizationsFieldArrayInteractor();

  beforeEach(async () => {
    const buttonRef = React.createRef();

    const findOrganizationButtonComponent = props => props.renderTrigger({
      buttonRef,
      onClick: () => props.selectVendor(ORG),
    });

    const findOrganizationModule = getPluginModule(findOrganizationButtonComponent, 'find-organization');

    await dummyMount(
      <TestForm>
        <FieldArray
          addOrganizationBtnLabel={addOrganizationBtnLabel}
          component={OrganizationsFieldArray}
          isEmptyMessage={isEmptyMessage}
          items={items}
          name="OrganizationsFieldArrayTest"
          roles={roles}
        />
      </TestForm>,
      [findOrganizationModule]
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

    it('renders a Link Organization button', () => {
      expect(interactor.hasLinkOrgButton).to.be.true;
    });

    it('renders a role field', () => {
      expect(interactor.roles(0).hasRole).to.be.true;
    });

    it('renders a note field', () => {
      expect(interactor.hasNote).to.be.true;
    });

    describe('selecting an org', () => {
      beforeEach(async () => {
        await interactor.setOrg();
      });

      it('renders the organization\'s name', () => {
        expect(interactor.orgText).to.equal(ORG.name);
      });
    });

    describe('setting the role field', () => {
      beforeEach(async () => {
        await interactor.roles(0).setRole('Content provider');
      });

      it('sets the role value', () => {
        expect(interactor.roles(0).roleValue).to.equal('content_provider');
      });
    });

    describe('setting the note field', () => {
      beforeEach(async () => {
        await interactor.setNote('a test note');
      });

      it('sets the note value', () => {
        expect(interactor.noteText).to.equal('a test note');
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
