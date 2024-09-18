import { StaticRouter as Router } from 'react-router-dom';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  KeyValue,
  Link,
  MultiColumnList,
  MultiColumnListCell,
  renderWithIntl
} from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../test/jest/helpers';

import DocumentCard from './DocumentCard';

const onDownloadFile = jest.fn();

const doc = {
  atType: {
    id: '2c9180b07f436083017f436310040015',
    value: 'misc',
    label: 'Misc'
  },
  dateCreated: '2019-04-19T12:59:29Z',
  id: '4028808d6a2cf32b016a35ae323c003b',
  lastUpdated: '2019-04-19T12:59:29Z',
  location: 'office shelf',
  name: 'A test document attachment',
  note: 'This is a test document attachment',
  url: 'https://a.b.c/e',
  fileUpload: {
    id: '123',
    name: 'file.pdf',
  }
};

let renderComponent;
describe('DocumentCard', () => {
  describe('DocumentCard', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Router>
          <DocumentCard
            key={doc.id}
            hasDownloadPerm
            onDownloadFile={onDownloadFile}
            {...doc}
          />
        </Router>,
        translationsProperties
      );
    });

    test('renders the documents name as headline', () => {
      const { getByText } = renderComponent;
      expect(getByText('A test document attachment')).toBeInTheDocument();
    });

    test('renders the expected note', async () => {
      await KeyValue('Note').has({ value: 'This is a test document attachment' });
    });

    test('renders the expected category', async () => {
      await KeyValue('Category').has({ value: 'Misc' });
    });

    test('renders the documents locations MCL', async () => {
      await MultiColumnList('documents-locations').exists();
    });

    test('renders expected type and reference mcl cells', async () => {
      Promise.all([
        await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: 'Physical location' }),
        await MultiColumnListCell({ row: 0, columnIndex: 1 }).has({ content: 'office shelf ' }),
        await MultiColumnListCell({ row: 1, columnIndex: 0 }).has({ content: 'URL' }),
        await MultiColumnListCell({ row: 1, columnIndex: 1 }).has({ content: 'https://a.b.c/e' }),
        await MultiColumnListCell({ row: 2, columnIndex: 0 }).has({ content: 'File' }),
        await MultiColumnListCell({ row: 2, columnIndex: 1 }).has({ content: 'file.pdf' }),
      ]);
    });

    test('renders a link with the URL', async () => {
      const { getByRole } = renderComponent;
      expect(getByRole('link', { name: 'https://a.b.c/e' })).toBeInTheDocument();
    });

    test('renders a link with the File', async () => {
      const { getByRole } = renderComponent;
      expect(getByRole('link', { name: 'file.pdf' })).toBeInTheDocument();
    });

    test('clicking the file download link', async () => {
      await Link('file.pdf').click();
      await waitFor(async () => {
        expect(onDownloadFile).toHaveBeenCalled();
      });
    });
  });

  describe('DocumentCard with hideCategory', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Router>
          <DocumentCard
            key={doc.id}
            hasDownloadPerm
            hideCategory
            onDownloadFile={onDownloadFile}
            {...doc}
          />
        </Router>,
        translationsProperties
      );
    });

    test('does not render category', async () => {
      await KeyValue('Category').absent();
    });
  });
});
