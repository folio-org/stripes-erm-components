import React from 'react';
import '../../test/jest/__mock__';
import { Button, Select } from '@folio/stripes-testing';
import { FieldArray } from 'react-final-form-arrays';
import userEvent from '@testing-library/user-event';
import { renderWithIntl, TestForm } from '../../test/jest/helpers';
import { internalContacts, isEmpty } from './testResources';
import translationsProperties from '../../tests/helpers/translationsProperties';
import InternalContactsFieldArray from './InternalContactsFieldArray';

jest.mock('./UserField', () => () => <div>UserField</div>);

const onSubmit = jest.fn();

let renderComponent;
describe('InternalContactsFieldArray', () => {
  describe('InternalContactsFieldArray with contacts', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          initialValues={{}}
          onSubmit={onSubmit}
        >
          <FieldArray
            component={InternalContactsFieldArray}
            {...internalContacts}
          />
        </TestForm>, translationsProperties
      );
    });

    it('renders internal contact 1 header', () => {
      const { getByText } = renderComponent;
      expect(getByText('Internal contact 1')).toBeInTheDocument();
    });

    it('renders remove internal contact 1 tooltip', () => {
      const { getByText } = renderComponent;
      expect(getByText('Remove internal contact 1')).toBeInTheDocument();
    });

    it('renders internal contact 2 header', () => {
      const { getByText } = renderComponent;
      expect(getByText('Internal contact 2')).toBeInTheDocument();
    });

    it('renders remove internal contact 2 tooltip', () => {
      const { getByText } = renderComponent;
      expect(getByText('Remove internal contact 2')).toBeInTheDocument();
    });

    it('renders internal contact 3 header', () => {
      const { getByText } = renderComponent;
      expect(getByText('Internal contact 3')).toBeInTheDocument();
    });

    it('renders remove internal contact 3 tooltip', () => {
      const { getByText } = renderComponent;
      expect(getByText('Remove internal contact 3')).toBeInTheDocument();
    });

    it('renders internal contact 4 header', () => {
      const { getByText } = renderComponent;
      expect(getByText('Internal contact 4')).toBeInTheDocument();
    });

    it('renders remove internal contact 4 tooltip', () => {
      const { getByText } = renderComponent;
      expect(getByText('Remove internal contact 4')).toBeInTheDocument();
    });

    it('renders expected Is set operator', async () => {
      await Select('Role*').exists();
    });

    it('adding/removing fields using the add/remove works as expected', () => {
      const { getByRole, queryAllByTestId } = renderComponent;
      expect(getByRole('button', { name: 'Add internal contact' })).toBeInTheDocument();
      userEvent.click(getByRole('button', { name: 'Add internal contact' }));
      expect(queryAllByTestId(/internalContactsFieldArray\[.*\]/i).length).toEqual(0);
    });

    test('renders the Add internal contact button', async () => {
      await Button('Add internal contact').exists();
    });
  });

  describe('InternalContactsFieldArray with no contacts', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          onSubmit={onSubmit}
        >
          <InternalContactsFieldArray
            {...isEmpty}
          />
        </TestForm>, translationsProperties
      );
    });

    it('renders empty field', () => {
      const { getByText } = renderComponent;
      expect(getByText('No internal contacts for this agreement')).toBeInTheDocument();
    });

    test('renders the Add internal contact button', async () => {
      await Button('Add internal contact').exists();
    });
  });
});

