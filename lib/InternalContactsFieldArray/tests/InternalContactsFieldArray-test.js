import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';
import { FieldArray } from 'redux-form';
import { TextField } from '@folio/stripes/components';

import { mountWithContext } from '../../../tests/helpers';
import TestForm from '../../../tests/TestForm';
import InternalContactsFieldArray from '../InternalContactsFieldArray';
import InternalContactsFieldArrayInteractor from './interactor';

const addContactBtnLabel = 'Add contact';
const isEmptyMessage = 'No contacts';
const contactRoles = [
  { value: 'librarian', label: 'Librarian' },
  { value: 'admin', label: 'Admin' },
];

const users = [
  { id: 'a', personal: { lastName: 'Adams' } }
];

describe('InternalContactsFieldArray', () => {
  const interactor = new InternalContactsFieldArrayInteractor();

  beforeEach(async () => {
    await mountWithContext(
      <TestForm>
        <FieldArray
          addContactBtnLabel={addContactBtnLabel}
          component={InternalContactsFieldArray}
          isEmptyMessage={isEmptyMessage}
          name="InternalContactsFieldArrayTest"
          contactRoles={contactRoles}
          users={users}
          userPickerComponent={TextField}
        />
      </TestForm>
    );
  });

  it('renders the Add button', () => {
    expect(interactor.hasAddButton).to.be.true;
  });

  it('renders the Add button label', () => {
    expect(interactor.addContactBtnLabel).to.equal(addContactBtnLabel);
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

    it('renders a user field', () => {
      expect(interactor.hasUser).to.be.true;
    });

    it('renders a role field', () => {
      expect(interactor.hasRole).to.be.true;
    });

    describe('setting the user field', () => {
      beforeEach(async () => {
        await interactor.setUser('a');
      });

      it('sets the user value', () => {
        expect(interactor.userValue).to.equal('a');
      });
    });

    describe('setting the role field', () => {
      beforeEach(async () => {
        await interactor.setRole('Admin');
      });

      it('sets the role value', () => {
        expect(interactor.roleValue).to.equal('admin');
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
