import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { FieldArray } from 'react-final-form-arrays';
import CustomPropertiesConfigListFieldArrayInteractor from './CustomPropertiesConfigListFieldArrayInteractor';
import { mountWithContext } from '../../../tests/helpers';
import CustomPropertiesConfigListFieldArray from '../CustomPropertiesConfigListFieldArray';
import TestForm from '../../../tests/TestForm';

chai.use(spies);
const { expect, spy } = chai;

const onDelete = spy();
const onSave = spy();

const terms = [
  {
    'id': '4028808d6a2cf32b016a35ae1b100024',
    'name': 'authorisedUsers',
    'primary': true,
    'label': 'Definition of authorised user',
    'description': 'The definition of an authorised user for a resource',
    'weight': -1,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText',
  },
  {
    'id': '4028808d6a2cf32b016a35ae19010023',
    'name': 'concurrentAccess',
    'primary': true,
    'label': 'Number of concurrent users allowed',
    'description': 'The number of concurrent users allowed by the resource',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger'
  }
];

const supplementaryProperties = [
  {
    'id': '188389637006682d0170066ce9480000',
    'name': 'testName1',
    'primary': true,
    'defaultInternal': true,
    'label': 'test label 1',
    'description': 'test name 1',
    'weight': 10,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger'
  },
  {
    'id': '188389636ff81018016ff82203730000',
    'name': 'testName1',
    'primary': false,
    'defaultInternal': true,
    'label': 'test label 2',
    'description': 'test name 2',
    'weight': 0,
    'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger'
  }
];

describe('CustomPropertiesConfigListFieldArray', () => {
  const customPropertiesConfigListFieldArrayInteractor = new CustomPropertiesConfigListFieldArrayInteractor();

  describe('terms', () => {
    beforeEach(async () => {
      await mountWithContext(
        <TestForm>
          <FieldArray
            component={CustomPropertiesConfigListFieldArray}
            initialValue={terms}
            name="customProperties"
            onDelete={onDelete}
            onSave={onSave}
          />
        </TestForm>
      );
    });

    it(`renders ${terms.length} custom properties`, () => {
      expect(customPropertiesConfigListFieldArrayInteractor.count).to.equal(terms.length);
    });

    it('renders a label under the first term', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isLabelPresent).to.be.true;
    });

    it('renders a description under the first term', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isDescriptionPresent).to.be.true;
    });

    it('renders order weight under the first term', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isOrderWeightPresent).to.be.true;
    });

    it('renders a name under the first term', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isNamePresent).to.be.true;
    });

    it('renders primary term under the first term', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isPrimaryPresent).to.be.true;
    });

    it('renders default visibility under the first term', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isDefaultVisibilityPresent).to.be.true;
    });

    it('renders a type under the first term', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isTypePresent).to.be.true;
    });

    it('renders a delete button under the first term', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isDeleteButtonPresent).to.be.true;
    });

    it('renders an edit button under the first term', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isEditButtonPresent).to.be.true;
    });

    it('renders expected label under the first term', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).label).to.equal(terms[0].label);
    });

    it('renders expected name under the first term', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).name).to.equal(terms[0].name);
    });

    it('renders expected description under the first term', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).description).to.equal(terms[0].description);
    });

    it('renders a new button', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.isNewButtonPresent).to.be.true;
    });

    describe('handling delete', () => {
      beforeEach(async () => {
        await customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).clickDeleteButton();
      });

      it('confirmation modal opens', () => {
        expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).confirmation.isDeleteConfirmationButtonPresent).to.be.true;
      });

      describe('confirm delete', () => {
        beforeEach(async () => {
          await customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).confirmation.clickConfirmDeleteButton();
        });
        it('calls onDelete', () => {
          expect(onDelete).to.have.been.called();
        });
      });
    });

    describe('clicking the new button', () => {
      beforeEach(async () => {
        await customPropertiesConfigListFieldArrayInteractor.clickNewButton();
      });

      it('Increments the field count by 1', () => {
        expect(customPropertiesConfigListFieldArrayInteractor.count).to.equal(terms.length + 1);
      });
    });
  });

  describe('supplementary properties', () => {
    beforeEach(async () => {
      await mountWithContext(
        <TestForm>
          <FieldArray
            component={CustomPropertiesConfigListFieldArray}
            initialValue={supplementaryProperties}
            name="customProperties"
            onDelete={onDelete}
            onSave={onSave}
          />
        </TestForm>
      );
    });

    it(`renders ${supplementaryProperties.length} custom properties`, () => {
      expect(customPropertiesConfigListFieldArrayInteractor.count).to.equal(supplementaryProperties.length);
    });

    it('renders a label under the first supplementary property', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isLabelPresent).to.be.true;
    });

    it('renders a description under the first supplementary property', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isDescriptionPresent).to.be.true;
    });

    it('renders order weight under the first supplementary property', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isOrderWeightPresent).to.be.true;
    });

    it('renders a name under the first supplementary property', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isNamePresent).to.be.true;
    });

    it('renders primary supplementary property under the first supplementary property', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isPrimaryPresent).to.be.true;
    });

    it('renders default visibility under the first supplementary property', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isDefaultVisibilityPresent).to.be.true;
    });

    it('renders a type under the first supplementary property', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isTypePresent).to.be.true;
    });

    it('renders a delete button in the first supplementary property', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isDeleteButtonPresent).to.be.true;
    });

    it('renders an edit button in the first supplementary property', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).isEditButtonPresent).to.be.true;
    });

    it('renders expected label under the first supplementary property', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).label).to.equal(supplementaryProperties[0].label);
    });

    it('renders expected name under the first supplementary property', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).name).to.equal(supplementaryProperties[0].name);
    });

    it('renders expected description under the first supplementary property', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).description).to.equal(supplementaryProperties[0].description);
    });

    it('renders a new button', () => {
      expect(customPropertiesConfigListFieldArrayInteractor.isNewButtonPresent).to.be.true;
    });

    describe('handling delete', () => {
      beforeEach(async () => {
        await customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).clickDeleteButton();
      });

      it('confirmation modal opens', () => {
        expect(customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).confirmation.isDeleteConfirmationButtonPresent).to.be.true;
      });

      describe('confirm delete', () => {
        beforeEach(async () => {
          await customPropertiesConfigListFieldArrayInteractor.customPropertiesConfigField(0).confirmation.clickConfirmDeleteButton();
        });
        it('calls onDelete', () => {
          expect(onDelete).to.have.been.called();
        });
      });
    });

    describe('clicking the new button', () => {
      beforeEach(async () => {
        await customPropertiesConfigListFieldArrayInteractor.clickNewButton();
      });

      it('Increments the field count by 1', () => {
        expect(customPropertiesConfigListFieldArrayInteractor.count).to.equal(supplementaryProperties.length + 1);
      });
    });
  });
});
