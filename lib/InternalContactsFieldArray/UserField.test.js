import React from 'react';
import { Field } from 'react-final-form';

import { KeyValue } from '@folio/stripes-testing';
import { MemoryRouter } from 'react-router-dom';

import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import { userField, userFieldNoValue } from './testResources';
import UserField from './UserField';


let renderComponent;
describe('UserField', () => {
  describe('UserField with without noValue', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <TestForm
            initialValues={{
              contacts: [
                {
                  user: 'a23eac4b-955e-451c-b4ff-6ec2f5e63e23'
                }
              ]
            }}
            onSubmit={jest.fn()}
          >
            <Field
              component={UserField}
              name="contacts[0].user"
              {...userField}
            />
          </TestForm>
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
          <TestForm
            initialValues={{
              contacts: [
                {
                  user: '400d6ae0-cc17-49c7-87a8-7642441c5878'
                }
              ]
            }}
            onSubmit={jest.fn()}
          >
            <Field
              component={UserField}
              name="contacts[0].user"
              {...userFieldNoValue}
            />
          </TestForm>
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
      await KeyValue('Phone').has({ value: 'No value set-' });
    });

    test('renders the Email address key value with expected NoValue', async () => {
      await KeyValue('Email address').has({ value: 'No value set-' });
    });

    test('renders a link to the user', async () => {
      const { getByRole } = renderComponent;
      expect(getByRole('link', { name: 'Admin, acq-manager' })).toBeInTheDocument();
    });
  });
});
