import React from 'react';
import '../../test/jest/__mock__';
import { StaticRouter as Router } from 'react-router-dom';
import { Tooltip } from '@folio/stripes-testing';
import { renderWithIntl } from '../../test/jest/helpers';
import { translationsProperties } from '../../test/jest/helpers';

import TitleOnPlatformLink from './TitleOnPlatformLink';

const props = {
  'id': 'a81e1d55-761f-4e38-a68c-27c371ab97c6',
  'name': "'19th century music' on Platform 'JSTOR'",
  'platform': 'JSTOR',
  'url': 'http://www.jstor.org/action/showPublication?journalCode=19thcenturymusic'
};

const nullProps = {
  'id': 'a81e1d55-761f-4e38-a68c-27c371ab97c6',
  'name': "'19th century music' on Platform 'JSTOR'",
  'platform': '',
  'url': ''
};

let renderComponent;
describe('TitleOnPlatformLink', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <Router>
        <TitleOnPlatformLink
          {...props}
        />
      </Router>,
      translationsProperties
    );
  });

  test('renders expected platform ', () => {
    const { getByText } = renderComponent;
    expect(getByText('JSTOR')).toBeInTheDocument();
  });

  test('renders the expected title', () => {
    const { getByText } = renderComponent;
    expect(getByText('Title on platform')).toBeInTheDocument();
  });

  test('renders the expected platform name', () => {
    const { getByText } = renderComponent;
    expect(getByText('Access \'19th century music\' on Platform \'JSTOR\'')).toBeInTheDocument();
  });

  test('renders the expectrd tooltip', () => {
    Tooltip('Access \'19th century music\' on Platform \'JSTOR\'').exists();
  });

  test('renders a link to the expected platform', async () => {
    const { getByRole } = renderComponent;
    expect(getByRole('link', { name: 'Title on platform' })).toBeInTheDocument();
  });

  describe('TitleOnPlatformLink without a linked platform', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Router>
          <TitleOnPlatformLink
            {...nullProps}
          />
        </Router>,
        translationsProperties
      );
    });

    test('renders expected platform ', () => {
      const { getByText } = renderComponent;
      expect(getByText('JSTOR')).toBeInTheDocument();
    });
  });
});
