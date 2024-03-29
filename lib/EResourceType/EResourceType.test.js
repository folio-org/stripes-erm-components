
import React from 'react';
import { renderWithIntl } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import EresourceType from './EResourceType';

const titleInstaceData = {
  resource: {
    id: '55d4023d-80fc-4a30-90d7-32e8aa131160',
    class: 'org.olf.kb.TitleInstance',
    name: "\"Institutions, industrial upgrading, and economic performance in Japan: the 'flying-geese' paradigm of catch-up growth\"",
    suppressFromDiscovery: false,
    // Supposed to have objects and arrays here, but they were incorrectly copied down as a string.
    tags: '[]',
    alternateResourceNames: '[]',
    type: '{id: "2c91809c80b5f04d0180b5f702b7004e", label: "Mo…}',
    publicationType: '{id: "2c91809c80b5f04d0180b5f715ae006c", label: "Bo…}',
    subType: '{id: "2c91809c80b5f04d0180b5f702b0004c", label: "El…}',
    customCoverage: false,
    _object: {},
    rowIndex: 0
  }
};

const packageData = {
  resource : {
    id: '4e2439c3-58f3-4b31-aca3-c05ac15208c3',
    class: 'org.olf.kb.Pkg',
    name: 'AIAA Journals',
    suppressFromDiscovery: false,
    // Supposed to have objects and arrays here, but they were incorrectly copied down as a string.
    tags: '[]',
    alternateResourceNames: '[]',
    customCoverage: false,
    _object: {},
    rowIndex: 1
  }
};

let renderComponent;
describe('EresourceType', () => {
  describe('Eresource type title instance', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <EresourceType
          {...titleInstaceData}
        />,
        translationsProperties
      );
    });

    test('renders the documents name as headline', () => {
      const { getByText } = renderComponent;
      expect(getByText('Title')).toBeInTheDocument();
    });
  });

  describe('Eresource type package', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <EresourceType
          {...packageData}
        />,
        translationsProperties
      );
    });

    test('renders the documents name as headline', () => {
      const { getByText } = renderComponent;
      expect(getByText('Package')).toBeInTheDocument();
    });
  });
});
