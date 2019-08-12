import React from 'react';
import { describe, before, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';
import { FieldArray } from 'redux-form';
import { Button } from '@folio/stripes/components';

import { dummyMount, getFindUserModule, setupApplication } from '../../../tests/helpers';
import TestForm from '../../../tests/TestForm';
import InternalContactsFieldArray from '../InternalContactsFieldArray';
import InternalContactsFieldArrayInteractor from './interactor';

const addContactBtnLabel = 'Add contact';
const isEmptyMessage = 'No contacts';
const contactRoles = [
  { value: 'librarian', label: 'Librarian' },
  { value: 'admin', label: 'Admin' },
];
const users = [{
  id: 'alice',
  personal: {
    email: 'alice@alicing.com',
    firstName: 'Alice',
    lastName: 'Alicing',
    phone: '111-111-1111'
  }
}, {
  id: 'bob',
  personal: {
    email: 'bob@bobbington.com',
    firstName: 'Bob',
    lastName: 'Bobbington',
    phone: '222-222-2222'
  }
}];

describe('InternalContactsFieldArray', () => {
  setupApplication();
  const interactor = new InternalContactsFieldArrayInteractor();

  beforeEach(async () => {
    let userToSelect = -1;

    const findUserButtonComponent = props => (
      <Button
        {...props}
        onClick={() => {
          userToSelect += 1;
          return props.selectUser(users[userToSelect]);
        }}
      >
        Select User&nbsp;#
        {userToSelect + 1}
      </Button>
    );

    const findUserModule = getFindUserModule(findUserButtonComponent);

    await dummyMount(
      <TestForm>
        <FieldArray
          addContactBtnLabel={addContactBtnLabel}
          component={InternalContactsFieldArray}
          isEmptyMessage={isEmptyMessage}
          name="InternalContactsFieldArrayTest"
          contactRoles={contactRoles}
          users={users}
        />
      </TestForm>,
      [findUserModule]
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
      expect(interactor.contacts(0).hasLinkUserButton).to.be.true;
    });

    it('renders a role field', () => {
      expect(interactor.contacts(0).hasRole).to.be.true;
    });

    describe('linking a user', () => {
      beforeEach(async () => {
        await interactor.contacts(0).linkUser();
      });

      it('sets the user last name', () => {
        expect(interactor.contacts(0).userLastName).to.equal(users[0].personal.lastName);
      });

      it('sets the user first name', () => {
        expect(interactor.contacts(0).userFirstName).to.equal(users[0].personal.firstName);
      });

      it('sets the user phone', () => {
        expect(interactor.contacts(0).userPhone).to.equal(users[0].personal.phone);
      });

      it('sets the user email', () => {
        expect(interactor.contacts(0).userEmail).to.equal(users[0].personal.email);
      });

      describe('setting the role field', () => {
        beforeEach(async () => {
          await interactor.contacts(0).setRole('Admin');
        });

        it('sets the role value', () => {
          expect(interactor.contacts(0).roleValue).to.equal('admin');
        });
      });

      describe('clicking the add button again', () => {
        beforeEach(async () => {
          await interactor.clickAddButton();
        });

        it('has a field count of 2', () => {
          expect(interactor.count).to.equal(2);
        });

        describe('linking a second user', () => {
          beforeEach(async () => {
            await interactor.contacts(1).linkUser();
          });

          it('sets the user last name', () => {
            expect(interactor.contacts(1).userLastName).to.equal(users[1].personal.lastName);
          });

          it('sets the user first name', () => {
            expect(interactor.contacts(1).userFirstName).to.equal(users[1].personal.firstName);
          });

          it('sets the user phone', () => {
            expect(interactor.contacts(1).userPhone).to.equal(users[1].personal.phone);
          });

          it('sets the user email', () => {
            expect(interactor.contacts(1).userEmail).to.equal(users[1].personal.email);
          });

          describe('deleting the first contact', () => {
            beforeEach(async () => {
              await interactor.contacts(0).clickDeleteButton();
            });

            it('leaves one contact', () => {
              expect(interactor.count).to.equal(1);
            });

            it('does not render the first contact', () => {
              expect(interactor.contacts(0).hasUserLastName).to.be.false;
            });

            it('continues to render the second contact', () => {
              expect(interactor.contacts(1).hasUserLastName).to.be.true;
            });
          });
        });
      });
    });
  });

  describe('clicking the delete button', () => {
    beforeEach(async () => {
      await interactor.clickAddButton();
      await interactor.contacts(0).clickDeleteButton();
    });

    it('removes a field', () => {
      expect(interactor.count).to.equal(0);
    });
  });
});
