import React from 'react';
import '../../test/jest/__mock__';
import { StaticRouter as Router } from 'react-router-dom';
import { renderWithIntl } from '../../test/jest/helpers';
import translationsProperties from '../../tests/helpers/translationsProperties';

import Embargo from './Embargo';

const embargoWallStart = {
  'alignment': 'left',
  'embargo': {
    'movingWallStart': {
      'length': 6,
      'unit': 'years'
    }
  }
};

const embargoWallEnd = {
  'alignment': 'left',
  'embargo': {
    'movingWallEnd': {
      'length': 4,
      'unit': 'years'
    }
  }
};

let renderComponent;
describe('Embargo', () => {
  describe('renders Embargo component with moving wall start', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Router>
          <Embargo
            {...embargoWallStart}
          />
        </Router>,
        translationsProperties
      );
    });

    test('renders the expected embargo moving wall start', () => {
      const { getByText } = renderComponent;
      expect(getByText('Moving wall start:')).toBeInTheDocument();
    });

    test('renders the expected embargo start unit', () => {
      const { getByText } = renderComponent;
      expect(getByText('6 years')).toBeInTheDocument();
    });
  });

  describe('renders Embargo component with moving wall end', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Router>
          <Embargo
            {...embargoWallEnd}
          />
        </Router>,
        translationsProperties
      );
    });

    test('renders the expected embargo moving wall end', () => {
      const { getByText } = renderComponent;
      expect(getByText('Moving wall end:')).toBeInTheDocument();
    });

    test('renders the expected embargo end unit', () => {
      const { getByText } = renderComponent;
      expect(getByText('4 years')).toBeInTheDocument();
    });
  });
});
