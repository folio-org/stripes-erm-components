import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';
import FormCustomPropertiesInteractor from './FormCustomPropertiesInteractor';
import { mountWithContext } from '../../../tests/helpers';
import FormCustomProperties from '../FormCustomProperties';
import TestForm from '../../../tests/TestForm';

const terms = [
  {
    'id': '4028808d6a2cf32b016a35ae1b100024',
    'name': 'authorisedUsers',
    'primary': true,
    'label': 'Definition of authorised user',
    'defaultInternal': true,
    'description': 'The definition of an authorised user for a resource',
    'weight': -1,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText',
  },
  {
    'id': '4028808d6a2cf32b016a35ae19010023',
    'defaultInternal': true,
    'name': 'concurrentAccess',
    'primary': true,
    'label': 'Number of concurrent users allowed',
    'description': 'The number of concurrent users allowed by the resource',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger'
  }
];

const authorisedUsers = [
  {
    'id': 8,
    'internal': true,
    'note': 'test note',
    'value': 'test value',
    'type': {
      'id': '188389636ff1c67f016ff1faf1760042',
      'name': 'adi',
      'primary': false,
      'defaultInternal': true,
      'label': 'sdfsdfsd',
      'description': 'sdfsdf',
      'weight': 2,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
    }
  }
];

const initValue = { authorisedUsers };

describe('FormCustomProperties', () => {
  const formCustomPropertiesInteractor = new FormCustomPropertiesInteractor();

  beforeEach(async () => {
    await mountWithContext(
      <TestForm>
        <FormCustomProperties
          customProperties={terms}
          initialValue={initValue}
          name="customProperties"
          type="terms"
        />
      </TestForm>
    );
  });

  it('renders one custom property', () => {
    expect(formCustomPropertiesInteractor.count).to.equal(1);
  });

  it('renders a label under the first property', () => {
    expect(formCustomPropertiesInteractor.customPropertyInteractor(0).isLabelPresent).to.be.true;
  });

  it('renders a value under the first property', () => {
    expect(formCustomPropertiesInteractor.customPropertyInteractor(0).isValuePresent).to.be.true;
  });

  it('renders an internal note under the first property', () => {
    expect(formCustomPropertiesInteractor.customPropertyInteractor(0).isNotePresent).to.be.true;
  });

  it('renders a visibility field under the first property', () => {
    expect(formCustomPropertiesInteractor.customPropertyInteractor(0).isVisibilityPresent).to.be.true;
  });

  it('renders a public note under the first property', () => {
    expect(formCustomPropertiesInteractor.customPropertyInteractor(0).isPublicNotePresent).to.be.true;
  });

  it('renders expected value under the first property', () => {
    expect(formCustomPropertiesInteractor.customPropertyInteractor(0).label).to.equal(terms.find(item => item.name === 'authorisedUsers').label);
  });

  it('renders expected note under the first property', () => {
    expect(formCustomPropertiesInteractor.customPropertyInteractor(0).note).to.equal(authorisedUsers[0].note);
  });

  it('renders expected visibility set under the first property', () => {
    expect(!!formCustomPropertiesInteractor.customPropertyInteractor(0).visibility).to.equal(authorisedUsers[0].type.defaultInternal);
  });

  it('renders add button', () => {
    expect(formCustomPropertiesInteractor.isAddButtonPresent).to.be.true;
  });

  describe('handling add', () => {
    beforeEach(async () => {
      await formCustomPropertiesInteractor.clickAddButton();
    });

    it('increments the properties count', () => {
      expect(formCustomPropertiesInteractor.count).to.equal(2);
    });
  });
});
