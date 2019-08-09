import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { Field } from 'redux-form';
import { mountWithContext } from '../../../tests/helpers';
import TestForm from '../../../tests/TestForm';
import FileUploaderField from '../FileUploaderField';
import FileUploaderFieldInteractor from './interactor';
import FileUploaderInteractor from '../../FileUploader/tests/interactor';

chai.use(spies);
const { expect, spy } = chai;

const uploadedFile = { id: '1', name: 'Test File', modified: Date.now() };
const onDownloadFile = spy();
const onUploadFile = spy(() => {
  const blob = new Blob([JSON.stringify(uploadedFile, null, 2)], { type : 'application/json' });
  const init = { 'status' : 200, 'statusText': 'OK' };
  const myResponse = new Response(blob, init);
  return Promise.resolve(myResponse);
});

const onUploadFileError = spy(() => Promise.resolve({ error: 400, message: 'Upload Error' }));

const onUploadFileJsonError = spy(() => {
  const blob = new Blob([JSON.stringify(uploadedFile, null, 2)], { type : 'application/json' });
  const init = { 'status' : 400, 'statusText': 'uploadError' };
  const myResponse = new Response(blob, init);
  return Promise.resolve(myResponse);
});

const interactor = new FileUploaderFieldInteractor();
const uploaderInteractor = new FileUploaderInteractor();

describe('FileUploaderField', () => {
  beforeEach(async () => {
    await mountWithContext(
      <TestForm>
        <Field
          component={FileUploaderField}
          data-test-document-field-file
          name="fileUploadName"
          onDownloadFile={onDownloadFile}
          onUploadFile={onUploadFile}
        />
      </TestForm>
    );
  });

  describe('attaching a file', () => {
    it('shows the title', () => {
      expect(uploaderInteractor.isTitleVisible).to.be.true;
    });

    it('shows the button', () => {
      expect(uploaderInteractor.isButtonVisible).to.be.true;
    });

    it('shows the children', () => {
      expect(uploaderInteractor.isChildrenVisible).to.be.true;
    });
  });

  describe('dropping multiple files', () => {
    beforeEach(async () => {
      await uploaderInteractor.dragEnter();
      await uploaderInteractor.dropMultiple();
    });

    it('should not call onUploadFile', () => {
      expect(onUploadFile).to.not.be.called;
    });
  });

  describe('entering the drag area', () => {
    beforeEach(async () => {
      await uploaderInteractor.dragEnter();
    });

    it('shows the title', () => {
      expect(uploaderInteractor.isTitleVisible).to.be.true;
    });

    it('hides the button', () => {
      expect(uploaderInteractor.isButtonVisible).to.be.false;
    });

    it('hides the children', () => {
      expect(uploaderInteractor.isChildrenVisible).to.be.false;
    });

    describe('leaving the drag area', () => {
      beforeEach(async () => {
        await uploaderInteractor.dragLeave();
      });

      it('shows the title', () => {
        expect(uploaderInteractor.isTitleVisible).to.be.true;
      });

      it('shows the button', () => {
        expect(uploaderInteractor.isButtonVisible).to.be.true;
      });

      it('shows the children', () => {
        expect(uploaderInteractor.isChildrenVisible).to.be.true;
      });
    });

    describe('dropping a file', () => {
      beforeEach(async () => {
        await uploaderInteractor.drop();
      });

      it('calls onUploadFile', () => {
        expect(onUploadFile).to.be.called();
      });

      it('renders file name', () => {
        expect(interactor.hasFilename).to.be.true;
        expect(interactor.filename).to.equal(uploadedFile.name);
      });

      it('renders uploaded date', () => {
        expect(interactor.hasUploaded).to.be.true;
      });

      it('renders delete button', () => {
        expect(interactor.hasDeleteBtn).to.be.true;
      });

      describe('deleting an uploaded file', () => {
        beforeEach(async () => {
          await interactor.clickDelete();
        });

        it('does not render file name', () => {
          expect(interactor.hasFilename).to.be.false;
        });

        it('does not render uploaded date', () => {
          expect(interactor.hasUploaded).to.be.false;
        });

        it('does not render delete button', () => {
          expect(interactor.hasDeleteBtn).to.be.false;
        });
      });

      describe('clicking the filename link', () => {
        beforeEach(async () => {
          await interactor.download();
        });

        it('calls onDownloadFile', () => {
          expect(onDownloadFile).to.be.called();
        });
      });
    });
  });

  describe('error on uploading JSON file', () => {
    beforeEach(async () => {
      await mountWithContext(
        <TestForm>
          <Field
            component={FileUploaderField}
            name="fileUploadName"
            onDownloadFile={onDownloadFile}
            onUploadFile={onUploadFileJsonError}
          />
        </TestForm>
      );
    });

    describe('dropping a file', () => {
      beforeEach(async () => {
        await uploaderInteractor.dragEnter();
        await uploaderInteractor.drop();
      });

      it('should show an error', () => {
        expect(uploaderInteractor.hasError).to.be.true;
      });
    });
  });

  describe('error on uploading non JSON file', () => {
    beforeEach(async () => {
      await mountWithContext(
        <TestForm>
          <Field
            component={FileUploaderField}
            name="fileUploadName"
            onDownloadFile={onDownloadFile}
            onUploadFile={onUploadFileError}
          />
        </TestForm>
      );
    });

    describe('dropping a file', () => {
      beforeEach(async () => {
        await uploaderInteractor.dragEnter();
        await uploaderInteractor.drop();
      });

      it('should show an error', () => {
        expect(uploaderInteractor.hasError).to.be.true;
      });
    });
  });
});
