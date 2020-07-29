import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';

import { mountWithContext } from '../../../tests/helpers';

import EresourceTypeInteractor from './interactor';
import EResourceType from '../EResourceType';
import {
  titleInstanceResource,
  externalResource,
  packageResource,
  entitlementResource
} from './resources';

chai.use(spies);
const { expect } = chai;

const eresourceType = new EresourceTypeInteractor();

describe('EresourceType', () => {
  describe('titile instance resource', () => {
    beforeEach(async () => {
      await mountWithContext(
        <div data-test-eresource-type>
          <EResourceType
            resource={titleInstanceResource}
          />
        </div>
      );
    });

    it('renders the expected label', () => {
      expect(eresourceType.publicationType).to.equal(titleInstanceResource.publicationType.label);
    });
  });

  describe('external resource', () => {
    beforeEach(async () => {
      await mountWithContext(
        <div data-test-eresource-type>
          <EResourceType
            resource={externalResource}
          />
        </div>
      );
    });

    it('renders the expected label', () => {
      expect(eresourceType.publicationType).to.equal(externalResource.reference_object.publicationType);
    });
  });

  describe('entitlement resource', () => {
    beforeEach(async () => {
      await mountWithContext(
        <div data-test-eresource-type>
          <EResourceType
            resource={entitlementResource}
          />
        </div>
      );
    });

    it('renders the expected label', () => {
      expect(eresourceType.publicationType).to.equal(entitlementResource._object.pti.titleInstance.publicationType.label);
    });
  });

  describe('package resource', () => {
    beforeEach(async () => {
      await mountWithContext(
        <div data-test-eresource-type>
          <EResourceType
            resource={packageResource}
          />
        </div>
      );
    });

    it('renders the expected label', () => {
      expect(eresourceType.publicationType).to.equal('Package');
    });
  });

  describe('empty resource', () => {
    beforeEach(async () => {
      await mountWithContext(
        <div data-test-eresource-type>
          <EResourceType
            resource={{}}
          />
        </div>
      );
    });

    it('renders the expected label', () => {
      expect(eresourceType.publicationType).to.equal('Title');
    });
  });

  describe('undefined resource', () => {
    beforeEach(async () => {
      await mountWithContext(
        <div data-test-eresource-type>
          <EResourceType
            resource={null}
          />
        </div>
      );
    });

    it('renders the expected label', () => {
      expect(eresourceType.publicationType).to.equal('');
    });
  });
});
