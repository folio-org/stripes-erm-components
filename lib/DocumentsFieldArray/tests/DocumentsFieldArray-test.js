import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';
import { FieldArray } from 'redux-form';
import { mountWithContext } from '../../../tests/helpers';
import TestForm from '../../../tests/TestForm';
import DocumentsFieldArray from '../DocumentsFieldArray';
import DocumentsFieldArrayInteractor from './interactor';

const addDocBtnLabel = 'Add external license to agreement';
const isEmptyMessage = 'Agreement has no external licenses';

describe('DocumentsFieldArray', () => {
  const documentsfieldinteractor = new DocumentsFieldArrayInteractor();

  beforeEach(async () => {
    await mountWithContext(
      <TestForm>
        <FieldArray
          addDocBtnLabel={addDocBtnLabel}
          component={DocumentsFieldArray}
          isEmptyMessage={isEmptyMessage}
          name="DocumentsFieldArrayTest"
        />
      </TestForm>
    );
  });

  it('renders the Add button', () => {
    expect(documentsfieldinteractor.hasAddButton).to.be.true;
  });

  it('renders the Add button label', () => {
    expect(documentsfieldinteractor.addDocBtnLabel).to.equal(addDocBtnLabel);
  });

  it('renders the empty message', () => {
    expect(documentsfieldinteractor.emptyMessage).to.equal(isEmptyMessage);
  });

  describe('clicking the add button', () => {
    beforeEach(async () => {
      await documentsfieldinteractor.clickAddButton();
    });

    it('has a field count of 1', () => {
      expect(documentsfieldinteractor.count).to.equal(1);
    });

    it('renders a name field', () => {
      expect(documentsfieldinteractor.hasName).to.be.true;
    });

    it('renders a note field', () => {
      expect(documentsfieldinteractor.hasNote).to.be.true;
    });

    it('renders a location field', () => {
      expect(documentsfieldinteractor.hasLocation).to.be.true;
    });

    it('renders a url field', () => {
      expect(documentsfieldinteractor.hasUrl).to.be.true;
    });

    describe('clicking the add button again', () => {
      beforeEach(async () => {
        await documentsfieldinteractor.clickAddButton();
      });

      it('has a field count of 2', () => {
        expect(documentsfieldinteractor.count).to.equal(2);
      });
    });
  });

  describe('clicking the delete button', () => {
    beforeEach(async () => {
      await documentsfieldinteractor.clickAddButton();
      await documentsfieldinteractor.clickDeleteButton();
    });

    it('removes a field', () => {
      expect(documentsfieldinteractor.count).to.equal(0);
    });
  });
});
