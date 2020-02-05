import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { Form } from 'react-final-form';
import { Button } from '@folio/stripes/components';
import FormCustomPropertiesInteractor from './FormCustomPropertiesInteractor';
import { dummyMount, setupApplication } from '../../../tests/helpers';
import FormCustomProperties from '../FormCustomProperties';

chai.use(spies);
const { expect, spy } = chai;

const onSubmit = spy();

describe('FormCustomProperties', () => {
  const formCustomPropertiesInteractor = new FormCustomPropertiesInteractor();
  setupApplication();

  let submissions = 0;
  const testSubmit = (values) => (
    describe('submitting the form', () => {
      beforeEach(async () => {
        await formCustomPropertiesInteractor.submit();
        submissions += 1;
      });

      it('should have correct form values', () => {
        expect(onSubmit).on.nth(submissions).be.called.with(values);
      });
    })
  );

  let terms;
  let refDataTypeTerm;
  let integerTypeTerm;
  let textTypeTerm;

  beforeEach(async function () {
    refDataTypeTerm = this.server.create('term', {
      'label': 'refData',
      'name': 'refData term',
      'primary': false,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata',
      'category': {
        desc: 'Yes/No/Other',
        id: '1234',
        values: [
          {
            'id': '345',
            'value': 'no',
            'label': 'No'
          },
          {
            'id': '545',
            'value': 'yes',
            'label': 'Yes'
          },
          {
            'id': '445',
            'value': 'other_(see_notes)',
            'label': 'Other (see notes)'
          }
        ]
      },
    }).attrs;

    integerTypeTerm = this.server.create('term', {
      'label': 'integer',
      'name': 'integer term',
      'primary': false,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger',
    }).attrs;

    textTypeTerm = this.server.create('term', {
      'label': 'text',
      'name': 'text term',
      'primary': false,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText',
    }).attrs;

    terms = [refDataTypeTerm, integerTypeTerm, textTypeTerm];

    await dummyMount(
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormCustomProperties
              customProperties={terms}
              name="customProperties"
              optionalSectionLabel="optional terms"
              primarySectionLabel="primary terms"
              translationKey="term"
            />
            <Button id="submit" type="submit">
              Submit
            </Button>
          </form>
        )}
      />
    );
  });

  it('renders the add button', () => {
    expect(formCustomPropertiesInteractor.isAddButtonPresent).to.be.true;
  });

  describe('handling add', () => {
    beforeEach(async () => {
      await formCustomPropertiesInteractor.clickAddButton();
    });

    it('increments the optional properties count', () => {
      expect(formCustomPropertiesInteractor.optionalPropertiesCount).to.equal(1);
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

    it('renders expected number of options in the name select dropdown', () => {
      expect(formCustomPropertiesInteractor.customPropertyInteractor(0).nameField.optionCount).to.equal(terms.length + 1);
    });

    describe('selecting integer', () => {
      beforeEach(async () => {
        await formCustomPropertiesInteractor.customPropertyInteractor(0).nameField.selectOption('integer');
      });

      it('should render a value field of type number', () => {
        expect(formCustomPropertiesInteractor.customPropertyInteractor(0).valueField.type).to.equal('number');
      });
    });

    describe('selecting text', () => {
      beforeEach(async () => {
        await formCustomPropertiesInteractor.customPropertyInteractor(0).nameField.selectOption('text');
      });

      it('should render a value field of type text', () => {
        expect(formCustomPropertiesInteractor.customPropertyInteractor(0).valueField.type).to.equal('text');
      });
    });

    describe('selecting refData', () => {
      beforeEach(async () => {
        await formCustomPropertiesInteractor.customPropertyInteractor(0).nameField.selectOption('refData');
      });

      it('should render a select dropdown with expected number of options', () => {
        expect(formCustomPropertiesInteractor.customPropertyInteractor(0).valueField.optionCount).to.equal(refDataTypeTerm?.category?.values?.length + 1);
      });
    });
  });

  describe('validation rules', () => {
    beforeEach(async () => {
      await formCustomPropertiesInteractor.clickAddButton();
    });

    describe('Selecting an integer type and entering a number not in range', () => {
      beforeEach(async () => {
        await formCustomPropertiesInteractor.customPropertyInteractor(0).nameField.selectOption('integer');
        await formCustomPropertiesInteractor.customPropertyInteractor(0).fillValue('9007199254740992');
      });

      it('should throw a validation error', () => {
        expect(formCustomPropertiesInteractor.customPropertyInteractor(0).hasError).to.be.true;
      });
    });

    describe('Entering a note without a value', () => {
      beforeEach(async () => {
        await formCustomPropertiesInteractor.customPropertyInteractor(0).nameField.selectOption('integer');
        await formCustomPropertiesInteractor.customPropertyInteractor(0).fillNote('a');
      });

      it('should throw a validation error', () => {
        expect(formCustomPropertiesInteractor.customPropertyInteractor(0).hasError).to.be.true;
      });
    });

    describe('Entering a public note without a value', () => {
      beforeEach(async () => {
        await formCustomPropertiesInteractor.customPropertyInteractor(0).nameField.selectOption('integer');
        await formCustomPropertiesInteractor.customPropertyInteractor(0).fillPublicNote('a');
      });

      it('should throw a validation error', () => {
        expect(formCustomPropertiesInteractor.customPropertyInteractor(0).hasError).to.be.true;
      });
    });

    describe('Toggling visibility without a value', () => {
      beforeEach(async () => {
        await formCustomPropertiesInteractor.customPropertyInteractor(0).nameField.selectOption('integer');
        await formCustomPropertiesInteractor.customPropertyInteractor(0).fillVisibility('i');
      });

      it('should throw a validation error', () => {
        expect(formCustomPropertiesInteractor.customPropertyInteractor(0).hasError).to.be.true;
      });
    });
  });

  describe('submitting the values', () => {
    beforeEach(async () => {
      await formCustomPropertiesInteractor.clickAddButton();
      await formCustomPropertiesInteractor.customPropertyInteractor(0).nameField.selectOption('text');
      await formCustomPropertiesInteractor.customPropertyInteractor(0).fillNote('note');
      await formCustomPropertiesInteractor.customPropertyInteractor(0).fillPublicNote('publicnote');
      await formCustomPropertiesInteractor.customPropertyInteractor(0).fillValue('text');
    });

    testSubmit({
      customProperties: {
        'undefined': [{ '_delete' : true, 'id': undefined }],
        'text term': [{
          'value': 'text',
          'note': 'note',
          'publicNote': 'publicnote',
          '_delete' : undefined,
        }]
      }
    });
  });

  describe('adding 2 terms and deleting one', () => {
    beforeEach(async () => {
      await formCustomPropertiesInteractor.clickAddButton();
      await formCustomPropertiesInteractor.clickAddButton();
      await formCustomPropertiesInteractor.customPropertyInteractor(0).clickDeleteButton();
    });

    it('should have a term count of 1', () => {
      expect(formCustomPropertiesInteractor.count).to.equal(1);
    });
  });
});
