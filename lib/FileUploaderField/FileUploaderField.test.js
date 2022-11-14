import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import { fileUploaderFieldProps } from './testResources';

import FileUploaderField from './FileUploaderField';

jest.mock('./FileUploaderFieldView', () => () => <div>FileUploaderFieldView</div>);

let renderComponent;
describe('FileUploaderField', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <FileUploaderField
          {...fileUploaderFieldProps}
        />
      </MemoryRouter>, translationsProperties
    );
  });

  it('renders FileUploaderFieldView component', () => {
    const { getByText } = renderComponent;
    expect(getByText('FileUploaderFieldView')).toBeInTheDocument();
  });
});
