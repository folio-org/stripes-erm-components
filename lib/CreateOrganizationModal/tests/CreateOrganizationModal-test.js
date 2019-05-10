import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';
import CreateOrganizationModalInteractor from './interactor';
import { setupApplication, dummyMount } from '../../../tests/helpers';

import CreateOrganizationModal from '../CreateOrganizationModal';

describe('CreateOrganizationModal', () => {
  const createOrganizationModal = new CreateOrganizationModalInteractor();
  setupApplication();

  beforeEach(async () => {
    await dummyMount(
      <CreateOrganizationModal
        onClose={() => {}}
        id="testId"
        open
      />
    );
  });

  it('renders a Modal', () => {
    expect(createOrganizationModal.isModalPresent).to.be.true;
  });

  it('renders a TextField', () => {
    expect(createOrganizationModal.isTextFieldPresent).to.be.true;
  });

  it('renders a Button', () => {
    expect(createOrganizationModal.isButtonPresent).to.be.true;
  });

  describe('Create a new organization', () => {
    beforeEach(async () => {
      await createOrganizationModal.textField.fillValue('testOrg');
      await createOrganizationModal.click();
    });

    it('expect inputError to be false', () => {
      expect(createOrganizationModal.textField.inputError).to.be.false;
    });

    describe('Create the same org', () => {
      beforeEach(async () => {
        await createOrganizationModal.click();
      });

      it('expect inputError to be true', () => {
        expect(createOrganizationModal.textField.inputError).to.be.true;
      });
    });
  });
});
