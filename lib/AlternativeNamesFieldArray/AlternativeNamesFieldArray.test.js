import React from 'react';
import '../../test/jest/__mock__';
import { Button } from '@folio/stripes-testing';
import { FieldArray } from 'react-final-form-arrays';
import userEvent from '@testing-library/user-event';
import { renderWithIntl, TestForm } from '../../test/jest/helpers';
import translationsProperties from '../../tests/helpers/translationsProperties';
import AlternativeNamesFieldArray from './AlternativeNamesFieldArray';

jest.mock('./AlternativeNamesField', () => () => <div>AlternativeNamesField</div>);

const onSubmit = jest.fn();

const alternativeNames = [
  {
    'id': '6c92d3f2-b8f6-455c-b2fb-2b9be91256cc',
    'owner': {
      'id': '73067010-a773-42d9-9012-308980b74549'
    },
    'name': 'an1'
  },
  {
    'id': 'b3532b0d-ea14-4e3e-b765-3120879b83df',
    'owner': {
      'id': '73067010-a773-42d9-9012-308980b74549'
    },
    'name': 'an2'
  },
  {
    'id': '70090bc9-8e03-4779-bd9b-8e46d9594312',
    'owner': {
      'id': '73067010-a773-42d9-9012-308980b74549'
    },
    'name': 'an2'
  }
];

let renderComponent;
describe('AlternativeNamesFieldArray', () => {
  describe('render with empty initial values ', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          onSubmit={onSubmit}
        >
          <FieldArray
            component={AlternativeNamesFieldArray}
            name="alternativeNames"
          />
        </TestForm>, translationsProperties
      );
    });

    it('renders headline', () => {
      const { getByText } = renderComponent;
      expect(getByText('Alternative names')).toBeInTheDocument();
    });

    test('renders the Add alternative name button', async () => {
      await Button('Add alternative name').exists();
    });

    it('clicking the add button renders the alternative names field', () => {
      const { getByText, getByRole } = renderComponent;
      userEvent.click(getByRole('button', { name: 'Add alternative name' }));
      expect(getByText('AlternativeNamesField')).toBeInTheDocument();
    });

    it('adding/removing fields using the add/remove works as expected', () => {
      const { getByRole, queryAllByTestId } = renderComponent;
      expect(getByRole('button', { name: 'Add alternative name' })).toBeInTheDocument();
      userEvent.click(getByRole('button', { name: 'Add alternative name' }));
      expect(queryAllByTestId(/alternativeNamesFieldArray\[.*\]/i).length).toEqual(1);
      userEvent.click(getByRole('button', { name: /trash/i }));
      expect(queryAllByTestId(/alternativeNamesFieldArray\[.*\]/i).length).toEqual(0);
    });
  });

  describe('render with initial values set ', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          initialValues={{ alternativeNames }}
          onSubmit={onSubmit}
        >
          <FieldArray
            component={AlternativeNamesFieldArray}
            name="alternativeNames"
          />
        </TestForm>, translationsProperties
      );
    });

    it('renders expected number of fields', () => {
      const { queryAllByTestId } = renderComponent;
      expect(queryAllByTestId(/alternativeNamesFieldArray\[.*\]/).length).toEqual(alternativeNames.length);
    });
  });
});
