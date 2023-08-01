import React from 'react';

import { renderWithIntl, Checkbox, TestForm } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import { checkedFieldPrimaryOrgProps, uncheckedFieldPrimaryOrgProps } from './testResources';
import FieldPrimaryOrg from './FieldPrimaryOrg';


const onSubmit = jest.fn();

let renderComponent;
describe('FieldPrimaryOrg', () => {
  describe('Checked set as primary organization', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          onSubmit={onSubmit}
        >
          <FieldPrimaryOrg
            {...checkedFieldPrimaryOrgProps}
          />
        </TestForm>, translationsProperties
      );
    });

    test('displays the set as primary organization checkbox', async () => {
      await Checkbox('Set as primary organization').exists();
    });


    test('renders Set as primary organization checkbox', () => {
      expect(('checkbox', { name: 'orgs[0].primaryOrg' })).toBeTruthy();
    });
  });

  describe('Unchecked set as primary organization', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          onSubmit={onSubmit}
        >
          <FieldPrimaryOrg
            {...uncheckedFieldPrimaryOrgProps}
          />
        </TestForm>, translationsProperties
      );
    });

    it('renders Set as primary organization component', () => {
      const { getByText } = renderComponent;
      expect(getByText('Set as primary organization')).toBeInTheDocument();
    });

    test('renders unchecked primary organization', async () => {
      await Checkbox('Set as primary organization').is({ checked: false });
    });
  });
});
