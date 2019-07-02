import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';
import { mountWithContext } from '../../../tests/helpers';
import ViewOrganizationCard from '../ViewOrganizationCard';
import ViewOrganizationCardInteractor from './interactor';

const interfaces = [
  {
    id: 'd4009bb9-37da-43a2-8965-296f8dc1f34a',
    name: 'Interface 5485',
    notes: 'Hello world 43106',
    password: 'password #30288',
    uri: 'http://qwerty76126.com',
    username: 'username #90396',
  },
  {
    id: 'd4009bb9-37da-43dc1f34a',
    name: 'Interface 5486',
    notes: 'Hello world 43107',
    password: 'password #30289',
    uri: 'http://abcd.com',
    username: 'username #90397',
  },
];

const org = { name: 'American Chemical Society' };

describe('ViewOrganizationCard', () => {
  const interactor = new ViewOrganizationCardInteractor();

  beforeEach(async () => {
    await mountWithContext(
      <ViewOrganizationCard
        headerStart={<span>Organization</span>}
        interfaces={interfaces}
      />
    );
  });

  it('renders the card', () => {
    expect(interactor.hasCard).to.be.true;
  });

  it('renders the card header', () => {
    expect(interactor.hasHeaderStart).to.be.true;
  });

  it('renders the card body', () => {
    expect(interactor.hasCardBody).to.be.true;
  });

  it('renders a Multi column list', () => {
    expect(interactor.hasMCL).to.be.true;
  });

  describe('Passing org prop', () => {
    beforeEach(async () => {
      await mountWithContext(
        <ViewOrganizationCard
          id="name"
          headerStart={<span>Organization</span>}
          org={org}
        />
      );
    });

    it('renders the org name', () => {
      expect(interactor.name).to.equal(org.name);
    });
  });
});
