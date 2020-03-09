import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';
import CustomPropertiesListInteractor from './CustomPropertiesListInteractor';
import { mountWithContext } from '../../../tests/helpers';
import CustomPropertiesList from '../CustomPropertiesList';

const license = {
  customProperties: {
    authorisedUsers: [
      {
        value: 'testValue',
        note: 'a sample note',
        internal: false,
        publicNote: 'a sample public note',
      },
    ],
    concurrentAccess: [
      {
        value: 'testValue1',
      },
    ],
    copyPrint: [
      {
        value: {
          label: 'Yes',
          value: 'yes'
        }
      }
    ],
    decType: [
      {
        type: {
          type: 'com.k_int.web.toolkit.custprops.types.CustomPropertyDecimal'
        },
        value: 13.33,
      }
    ]
  },
};

const terms = [
  {
    id: '4028808d6a2cf32b016a35ae1b100024',
    name: 'authorisedUsers',
    primary: true,
    label: 'Definition of authorised user',
    description: 'The definition of an authorised user for a resource',
    weight: -1,
    type: 'com.k_int.web.toolkit.custprops.types.CustomPropertyText',
  },
  {
    id: '4028808d6a2cf32b016a35ae19010023',
    name: 'concurrentAccess',
    primary: true,
    label: 'Number of concurrent users allowed',
    description: 'The number of concurrent users allowed by the resource',
    weight: 0,
    type: 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger',
  },
  {
    id: '4028808d6a2cf32b016a35ae1bf90025',
    name: 'walkInAccess',
    primary: true,
    category: {
      id: '4028808d6a2cf32b016a35ae12150017',
      desc: 'Yes/No/Other',
      values: [
        {
          id: '4028808d6a2cf32b016a35ae1236001a',
          value: 'yes',
          label: 'Yes',
        },
        {
          id: '4028808d6a2cf32b016a35ae12340018',
          value: 'other',
          label: 'Other (See Notes)',
        },
        {
          id: '4028808d6a2cf32b016a35ae12360019',
          value: 'no',
          label: 'No',
        },
      ],
    },
    label: 'Walk-in access permitted?',
    description:
      'Can non-members of the library/instittuion use the resource when in the library',
    weight: 0,
    type: 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata',
  },
  {
    id: '4028808d6a2cf32b016a35ae1bf90025',
    name: 'copyPrint',
    primary: true,
    category: {
      id: '4028808d6a2cf32b016a35ae12150017',
      desc: 'Yes/No/Other',
      values: [
        {
          id: '4028808d6a2cf32b016a35ae1236001a',
          value: 'yes',
          label: 'Yes',
        },
        {
          id: '4028808d6a2cf32b016a35ae12340018',
          value: 'other',
          label: 'Other (See Notes)',
        },
        {
          id: '4028808d6a2cf32b016a35ae12360019',
          value: 'no',
          label: 'No',
        },
      ],
    },
    label: 'copy print',
    weight: 0,
    type: 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata',
  },
  {
    id: '4028808d6a2c2b016a35ae19010023',
    name: 'decType',
    primary: true,
    label: 'Decimal type',
    description: 'decimal type',
    weight: 0,
    type: 'com.k_int.web.toolkit.custprops.types.CustomPropertyDecimal',
  },
];

describe('CustomPropertiesList', () => {
  const customPropertiesList = new CustomPropertiesListInteractor();

  beforeEach(async () => {
    await mountWithContext(
      <CustomPropertiesList customProperties={terms} resource={license} />
    );
  });

  it(`renders ${terms.length} license terms`, () => {
    expect(customPropertiesList.count).to.equal(terms.length);
  });

  it('renders a label under a license term', () => {
    expect(customPropertiesList.property(0).isLabelPresent).to.be.true;
  });

  it('renders a value under a license term', () => {
    expect(customPropertiesList.property(0).isValuePresent).to.be.true;
  });

  it('renders visibility under a license term', () => {
    expect(customPropertiesList.property(0).isVisibilityPresent).to.be.true;
  });

  it('renders the expected label under the first license term', () => {
    expect(customPropertiesList.property(0).label).to.equal(terms[0].label);
  });

  it('renders the expected value under the first license term', () => {
    expect(customPropertiesList.property(0).value).to.equal(
      license?.customProperties?.[terms[0].name]?.[0]?.value
    );
  });

  it('renders the expected internal note under the first license term', () => {
    expect(customPropertiesList.property(0).note).to.equal(
      license?.customProperties?.[terms[0].name]?.[0]?.note
    );
  });

  it('renders the expected public note under the first license term', () => {
    expect(customPropertiesList.property(0).publicNote).to.equal(
      license?.customProperties?.[terms[0].name]?.[0]?.publicNote
    );
  });

  it('renders the expected label under the second license term', () => {
    expect(customPropertiesList.property(1).label).to.equal(terms[1].label);
  });

  it('renders the expected value under the second license term', () => {
    expect(customPropertiesList.property(1).value).to.equal(
      license?.customProperties?.[terms[1].name]?.[0]?.value
    );
  });

  it('does not render an internal note under the second license term', () => {
    expect(customPropertiesList.property(1).isNotePresent).to.be.false;
  });

  it('does not render a public note under the second license term', () => {
    expect(customPropertiesList.property(1).isPublicNotePresent).to.be.false;
  });

  it('renders the expected label under the third license term', () => {
    expect(customPropertiesList.property(2).label).to.equal(terms[2].label);
  });

  it('renders the value as Not set under the third license term', () => {
    expect(customPropertiesList.property(2).value).to.equal('Not set');
  });

  it('renders the expected label under the fourth license term', () => {
    expect(customPropertiesList.property(3).label).to.equal(terms[3].label);
  });

  it('renders the value as Yes under the fourth license term', () => {
    expect(customPropertiesList.property(3).value).to.equal(license?.customProperties?.copyPrint[0]?.value?.label);
  });

  it('renders the expected label under the fifth license term', () => {
    expect(customPropertiesList.property(4).label).to.equal(terms[4].label);
  });

  it('renders expected decimal value under the fifth license term', () => {
    expect(customPropertiesList.property(4).value).to.equal('13.33');
  });
});
