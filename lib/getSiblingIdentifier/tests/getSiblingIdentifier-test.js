import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';

import { mountWithContext } from '../../../tests/helpers';

import SiblingIdentifierInteractor from './interactor';
import getSiblingIdentifier from '../getSiblingIdentifier';

import {
  titleInstanceResource,
} from './resources';

chai.use(spies);
const { expect } = chai;

const interactor = new SiblingIdentifierInteractor();

describe('Sibling identifiers', () => {
  describe('issn identifier', () => {
    beforeEach(async () => {
      await mountWithContext(
        <div data-test-sibling-identifier>
          {getSiblingIdentifier(titleInstanceResource._object, 'issn')}
        </div>
      );
    });

    it('renders the expected identifier value', () => {
      expect(interactor.identifier).to.equal('1537-260X');
    });
  });
});
