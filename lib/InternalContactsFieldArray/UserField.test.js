import React from 'react';
import '../../test/jest/__mock__';
import { KeyValue } from '@folio/stripes-testing';
import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl } from '../../test/jest/helpers';
import { userField, userFieldNoValue } from './testResources';
import { translationsProperties } from '../../test/jest/helpers';
import UserField from './UserField';


let renderComponent;
describe('UserField', () => {
  describe('UserField with without noValue', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <UserField
            {...userField}
          />
        </MemoryRouter>, translationsProperties
      );
    });

    it('renders User label', () => {
      const { getByText } = renderComponent;
      expect(getByText('User')).toBeInTheDocument();
    });

    test('renders the Name key value with expected value', async () => {
      await KeyValue('Name').has({ value: 'Bayer, Zora Shea' });
    });

    test('renders the Phone key value with expected value', async () => {
      await KeyValue('Phone').has({ value: '242.169.1046 x52431' });
    });

    test('renders the Email address key value with expected value', async () => {
      await KeyValue('Email address').has({ value: 'esther@cummerata-mclaughlin-and-grant.cd' });
    });

    it('renders no plugin', () => {
      const { getByText } = renderComponent;
      expect(getByText('No "find-user" plugin is installed')).toBeInTheDocument();
    });

    test('renders a link to the user', async () => {
      const { getByRole } = renderComponent;
      expect(getByRole('link', { name: 'Bayer, Zora Shea' })).toBeInTheDocument();
    });
  });

  describe('UserField', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <UserField
            {...userFieldNoValue}
          />
        </MemoryRouter>, translationsProperties
      );
    });

    it('renders User label', () => {
      const { getByText } = renderComponent;
      expect(getByText('User')).toBeInTheDocument();
    });

    test('renders the Name key value with expected value', async () => {
      await KeyValue('Name').has({ value: 'Admin, acq-manager ' });
    });

    test('renders the Phone key value with expected NoValue', async () => {
      await KeyValue('Phone').has({ value: 'stripes-components.noValue.noValueSet-' });
    });

    test('renders the Email address key value with expected NoValue', async () => {
      await KeyValue('Email address').has({ value: 'stripes-components.noValue.noValueSet-' });
    });

    test('renders a link to the user', async () => {
      const { getByRole } = renderComponent;
      expect(getByRole('link', { name: 'Admin, acq-manager' })).toBeInTheDocument();
    });
  });
});
