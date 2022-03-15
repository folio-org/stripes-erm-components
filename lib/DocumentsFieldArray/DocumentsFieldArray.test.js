import React from 'react';
import { waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '../../test/jest/__mock__';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-components/test/jest/helpers';
import { FieldArray } from 'react-final-form-arrays';

import DocumentsFieldArray from './DocumentsFieldArray';

import translationsProperties from '../../tests/helpers';

const onSubmit = jest.fn();

jest.mock('./DocumentField', () => () => <div>DocumentField</div>);

jest.mock('@folio/stripes-components/lib/Icon', () => {
  return (props) => <span>Icon</span>;
});

const documents =
  [
    {
      'id': 'b4e87de2-8cc5-4bd8-8fdf-3097b4c540c4',
      'dateCreated': '2022-03-14T17:13:28Z',
      'lastUpdated': '2022-03-14T17:13:28Z',
      'fileUpload': {
        'id': '623473ba-7f4a-48d4-8916-657dbd440de1',
        'contentType': 'image/png',
        'size': 47948,
        'modified': '2022-03-14T17:13:28Z',
        'name': 'Bildschirmfoto 2022-02-28 um 14.52.21.png'
      },
      'name': 'document 2'
    },
    {
      'id': '1033bd93-4971-429f-8100-58d35fa36423',
      'dateCreated': '2022-03-14T17:13:28Z',
      'lastUpdated': '2022-03-14T17:13:28Z',
      'fileUpload': {
        'id': '736f70c2-91aa-4a08-9f9d-227a718a9514',
        'contentType': 'image/png',
        'size': 66859,
        'modified': '2022-03-14T17:13:28Z',
        'name': 'Bildschirmfoto 2022-02-28 um 17.31.57.png'
      },
      'name': 'document 1'
    },
    {
      'id': 'c2d1e740-6684-4c67-802f-b51bfb15930b',
      'dateCreated': '2022-03-14T17:13:28Z',
      'lastUpdated': '2022-03-14T17:13:28Z',
      'url': 'https://docume.nt',
      'name': 'document 3',
      'note': 'URL'
    }
  ];


describe('DocumentsFieldArray', () => {
  test('renders expected fields', () => {
    const { getByTestId } = renderWithIntl(
      <TestForm
        initialValues={{ documentsFieldArrayTest: documents }}
        onSubmit={onSubmit}
      >
        <FieldArray
          addDocBtnLabel="stripes-erm-components.doc.addDoc"
          // deleteBtnTooltipMsgId="ui-agreements.doc.removeSupplementaryInformation"
          component={DocumentsFieldArray}
          id="documents-field-array-test"
          name="documentsFieldArrayTest"
        />
      </TestForm>, translationsProperties
    );

    // renders field array component
    expect(getByTestId('documentsFieldArray')).toBeInTheDocument();
    // expect(getByText('Supplementary documents')).toBeInTheDocument();
    // renders a documentsField component within that
    // expect(getByTestId('documentsFieldArray[0]')).toBeInTheDocument();
  });
});

/* describe('DocumentsFieldArray', () => {
  describe('render with empty initial values', () => {
    let renderComponent;
    beforeEach(async () => {
      renderComponent = renderWithIntl(
        <TestForm
          initialValues={{}}
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
      expect(getByText('No supplementary documents for this agreement')).toBeInTheDocument();
    });
  });
}); */

