import React from 'react';
import '../../test/jest/__mock__';
import { MemoryRouter } from 'react-router-dom';
import { fileUploaderFieldProps } from './testResources';
import { renderWithIntl } from '../../test/jest/helpers';

import FileUploaderField from './FileUploaderField';
import translationsProperties from '../../tests/helpers/translationsProperties';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  withStripes: jest.fn((chidren) => chidren),
}));

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
