import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';

import { mountWithContext } from '../../../tests/helpers';

import ResourceIdentifierInteractor from './interactor';
import getResourceIdentifier from '../getResourceIdentifier';

import {
  titleInstanceResource,
} from './resources';

chai.use(spies);
const { expect } = chai;

const interactor = new ResourceIdentifierInteractor();

describe('Resource identifier', () => {
  describe('eissn identifier', () => {
    beforeEach(async () => {
      await mountWithContext(
        <div data-test-resource-identifier>
          {getResourceIdentifier(titleInstanceResource._object, 'eissn')}
        </div>
      );
    });

    it('renders the expected identifier value', () => {
      expect(interactor.identifier).to.equal('2159-4260');
    });
  });

  describe('zdb identifier', () => {
    beforeEach(async () => {
      await mountWithContext(
        <div data-test-resource-identifier>
          {getResourceIdentifier(titleInstanceResource._object, 'zdb')}
        </div>
      );
    });

    it('renders the expected identifier value', () => {
      expect(interactor.identifier).to.equal('2065743-2');
    });
  });
});
