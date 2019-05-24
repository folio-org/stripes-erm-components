import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';

import { mountWithContext } from '../../../tests/helpers';

import DocumentCardInteractor from './interactor';
import DocumentCard from '../DocumentCard';

chai.use(spies);
const { expect, spy } = chai;

const documentcard = new DocumentCardInteractor();

const onDownloadFile = spy();

const doc = {
  dateCreated: '2019-04-19T12:59:29Z',
  id: '4028808d6a2cf32b016a35ae323c003b',
  lastUpdated: '2019-04-19T12:59:29Z',
  location: 'http://a.b.c/d/e/g.doc',
  name: 'A test document attachment',
  note: 'This is a test document attachment',
  url: 'http://a.b.c/e',
  fileUpload: {
    id: '123',
    name: 'file.pdf',
  }
};

describe('DocumentCard', () => {
  describe('rendering', () => {
    beforeEach(async () => {
      await mountWithContext(
        <DocumentCard
          key={doc.id}
          onDownloadFile={onDownloadFile}
          {...doc}
        />
      );
    });

    it('renders a Headline', () => {
      expect(documentcard.isHeadlinePresent).to.be.true;
    });

    it('sets Headline to docs name', () => {
      expect(documentcard.renderHeadline).to.equal(doc.name);
    });

    it('renders a Note', () => {
      expect(documentcard.isNotePresent).to.be.true;
    });

    it('sets Note to docs note', () => {
      expect(documentcard.renderNote).to.equal(doc.note);
    });

    it('renders a URL', () => {
      expect(documentcard.isURLPresent).to.be.true;
    });

    it('sets Headline to docs URL', () => {
      expect(documentcard.renderURL).to.equal(doc.url);
    });

    it('renders a location', () => {
      expect(documentcard.isLocationPresent).to.be.true;
    });

    it('sets location to docs location', () => {
      expect(documentcard.renderLocation).to.equal(doc.location);
    });

    it('renders a file', () => {
      expect(documentcard.isFilePresent).to.be.true;
    });

    it('sets file to file name', () => {
      expect(documentcard.file).to.equal(doc.fileUpload.name);
    });

    describe('clicking the filename link', () => {
      beforeEach(async () => {
        await documentcard.downloadFile();
      });

      expect('calls onDownloadFile', () => {
        expect(onDownloadFile).to.be.called();
      });
    });
  });
});
