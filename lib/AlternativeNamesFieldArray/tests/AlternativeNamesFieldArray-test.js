/* eslint-disable react/prop-types */

import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

import { Button } from '@folio/stripes/components';

import { dummyMount, setupApplication } from '../../../tests/helpers';
import AlternativeNamesFieldArray from '../AlternativeNamesFieldArray';

import AlternativeNamesFormInteractor from './interactor';

chai.use(spies);
const { expect, spy } = chai;

const onSubmit = spy();

describe('AlternativeNamesFieldArray', () => {
  const interactor = new AlternativeNamesFormInteractor();

  let submissions = 0;
  const testSubmit = (values) => (
    describe('submitting the form', () => {
      beforeEach(async () => {
        await interactor.submit();
        submissions += 1;
      });

      it('should have correct form values', () => {
        expect(onSubmit).on.nth(submissions).be.called.with(values);
      });
    })
  );

  describe('mounted without initial values', () => {
    setupApplication();

    beforeEach(async () => {
      await dummyMount(
        <Form
          mutators={{ ...arrayMutators }}
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FieldArray
                component={AlternativeNamesFieldArray}
                name="alternateNames"
              />
              <Button id="submit" type="submit">
                Submit
              </Button>
            </form>
          )}
        />
      );
    });

    describe('creating a alternativeName', () => {
      const todo = 'alernative name';

      beforeEach(async () => {
        await interactor.appendAlternativeName();
        await new Promise(resolve => { setTimeout(resolve, 500); }); // Should be removed as a part of ERM-825
        await interactor.items(0).fillAlternativeName(todo);
      });

      it('should have one item', () => {
        expect(interactor.size).to.equal(1);
      });

      it('should have a value entered', () => {
        expect(interactor.items(0).alternativeName).to.equal(todo);
      });

      describe('deleting a alternativeName', () => {
        beforeEach(async () => {
          await interactor.items(0).delete();
        });

        it('should have zero items', () => {
          expect(interactor.size).to.equal(0);
        });

        testSubmit({
          alternateNames: []
        });
      });

      testSubmit({
        alternateNames: [
          { name: todo, _delete: false },
        ]
      });
    });
  });

  describe('mounted with three initial values', () => {
    setupApplication();

    beforeEach(async () => {
      await dummyMount(
        <Form
          initialValues={{
            alternateNames: [
              { id: 1, name: 'alternativeName one' },
              { id: 2, name: 'alternativeName two' },
              { id: 3, name: 'alternativeName three' },
            ]
          }}
          mutators={{ ...arrayMutators }}
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FieldArray
                component={AlternativeNamesFieldArray}
                name="alternateNames"
              />
              <Button id="submit" type="submit">
                Submit
              </Button>
            </form>
          )}
        />
      );
    });

    describe('creating one alternativeName', () => {
      const todo = 'alernative name';

      beforeEach(async () => {
        await interactor.appendAlternativeName();
        await new Promise(resolve => { setTimeout(resolve, 500); }); // Should be removed as a part of ERM-825
        await interactor.items(3).fillAlternativeName(todo);
      });

      it('should have four items', () => {
        expect(interactor.size).to.equal(4);
      });

      it('should have a value entered', () => {
        expect(interactor.items(3).alternativeName).to.equal(todo);
      });

      testSubmit({
        alternateNames: [
          { id: 1, name: 'alternativeName one' },
          { id: 2, name: 'alternativeName two' },
          { id: 3, name: 'alternativeName three' },
          { name: todo, _delete: false },
        ]
      });
    });

    describe('deleting the first item', () => {
      beforeEach(async () => {
        await interactor.items(0).delete();
      });

      it('should have two items', () => {
        expect(interactor.size).to.equal(2);
      });

      testSubmit({
        alternateNames: [
          { id: 2, name: 'alternativeName two' },
          { id: 3, name: 'alternativeName three' },
          { id: 1, _delete: true },
        ]
      });
    });

    describe('deleting the first two items and appending two items', () => {
      beforeEach(async () => {
        await interactor.items(0).delete();
        await interactor.items(0).delete();
        await interactor.appendAlternativeName();
        await new Promise(resolve => { setTimeout(resolve, 500); }); // Should be removed as a part of ERM-825
        await interactor.items(1).fillAlternativeName('append foo');
        await interactor.appendAlternativeName();
        await new Promise(resolve => { setTimeout(resolve, 500); }); // Should be removed as a part of ERM-825
        await interactor.items(2).fillAlternativeName('append bar');
      });

      it('should have three items', () => {
        expect(interactor.size).to.equal(3);
      });

      testSubmit({
        alternateNames: [
          { id: 3, name: 'alternativeName three' },
          { name: 'append foo', _delete: false },
          { name: 'append bar', _delete: false },
          { id: 1, _delete: true },
          { id: 2, _delete: true },
        ]
      });
    });
  });
});
