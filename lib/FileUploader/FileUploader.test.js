import React from 'react';
import '../../test/jest/__mock__';
import { Button } from '@folio/stripes-testing';
import { StaticRouter as Router } from 'react-router-dom';
import { renderWithIntl } from '../../test/jest/helpers';

import data from './testResources';
import FileUploader from './FileUploader';
import translationsProperties from '../../tests/helpers/translationsProperties';

const onSubmit = jest.fn();

let renderComponent;
describe('AlternativeNamesFieldArray', () => {
  describe('render with empty initial values ', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Router
          onSubmit={onSubmit}
        >
          <FileUploader
            {...data}
          />
        </Router>, translationsProperties
      );
    });

    it('renders expected upload title', () => {
      const { getByText } = renderComponent;
      expect(getByText('Drag & drop to upload')).toBeInTheDocument();
    });

    it('renders expected test children  ', () => {
      const { getByText } = renderComponent;
      expect(getByText('Test children')).toBeInTheDocument();
    });

    it('renders expected test footer  ', () => {
      const { getByText } = renderComponent;
      expect(getByText('Test footer')).toBeInTheDocument();
    });

    test('renders the or choose file button', async () => {
      await Button('or choose file').exists();
    });
  });
});
