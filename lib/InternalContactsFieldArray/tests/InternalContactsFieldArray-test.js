import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';
import { FieldArray } from 'react-final-form-arrays';
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
    middleName: 'Alicius',
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
}, {
  id: 'cat'
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
          return props.selectUser(users[userToSelect]); // eslint-disable-line react/prop-types
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

      it('renders the user\'s first name', () => {
        expect(interactor.contacts(0).userName).to.have.string(users[0].personal.firstName);
      });

      it('renders the user\'s middle name', () => {
        expect(interactor.contacts(0).userName).to.have.string(users[0].personal.middleName);
      });

      it('renders the user\'s last name', () => {
        expect(interactor.contacts(0).userName).to.have.string(users[0].personal.lastName);
      });

      it('renders the user\'s phone', () => {
        expect(interactor.contacts(0).userPhone).to.equal(users[0].personal.phone);
      });

      it('renders the user\'s email', () => {
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

          it('renders the user\'s first name', () => {
            expect(interactor.contacts(1).userName).to.have.string(users[1].personal.firstName);
          });

          it('renders the user\'s last name', () => {
            expect(interactor.contacts(1).userName).to.have.string(users[1].personal.lastName);
          });

          it('renders the user phone', () => {
            expect(interactor.contacts(1).userPhone).to.equal(users[1].personal.phone);
          });

          it('renders the user email', () => {
            expect(interactor.contacts(1).userEmail).to.equal(users[1].personal.email);
          });

          describe('unselecting the first contact', () => {
            beforeEach(async () => {
              await interactor.contacts(0).unlinkUser();
            });

            it('shows an isEmpty message', () => {
              expect(interactor.contacts(0).isEmpty).to.be.true;
            });

            it('continues to render the second contact', () => {
              expect(interactor.contacts(1).hasName).to.be.true;
            });
          });

          describe('deleting the first contact', () => {
            beforeEach(async () => {
              await interactor.contacts(0).clickDeleteButton();
            });

            it('leaves one contact', () => {
              expect(interactor.count).to.equal(1);
            });

            it('does not render the first contact', () => {
              expect(interactor.contacts(0).hasName).to.be.false;
            });

            it('continues to render the second contact', () => {
              expect(interactor.contacts(1).hasName).to.be.true;
            });
          });
        });
      });
    });
  });

  describe('rendering default user values', () => {
    beforeEach(async () => {
      await interactor.clickAddButton();
      await interactor.clickAddButton();
      await interactor.clickAddButton();
      await interactor.contacts(0).linkUser();
      await interactor.contacts(1).linkUser();
      await interactor.contacts(2).linkUser();
    });

    it('renders a placeholder name', () => {
      expect(interactor.contacts(2).userName).to.have.string('-');
    });

    it('renders a placeholder phone', () => {
      expect(interactor.contacts(2).userPhone).to.equal('-');
    });

    it('renders a placeholder email', () => {
      expect(interactor.contacts(2).userEmail).to.equal('-');
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
