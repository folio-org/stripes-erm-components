import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';

import { mountWithContext } from '../../../tests/helpers';

import FileUploaderInteractor from './interactor';
import FileUploader from '../FileUploader';

chai.use(spies);
const { expect, spy } = chai;

const uploader = new FileUploaderInteractor();

const errorMessage = 'Test Error';

const props = {
  title: 'Test Title',
  uploadButtonText: 'Test Button',
  children: 'Test Children',
  footer: 'Test Footer',
  onDrop: spy(),
  onDragEnter: spy(),
  onDragLeave: spy(),
  isDropZoneActive: false,
};

describe('FileUploader', () => {
  describe('rendering', () => {
    beforeEach(async () => {
      const { children, ...rest } = props;

      await mountWithContext(
        <FileUploader {...rest}>{children}</FileUploader>
      );
    });

    it('renders a title', () => {
      expect(uploader.isTitleVisible).to.be.true;
    });

    it('renders title according to prop', () => {
      expect(uploader.title).to.equal(props.title);
    });

    it('renders a button', () => {
      expect(uploader.isButtonVisible).to.be.true;
    });

    it('renders button according to prop', () => {
      expect(uploader.button).to.equal(props.uploadButtonText);
    });

    it('renders children', () => {
      expect(uploader.isChildrenVisible).to.be.true;
    });

    it('renders children according to children', () => {
      expect(uploader.children).to.equal(props.children);
    });

    it('renders a footer', () => {
      expect(uploader.isFooterVisible).to.be.true;
    });

    it('renders footer according to prop', () => {
      expect(uploader.footer).to.equal(props.footer);
    });

    describe('handling drag enter', () => {
      beforeEach(async () => {
        await uploader.dragEnter();
      });

      it('calls onDragEnter', () => {
        expect(props.onDragEnter).to.have.been.called();
      });

      describe('handling drag leave', () => {
        beforeEach(async () => {
          await uploader.dragLeave();
        });

        it('calls onDragLeave', () => {
          expect(props.onDragLeave).to.have.been.called();
        });
      });

      describe('handling drop', () => {
        beforeEach(async () => {
          await uploader.drop();
        });

        it('calls onDrop', () => {
          expect(props.onDrop).to.have.been.called();
        });
      });
    });
  });

  describe('error', () => {
    beforeEach(async () => {
      const { children, ...rest } = props;

      await mountWithContext(
        <FileUploader
          {...rest}
          errorMessage={errorMessage}
        >
          {children}
        </FileUploader>
      );
    });

    it('renders an error message', () => {
      expect(uploader.isErrorMessageVisible).to.be.true;
    });

    it('renders the error message according to prop', () => {
      expect(uploader.errorMessage).to.equal(errorMessage);
    });
  });

  describe('isDropZoneActive ', () => {
    beforeEach(async () => {
      const { children, ...rest } = props;

      await mountWithContext(
        <FileUploader
          {...rest}
          isDropZoneActive
        >
          {children}
        </FileUploader>
      );
    });

    it('renders title', () => {
      expect(uploader.isTitleVisible).to.be.true;
    });

    it('does not render button', () => {
      expect(uploader.isButtonVisible).to.be.false;
    });

    it('does not render children', () => {
      expect(uploader.isChildrenVisible).to.be.false;
    });

    it('does not render footer', () => {
      expect(uploader.isFooterVisible).to.be.false;
    });
  });
});
