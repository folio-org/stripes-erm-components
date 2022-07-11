import React from 'react';
import '../../test/jest/__mock__';
import { Button } from '@folio/stripes-testing';
import { FieldArray } from 'react-final-form-arrays';
import { renderWithIntl, TestForm } from '../../test/jest/helpers';

import { orgFieldArrayProps, emptyOrgFieldArrayProps } from './testResources';
import translationsProperties from '../../tests/helpers/translationsProperties';
import OrganizationsFieldArray from './OrganizationsFieldArray';

jest.mock('./EditOrganizationCard', () => () => <div>EditOrganizationCard</div>);

const onSubmit = jest.fn();

let renderComponent;
describe('OrganizationsFieldArray', () => {
  describe('OrganizationsFieldArray with linked organization', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          initialValues={{}}
          onSubmit={onSubmit}
        >
          <OrganizationsFieldArray
            {...orgFieldArrayProps}
          />
        </TestForm>, translationsProperties
      );
    });

    it('renders EditOrganizationCard component', () => {
      const { getByText } = renderComponent;
      expect(getByText('EditOrganizationCard')).toBeInTheDocument();
    });

    test('renders the Add organization button', async () => {
      await Button('Add organization').exists();
    });
  });

  describe('OrganizationsFieldArray with no organizations linked', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          onSubmit={onSubmit}
        >
          <FieldArray
            component={OrganizationsFieldArray}
            {...emptyOrgFieldArrayProps}
          />
        </TestForm>, translationsProperties
      );
    });

    it('renders empty field', () => {
      const { getByText } = renderComponent;
      expect(getByText('No organizations for this agreement')).toBeInTheDocument();
    });

    test('renders the Add organization button', async () => {
      await Button('Add organization').exists();
    });
  });
});
