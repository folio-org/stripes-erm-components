import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';

import { mountWithContext } from '../../../tests/helpers';

import CardInteractor from './interactor';
import Card from '../Card';

const card = new CardInteractor();

const props = {
  header: 'Test Header',
  body: 'Test Body',
};

describe.only('Card', () => {
  describe('rendering', () => {
    beforeEach(async () => {
      const { body, ...rest } = props;

      await mountWithContext(
        <Card {...rest}>{body}</Card>
      );
    });

    it('renders a header', () => {
      expect(card.isHeaderPresent).to.be.true;
    });

    it('renders header according to prop', () => {
      expect(card.header).to.equal(props.header);
    });

    it('renders a body', () => {
      expect(card.isBodyPresent).to.be.true;
    });

    it('renders body according to children', () => {
      expect(card.body).to.equal(props.body);
    });
  });
});
