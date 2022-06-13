
import React from 'react';
import '../../test/jest/__mock__';
import { renderWithIntl } from '../../test/jest/helpers';
import translationsProperties from '../../tests/helpers/translationsProperties';

import EresourceType from './EResourceType';

const titleInstaceData = {
  resource: {
    id: '55d4023d-80fc-4a30-90d7-32e8aa131160',
    class: 'org.olf.kb.TitleInstance',
    name: "\"Institutions, industrial upgrading, and economic performance in Japan: the 'flying-geese' paradigm of catch-up growth\"",
    suppressFromDiscovery: false,
    tags: '[]',
    alternateResourceNames: '[]',
    type: '{id: "2c91809c80b5f04d0180b5f702b7004e", label: "Mo…}',
    publicationType: '{id: "2c91809c80b5f04d0180b5f715ae006c", label: "Bo…}',
    subType: '{id: "2c91809c80b5f04d0180b5f702b0004c", label: "El…}',
    customCoverage: false,
    object: '{alternateResourceNames: Array(0), class: "org.olf.…}',
    rowIndex: 0
  }
};

const packageData = {
  resource : {
    id: '4e2439c3-58f3-4b31-aca3-c05ac15208c3',
    class: 'org.olf.kb.Pkg',
    name: 'AIAA Journals',
    suppressFromDiscovery: false,
    tags: '[]',
    alternateResourceNames: '[]',
    customCoverage: false,
    _object: '{alternateResourceNames: Array(0), class: "org.olf.…}',
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
