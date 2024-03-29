import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';

import { renderWithIntl, KeyValue } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import contact from './testResources';
import ContactCard from './InternalContactCard';

let renderComponent;
describe('ContactCard', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <Router>
        <ContactCard
          contact={contact}
        />
      </Router>,
      translationsProperties
    );
  });

  test('displays the user name', () => {
    const { getByText } = renderComponent;
    expect(getByText('Hessel, Russell Allen')).toBeInTheDocument();
  });

  test('renders a link to the user', async () => {
    const { getByRole } = renderComponent;
    expect(getByRole('link', { name: 'Hessel, Russell Allen' })).toBeInTheDocument();
  });

  test('displays the user role', () => {
    const { getByText } = renderComponent;
    expect(getByText('ERM Librarian')).toBeInTheDocument();
  });

  test('renders the expected Phone value', async () => {
    await KeyValue('Phone').has({ value: '165.685.1392 x727' });
  });

  test('renders the expected Email address value', async () => {
    await KeyValue('Email address').has({ value: 'blaze@greenholt-llc.sz' });
  });
});
