import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { FieldArray } from 'react-final-form-arrays';
import { mountWithContext } from '../../../tests/helpers';
import TestForm from '../../../tests/TestForm';
import DocumentsFieldArray from '../DocumentsFieldArray';
import DocumentsFieldArrayInteractor from './interactor';

chai.use(spies);
const { expect, spy } = chai;

const uploadedFile = { id: '1', name: 'Test File', modified: Date.now() };
const onDownloadFile = spy();
const onUploadFile = spy(() => {
  const blob = new Blob([JSON.stringify(uploadedFile, null, 2)], { type: 'application/json' });
  const init = { 'status': 200, 'statusText': 'OK' };
  const myResponse = new Response(blob, init);
  return Promise.resolve(myResponse);
});

const addDocBtnLabel = 'Add document';
const isEmptyMessage = 'No documents';

const interactor = new DocumentsFieldArrayInteractor();

describe('DocumentsFieldArray', () => {
  beforeEach(async () => {
    await mountWithContext(
      <TestForm>
        <FieldArray
          addDocBtnLabel={addDocBtnLabel}
          component={DocumentsFieldArray}
          documentCategories={[
            { value: 'foo', label: 'Foo' },
            { value: 'bar', label: 'Bar' },
          ]}
          isEmptyMessage={isEmptyMessage}
          name="DocumentsFieldArrayTest"
          onDownloadFile={onDownloadFile}
          onUploadFile={onUploadFile}
        />
      </TestForm>
    );
  });

  it('renders the Add button', () => {
    expect(interactor.hasAddButton).to.be.true;
  });

  it('renders the Add button label', () => {
    expect(interactor.addDocBtnLabel).to.equal(addDocBtnLabel);
  });

  it('renders the empty message', () => {
    expect(interactor.emptyMessage).to.equal(isEmptyMessage);
  });

  describe('clicking the add button', () => {
    beforeEach(async () => {
      await interactor.clickAddButton();
    });

    it('has a field count of 1', () => {
      expect(interactor.count).to.equal(1);
    });

    it('renders a name field', () => {
      expect(interactor.hasName).to.be.true;
    });

    it('renders a note field', () => {
      expect(interactor.hasNote).to.be.true;
    });

    it('renders a location field', () => {
      expect(interactor.hasLocation).to.be.true;
    });

    it('renders a url field', () => {
      expect(interactor.hasUrl).to.be.true;
    });

    it('renders a category field', () => {
      expect(interactor.hasCategory).to.be.true;
    });

    it('renders a file field', () => {
      expect(interactor.hasFile).to.be.true;
    });

    describe('clicking the add button again', () => {
      beforeEach(async () => {
        await interactor.clickAddButton();
      });

      it('has a field count of 2', () => {
        expect(interactor.count).to.equal(2);
      });
    });
  });

  describe('clicking the delete button', () => {
    beforeEach(async () => {
      await interactor.clickAddButton();
      await interactor.clickDeleteButton();
    });

    it('removes a field', () => {
      expect(interactor.count).to.equal(0);
    });
  });

  describe.skip('not entering a name', () => {
    beforeEach(async () => {
      await interactor.clickAddButton();
      await interactor.focusName();
      await interactor.blurName();
    });

    it('renders an error', () => {
      expect(interactor.hasError).to.be.true;
    });
  });

  describe.skip('entering an incomplete doc', () => {
    beforeEach(async () => {
      await interactor.clickAddButton();
      await interactor.fillName('Test Error');
      await interactor.focusName();
      await interactor.blurName();
    });

    it('renders an error', () => {
      expect(interactor.hasError).to.be.true;
    });
  });

  describe.skip('entering an invalid URL', () => {
    beforeEach(async () => {
      await interactor.clickAddButton();
      await interactor.fillUrl('invalid-url');
      await interactor.focusName();
      await interactor.blurName();
    });

    it('renders an error', () => {
      expect(interactor.hasError).to.be.true;
    });
  });

  describe('entering a valid URL', () => {
    beforeEach(async () => {
      await interactor.clickAddButton();
      await interactor.fillUrl('https://my-site.com');
      await interactor.blurUrl();
    });

    it('renders no errors', () => {
      expect(interactor.hasError).to.be.false;
    });
  });

  describe('omitting optional props', () => {
    beforeEach(async () => {
      await mountWithContext(
        <TestForm>
          <FieldArray
            addDocBtnLabel={addDocBtnLabel}
            component={DocumentsFieldArray}
            documentCategories={[]}
            isEmptyMessage={isEmptyMessage}
            name="DocumentsFieldArrayTest"
          />
        </TestForm>
      );
      await interactor.clickAddButton();
    });
  });

  describe('basic rendering', () => {
    beforeEach(async () => {
      await mountWithContext(
        <TestForm>
          <FieldArray
            component={DocumentsFieldArray}
            name="DocumentsFieldArrayTest"
          />
        </TestForm>
      );
      await interactor.clickAddButton();
    });

    it('does not render a category field', () => {
      expect(interactor.hasCategory).to.be.false;
    });

    it('does not render a file field', () => {
      expect(interactor.hasFile).to.be.false;
    });
  });

  describe('passing an empty categories array', () => {
    beforeEach(async () => {
      await mountWithContext(
        <TestForm>
          <FieldArray
            component={DocumentsFieldArray}
            documentCategories={[]}
            name="DocumentsFieldArrayTest"
          />
        </TestForm>
      );
      await interactor.clickAddButton();
    });

    it('does not render a category field', () => {
      expect(interactor.hasCategory).to.be.false;
    });
  });
});
