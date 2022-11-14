import React from 'react';
import { Button, KeyValue } from '@folio/stripes-testing';

import { FormattedMessage } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl } from '@folio/stripes-erm-testing';
import { fileUploaderFieldViewProps } from './testResources';

import { translationsProperties } from '../../test/jest/helpers';

import FileUploaderFieldView from './FileUploaderFieldView';


let renderComponent;
describe('FileUploaderFieldView', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <FileUploaderFieldView
          {...fileUploaderFieldViewProps}
        />
      </MemoryRouter>, translationsProperties
    );
  });

  it('renders expected upload title', () => {
    const { getByText } = renderComponent;
    expect(getByText('Drag & drop to upload')).toBeInTheDocument();
  });

  test('renders the expected \'or choose file\' button', async () => {
    await Button('or choose file').exists();
  });

  it('renders expected max file size label', () => {
    const { getByText } = renderComponent;
    expect(getByText('Maximum file size: 200 MB')).toBeInTheDocument();
  });

  test('renders the File name key with expected value', async () => {
    await KeyValue('File name').has({ value: 'ActionMenu.png' });
  });

  test('renders the Uploaded key value with expected value', async () => {
    await KeyValue('Uploaded').has({ value: '6/22/20229:15 AM' });
  });

  describe('renders FileUploaderFieldView with error message', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <FileUploaderFieldView
          {...fileUploaderFieldViewProps}
          error={<FormattedMessage id="Please check the filesize is 200MB or less and try again" />}
        />,
        translationsProperties
      );
    });

    test('renders error message', () => {
      const { getByText } = renderComponent;
      expect(getByText('Please check the filesize is 200MB or less and try again')).toBeInTheDocument();
    });
  });
});
