import React from 'react';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../test/jest/helpers';
import AlternativeNamesField from './AlternativeNamesField';


const onSubmit = jest.fn();

describe('AlternativeNamesField', () => {
  test('renders expected fields', () => {
    const { getByTestId } = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <AlternativeNamesField
          index={0}
          input={{
            name: 'alternativeNamesFieldTest',
            value: ''
          }}
        />
      </TestForm>, translationsProperties
    );

    expect(getByTestId('alternativeNamesField')).toBeInTheDocument();
  });
});
