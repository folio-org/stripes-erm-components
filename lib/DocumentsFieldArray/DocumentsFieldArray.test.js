import React from 'react';
import '../../test/jest/__mock__';
import { Button } from '@folio/stripes-testing';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-components/test/jest/helpers';
import { FieldArray } from 'react-final-form-arrays';
import userEvent from '@testing-library/user-event';
import translationsProperties from '../../tests/helpers/translationsProperties';
import DocumentsFieldArray from './DocumentsFieldArray';

jest.mock('./DocumentField', () => () => <div>DocumentField</div>);

const onSubmit = jest.fn();

const documents =
  [
    {
      _delete: false,
      id: 'b4e87de2-8cc5-4bd8-8fdf-3097b4c540c4',
      dateCreated: '2022-03-14T17:13:28Z',
      lastUpdated: '2022-03-14T17:13:28Z',
      fileUpload: {
        id: '623473ba-7f4a-48d4-8916-657dbd440de1',
        contentType: 'image/png',
        size: 47948,
        modified: '2022-03-14T17:13:28Z',
        name: 'Bildschirmfoto 2022-02-28 um 14.52.21.png'
      },
      name: 'document 2'
    },
    {
      _delete: false,
      id: '1033bd93-4971-429f-8100-58d35fa36423',
      dateCreated: '2022-03-14T17:13:28Z',
      lastUpdated: '2022-03-14T17:13:28Z',
      fileUpload: {
        id: '736f70c2-91aa-4a08-9f9d-227a718a9514',
        contentType: 'image/png',
        size: 66859,
        modified: '2022-03-14T17:13:28Z',
        name: 'Bildschirmfoto 2022-02-28 um 17.31.57.png'
      },
      name: 'document 1'
    },
    {
      _delete: false,
      id: 'c2d1e740-6684-4c67-802f-b51bfb15930b',
      dateCreated: '2022-03-14T17:13:28Z',
      lastUpdated: '2022-03-14T17:13:28Z',
      url: 'https://docume.nt',
      name: 'document 3',
      note: 'URL'
    }
  ];

let renderComponent;
describe('DocumentsFieldArray', () => {
  describe('render with empty initial values ', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          onSubmit={onSubmit}
        >
          <FieldArray
            component={DocumentsFieldArray}
            name="documents"
          />
        </TestForm>, translationsProperties
      );
    });
    it('renders empty field', () => {
      const { getByText } = renderComponent;
      expect(getByText('No documents have been added.')).toBeInTheDocument();
    });

    test('renders the Add document button', async () => {
      await Button('Add document').exists();
    });

    it('clicking the add button renders the document field', () => {
      const { getByText, getByRole } = renderComponent;
      userEvent.click(getByRole('button', { name: 'Add document' }));
      expect(getByText('DocumentField')).toBeInTheDocument();
    });

    it('adding/removing fields using the add/remove works as expected', () => {
      const { getByRole, queryAllByTestId } = renderComponent;
      expect(getByRole('button', { name: 'Add document' })).toBeInTheDocument();
      userEvent.click(getByRole('button', { name: 'Add document' }));
      expect(queryAllByTestId(/documentsFieldArray\[.*\]/i).length).toEqual(1);
      userEvent.click(getByRole('button', { name: /trash/i }));
      expect(queryAllByTestId(/documentsFieldArray\[.*\]/i).length).toEqual(0);
    });
  });

  describe('render with initial values set ', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          initialValues={{ documents }}
          onSubmit={onSubmit}
        >
          <FieldArray
            component={DocumentsFieldArray}
            name="documents"
          />
        </TestForm>, translationsProperties
      );
    });

    it('renders expected number of fields', () => {
      const { queryAllByTestId } = renderComponent;
      expect(queryAllByTestId(/documentsFieldArray\[.*\]/).length).toEqual(documents.length);
    });
  });
});

