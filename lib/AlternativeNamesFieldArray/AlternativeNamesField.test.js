import React from 'react';
import '../../test/jest/__mock__';
import { renderWithIntl, TestForm } from '../../test/jest/helpers';
import AlternativeNamesField from './AlternativeNamesField';

import { translationsProperties } from '../../test/jest/helpers';

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
