import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import { mountWithContext } from '../../../tests/helpers';

import DocumentCardInteractor from './interactor';
import DocumentCard from '../DocumentCard';

const documentcard = new DocumentCardInteractor();

const doc = {
  dateCreated: '2019-04-19T12:59:29Z',
  id: '4028808d6a2cf32b016a35ae323c003b',
  lastUpdated: '2019-04-19T12:59:29Z',
  location: 'http://a.b.c/d/e/g.doc',
  name: 'A test document attachment',
  note: 'This is a test document attachment',
  url: 'http://a.b.c/e'
};

describe('DocumentCard', () => {
  describe('rendering', () => {
    beforeEach(async () => {
      await mountWithContext(
        <DocumentCard key={doc.id} {...doc} />
      );
    });

    it('renders a Headline', () => {
      expect(documentcard.isHeadlinePresent).to.be.true;
    });

    it('Sets Headline to docs name', () => {
      expect(documentcard.renderHeadline).to.equal(doc.name);
    });

    it('renders a Note', () => {
      expect(documentcard.isNotePresent).to.be.true;
    });

    it('Sets Note to docs note', () => {
      expect(documentcard.renderNote).to.equal(doc.note);
    });

    it('renders a URL', () => {
      expect(documentcard.isURLPresent).to.be.true;
    });

    it('Sets Headline to docs URL', () => {
      expect(documentcard.renderURL).to.equal(doc.url);
    });

    it('renders a location', () => {
      expect(documentcard.isLocationPresent).to.be.true;
    });

    it('Sets location to docs name', () => {
      expect(documentcard.renderLocation).to.equal(doc.location);
    });
  });
});
