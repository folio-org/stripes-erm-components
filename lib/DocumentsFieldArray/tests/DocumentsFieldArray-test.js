import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { FieldArray } from 'redux-form';
import { mountWithContext } from '../../../tests/helpers';
import TestForm from '../../../tests/TestForm';
import DocumentsFieldArray from '../DocumentsFieldArray';
import DocumentsFieldArrayInteractor from './interactor';
import FileUploaderInteractor from '../../FileUploader/tests/interactor';

chai.use(spies);
const { expect, spy } = chai;

const uploadedFile = { id: '1', name: 'Test File', modified: Date.now() };
const onDeleteFile = spy(() => Promise.resolve({}));
const onDownloadFile = spy();
const onUploadFile = spy(() => Promise.resolve(uploadedFile));
const onUploadFileError = spy(() => Promise.resolve({ error: 400, message: 'Upload Error' }));
const onDeleteFileError = spy(() => Promise.resolve({ status: 400, statusText: 'Delete Error' }));

const addDocBtnLabel = 'Add document';
const isEmptyMessage = 'No documents';

const interactor = new DocumentsFieldArrayInteractor();
const uploaderInteractor = new FileUploaderInteractor();

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
          onDeleteFile={onDeleteFile}
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

  describe('not entering a name', () => {
    beforeEach(async () => {
      await interactor.clickAddButton();
      await interactor.focusName();
      await interactor.blurName();
    });

    it('renders an error', () => {
      expect(interactor.hasError).to.be.true;
    });
  });

  describe('entering an incomplete doc', () => {
    beforeEach(async () => {
      await interactor.clickAddButton();
      await interactor.fillName('Test Error');
      await interactor.focusLocation();
      await interactor.blurLocation();
    });

    it('renders an error', () => {
      expect(interactor.hasError).to.be.true;
    });
  });

  describe('entering an invalid URL', () => {
    beforeEach(async () => {
      await interactor.clickAddButton();
      await interactor.fillUrl('invalid-url');
      await interactor.blurUrl();
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

  describe('selecting a category', () => {
    beforeEach(async () => {
      await interactor.clickAddButton();
      await interactor.selectCategory('Foo');
    });

    it('sets the category value', () => {
      expect(interactor.category).to.equal('foo');
    });
  });

  describe('attaching a file', () => {
    beforeEach(async () => {
      await interactor.clickAddButton();
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
          expect(interactor.file.hasFilename).to.be.true;
          expect(interactor.file.filename).to.equal(uploadedFile.name);
        });

        it('renders uploaded date', () => {
          expect(interactor.file.hasUploaded).to.be.true;
        });

        it('renders delete button', () => {
          expect(interactor.file.hasDeleteBtn).to.be.true;
        });

        describe('clicking the filename link', () => {
          beforeEach(async () => {
            await interactor.file.download();
          });

          expect('calls onDownloadFile', () => {
            expect(onDownloadFile).to.be.called();
          });
        });

        describe('deleting an uploaded file', () => {
          beforeEach(async () => {
            await interactor.file.delete();
          });

          it('calls onDeleteFile', () => {
            expect(onDeleteFile).to.be.called();
          });

          it('does not render file name', () => {
            expect(interactor.file.hasFilename).to.be.false;
          });

          it('does not render uploaded date', () => {
            expect(interactor.file.hasUploaded).to.be.false;
          });

          it('does not render delete button', () => {
            expect(interactor.file.hasDeleteBtn).to.be.false;
          });
        });
      });
    });
  });

  describe('error on upload', () => {
    beforeEach(async () => {
      await mountWithContext(
        <TestForm>
          <FieldArray
            addDocBtnLabel={addDocBtnLabel}
            component={DocumentsFieldArray}
            isEmptyMessage={isEmptyMessage}
            name="docs"
            onDeleteFile={onDeleteFile}
            onDownloadFile={onDownloadFile}
            onUploadFile={onUploadFileError}
          />
        </TestForm>
      );
    });

    describe('dropping a file', () => {
      beforeEach(async () => {
        await interactor.clickAddButton();
        await uploaderInteractor.dragEnter();
        await uploaderInteractor.drop();
      });

      it('should show an error', () => {
        expect(uploaderInteractor.hasError).to.be.true;
      });
    });
  });

  describe('error on delete', () => {
    beforeEach(async () => {
      await mountWithContext(
        <TestForm>
          <FieldArray
            addDocBtnLabel={addDocBtnLabel}
            component={DocumentsFieldArray}
            isEmptyMessage={isEmptyMessage}
            name="docs"
            onDeleteFile={onDeleteFileError}
            onDownloadFile={onDownloadFile}
            onUploadFile={onUploadFile}
          />
        </TestForm>
      );
    });

    describe('dropping a file', () => {
      beforeEach(async () => {
        await interactor.clickAddButton();
        await uploaderInteractor.dragEnter();
        await uploaderInteractor.drop();
      });

      it('should not show an error', () => {
        expect(uploaderInteractor.hasError).to.be.false;
      });

      describe('deleting the uploaded file', () => {
        beforeEach(async () => {
          await interactor.file.delete();
        });

        it('should show an error', () => {
          expect(uploaderInteractor.hasError).to.be.true;
        });
      });
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
            name="DocumentsFieldArrayTest"
            documentCategories={[]}
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
