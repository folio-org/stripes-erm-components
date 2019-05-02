import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';
import { get } from 'lodash';
import LicenseTermsListInteractor from './interactor';
import { mountWithContext } from '../../../tests/helpers';
import LicenseTermsList from '../LicenseTermsList';


const license = {
  customProperties: {
    authorisedUsers: [{
      value: 'testValue'
    }],
    concurrentAccess: [{
      value: 'testValue1'
    }]
  }
};

const terms = [
  {
    'id': '4028808d6a2cf32b016a35ae1b100024',
    'name': 'authorisedUsers',
    'primary': true,
    'label': 'Definition of authorised user',
    'description': 'The definition of an authorised user for a resource',
    'weight': -1,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
  },
  {
    'id': '4028808d6a2cf32b016a35ae19010023',
    'name': 'concurrentAccess',
    'primary': true,
    'label': 'Number of concurrent users allowed',
    'description': 'The number of concurrent users allowed by the resource',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger'
  },
  {
    'id': '4028808d6a2cf32b016a35ae1bf90025',
    'name': 'walkInAccess',
    'primary': true,
    'category': {
      'id': '4028808d6a2cf32b016a35ae12150017',
      'desc': 'Yes/No/Other',
      'values': [
        {
          'id': '4028808d6a2cf32b016a35ae1236001a',
          'value': 'yes',
          'label': 'Yes'
        },
        {
          'id': '4028808d6a2cf32b016a35ae12340018',
          'value': 'other',
          'label': 'Other (See Notes)'
        },
        {
          'id': '4028808d6a2cf32b016a35ae12360019',
          'value': 'no',
          'label': 'No'
        }
      ]
    },
    'label': 'Walk-in access permitted?',
    'description': 'Can non-members of the library/instittuion use the resource when in the library',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
  }
];

describe('LicenseTermsList', () => {
  const licenseTermsList = new LicenseTermsListInteractor();

  beforeEach(async () => {
    await mountWithContext(
      <LicenseTermsList
        license={license}
        terms={terms}
      />
    );
  });

  it(`renders ${terms.length} license terms`, () => {
    expect(licenseTermsList.count).to.equal(terms.length);
  });

  it('renders a label under a license term', () => {
    expect(licenseTermsList.licenseTerm(0).isLabelPresent).to.be.true;
  });

  it('renders a name under a license term', () => {
    expect(licenseTermsList.licenseTerm(0).isValuePresent).to.be.true;
  });

  it('renders the expected label under the first license term', () => {
    expect(licenseTermsList.licenseTerm(0).label).to.equal(terms[0].label);
  });

  it('renders the expected value under the first license term', () => {
    expect(licenseTermsList.licenseTerm(0).value).to.equal(get(license, ['customProperties', terms[0].name, '0', 'value']));
  });

  it('renders the expected label under the second license term', () => {
    expect(licenseTermsList.licenseTerm(1).label).to.equal(terms[1].label);
  });

  it('renders the expected value under the second license term', () => {
    expect(licenseTermsList.licenseTerm(1).value).to.equal(get(license, ['customProperties', terms[1].name, '0', 'value']));
  });

  it('renders the expected label under the third license term', () => {
    expect(licenseTermsList.licenseTerm(2).label).to.equal(terms[2].label);
  });

  it('renders the value as Not set under the third license term', () => {
    expect(licenseTermsList.licenseTerm(2).value).to.equal('Not set');
  });
});
