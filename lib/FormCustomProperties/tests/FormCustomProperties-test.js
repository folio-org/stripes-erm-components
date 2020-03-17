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
  describe('Mount without initial value', () => {
    setupApplication();

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
          await formCustomPropertiesInteractor.customPropertyInteractor(0).blurValue();
        });

        it('should throw a validation error', () => {
          expect(formCustomPropertiesInteractor.customPropertyInteractor(0).hasError).to.be.true;
        });
      });

      describe('Selecting an integer type and entering a non-integer number', () => {
        beforeEach(async () => {
          await formCustomPropertiesInteractor.customPropertyInteractor(0).nameField.selectOption('integer');
          await formCustomPropertiesInteractor.customPropertyInteractor(0).fillValue('10.34');
          await formCustomPropertiesInteractor.customPropertyInteractor(0).blurValue();
        });

        it('should throw a validation error', () => {
          expect(formCustomPropertiesInteractor.customPropertyInteractor(0).hasError).to.be.true;
        });
      });

      describe('entering a note without a value', () => {
        beforeEach(async () => {
          await formCustomPropertiesInteractor.customPropertyInteractor(0).nameField.selectOption('integer');
          await formCustomPropertiesInteractor.customPropertyInteractor(0).fillValue();
          await formCustomPropertiesInteractor.customPropertyInteractor(0).blurValue();
          await formCustomPropertiesInteractor.customPropertyInteractor(0).fillNote('a');
          await formCustomPropertiesInteractor.customPropertyInteractor(0).blurNote();
        });

        it('should throw a validation error', () => {
          expect(formCustomPropertiesInteractor.customPropertyInteractor(0).hasError).to.be.true;
        });
      });

      describe('entering a public note without a value', () => {
        beforeEach(async () => {
          await formCustomPropertiesInteractor.customPropertyInteractor(0).nameField.selectOption('integer');
          await formCustomPropertiesInteractor.customPropertyInteractor(0).fillValue();
          await formCustomPropertiesInteractor.customPropertyInteractor(0).blurValue();
          await formCustomPropertiesInteractor.customPropertyInteractor(0).fillPublicNote('a');
          await formCustomPropertiesInteractor.customPropertyInteractor(0).blurPublicNote();
        });

        it('should throw a validation error', () => {
          expect(formCustomPropertiesInteractor.customPropertyInteractor(0).hasError).to.be.true;
        });
      });

      describe('toggling visibility without a value', () => {
        beforeEach(async () => {
          await formCustomPropertiesInteractor.customPropertyInteractor(0).nameField.selectOption('integer');
          await formCustomPropertiesInteractor.customPropertyInteractor(0).fillValue();
          await formCustomPropertiesInteractor.customPropertyInteractor(0).blurValue();
          await formCustomPropertiesInteractor.customPropertyInteractor(0).fillVisibility('internal');
          await formCustomPropertiesInteractor.customPropertyInteractor(0).blurVisibility();
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
        await formCustomPropertiesInteractor.customPropertyInteractor(0).visibilityField.selectOption('Internal');
      });

      testSubmit({
        customProperties: {
          'undefined': [{ '_delete' : true, 'id': undefined }],
          'text term': [{
            'internal': 'true',
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

  describe('Mount with initialValue', () => {
    setupApplication();

    let initialValue;
    beforeEach(async () => {
      terms = [
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
          'note': 'internal authorised users note',
          'publicNote': 'public authorised users note',
          'value': 'authorised users value',
          'type': {
            'id': '188389636ff1c67f016ff1faf1760042',
            'name': 'authorised users',
            'primary': false,
            'defaultInternal': true,
            'label': '',
            'description': 'desc',
            'weight': 2,
            'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
          }
        }
      ];

      initialValue = { authorisedUsers };

      await dummyMount(
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormCustomProperties
                customProperties={terms}
                initialValue={initialValue}
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

    describe('initialValue term', () => {
      it('should render the expected label', () => {
        expect(formCustomPropertiesInteractor.customPropertyInteractor(0).label).to.equal(terms[0].label);
      });

      it('should render the expected value', () => {
        expect(formCustomPropertiesInteractor.customPropertyInteractor(0).value).to.equal(initialValue?.[terms[0].name]?.[0]?.value);
      });

      it('should render the expected internal note', () => {
        expect(formCustomPropertiesInteractor.customPropertyInteractor(0).note).to.equal(initialValue?.[terms[0].name]?.[0]?.note);
      });

      it('should render the expected public note', () => {
        expect(formCustomPropertiesInteractor.customPropertyInteractor(0).publicNote).to.equal(initialValue?.[terms[0].name]?.[0]?.publicNote);
      });

      it('should render the expected visibiliy', () => {
        expect(!!formCustomPropertiesInteractor.customPropertyInteractor(0).visibility).to.equal(initialValue?.[terms[0].name]?.[0]?.internal);
      });

      it('should not render a delete button', () => {
        expect(formCustomPropertiesInteractor.customPropertyInteractor(0).isDeleteBtnPresent).to.be.false;
      });
    });
  });
});
