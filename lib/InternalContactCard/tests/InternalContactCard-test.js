import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import { mountWithContext } from '../../../tests/helpers';

import InternalContactCard from '..';
import InternalContactCardInteractor from './interactor';

const interactor = new InternalContactCardInteractor();

describe('InternalContactCard', () => {
  describe('rendering a fully-defined contact', () => {
    const contact = {
      user: {
        id: '123',
        personal: {
          firstName: 'Alice',
          middleName: 'Alicius',
          lastName: 'Alicing',
          phone: '1-416-123-4567',
          email: 'alice@alicing.ca',
        },
      },
      role: {
        label: 'CAO',
      },
    };

    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <InternalContactCard contact={contact} />
        </Router>
      );
    });

    it('renders the card', () => {
      expect(interactor.exists).to.be.true;
    });

    it('renders the first name', () => {
      expect(interactor.name).to.have.string(contact.user.personal.firstName);
    });

    it('renders the middle name', () => {
      expect(interactor.name).to.have.string(contact.user.personal.middleName);
    });

    it('renders the last name', () => {
      expect(interactor.name).to.have.string(contact.user.personal.lastName);
    });

    it('renders a link to the user record page', () => {
      expect(interactor.link).to.have.string(`/users/view/${contact.user.id}`);
    });

    it('renders the phone number', () => {
      expect(interactor.phone).to.equal(contact.user.personal.phone);
    });

    it('renders the email address', () => {
      expect(interactor.email).to.equal(contact.user.personal.email);
    });
  });

  describe('rendering an empty contact', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <InternalContactCard contact={{}} />
        </Router>
      );
    });

    it('renders the card', () => {
      expect(interactor.exists).to.be.true;
    });

    it('renders a placeholder name', () => {
      expect(interactor.name).to.have.string('-'); // THIS WILL NEED CHANGING IN STRIPES 7.2.0
    });

    it('renders a placeholder phone number', () => {
      expect(interactor.phone).to.equal('-');
    });

    it('renders a placeholder email address', () => {
      expect(interactor.email).to.equal('-');
    });
  });
});
