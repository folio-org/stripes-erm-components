import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import { mountWithContext } from '../../../tests/helpers';

import TitleOnPlatformLinkInteractor from './interactor';
import TitleOnPlatformLink from '../TitleOnPlatformLink';

const interactor = new TitleOnPlatformLinkInteractor();

const pti = {
  id: '1234',
  platform: 'platform',
  name: 'title',
  url: 'http://www.title.com'
};

const { id, platform, title, url } = pti;

describe('TitleOnPlatformLink', () => {
  describe('rendering', () => {
    beforeEach(async () => {
      await mountWithContext(
        <Router context={{}}>
          <TitleOnPlatformLink
            id={id}
            name={title}
            platform={platform}
            url={url}
          />
        </Router>
      );
    });

    it('renders the platform', () => {
      expect(interactor.isPlatformNamePresent).to.be.true;
    });

    it('renders the expected platform name', () => {
      expect(interactor.platformName).to.equal(pti.platform);
    });

    it('renders the tooltip', () => {
      expect(interactor.isToolTipPresent).to.be.true;
    });
  });
});
