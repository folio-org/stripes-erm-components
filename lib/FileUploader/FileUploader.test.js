import React from 'react';
import '../../test/jest/__mock__';
import { Button } from '@folio/stripes-testing';
import { StaticRouter as Router } from 'react-router-dom';
import { renderWithIntl } from '../../test/jest/helpers';

import data from './testResources';
import FileUploader from './FileUploader';
import translationsProperties from '../../tests/helpers/translationsProperties';


let renderComponent;
describe('FileUploader', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <Router>
        <FileUploader
          {...data}
        />
      </Router>, translationsProperties
    );
  });

  it('renders expected Drag & drop to upload title', () => {
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
