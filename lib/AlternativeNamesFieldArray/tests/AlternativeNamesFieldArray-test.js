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

import TasksFormInteractor from './interactor';

chai.use(spies);
const { expect, spy } = chai;

const onSubmit = spy();

describe('AlternativeNamesFieldArray', () => {
  const interactor = new TasksFormInteractor();

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

    describe('creating a task', () => {
      const todo = 'alernative name';

      beforeEach(async () => {
        await interactor.appendTask();
        await new Promise(resolve => { setTimeout(resolve, 500); }); // Should be removed as a part of ERM-825
        await interactor.items(0).fillTask(todo);
      });

      it('should have one item', () => {
        expect(interactor.size).to.equal(1);
      });

      it('should have a value entered', () => {
        expect(interactor.items(0).task).to.equal(todo);
      });

      describe('deleting a task', () => {
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
              { id: 1, name: 'task one' },
              { id: 2, name: 'task two' },
              { id: 3, name: 'task three' },
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

    describe('creating one task', () => {
      const todo = 'alernative name';

      beforeEach(async () => {
        await interactor.appendTask();
        await new Promise(resolve => { setTimeout(resolve, 500); }); // Should be removed as a part of ERM-825
        await interactor.items(3).fillTask(todo);
      });

      it('should have four items', () => {
        expect(interactor.size).to.equal(4);
      });

      it('should have a value entered', () => {
        expect(interactor.items(3).task).to.equal(todo);
      });

      testSubmit({
        alternateNames: [
          { id: 1, name: 'task one' },
          { id: 2, name: 'task two' },
          { id: 3, name: 'task three' },
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
          { id: 2, name: 'task two' },
          { id: 3, name: 'task three' },
          { id: 1, _delete: true },
        ]
      });
    });

    describe('deleting the first two items and appending two items', () => {
      beforeEach(async () => {
        await interactor.items(0).delete();
        await interactor.items(0).delete();
        await interactor.appendTask();
        await new Promise(resolve => { setTimeout(resolve, 500); }); // Should be removed as a part of ERM-825
        await interactor.items(1).fillTask('append foo');
        await interactor.appendTask();
        await new Promise(resolve => { setTimeout(resolve, 500); }); // Should be removed as a part of ERM-825
        await interactor.items(2).fillTask('append bar');
      });

      it('should have three items', () => {
        expect(interactor.size).to.equal(3);
      });

      testSubmit({
        alternateNames: [
          { id: 3, name: 'task three' },
          { name: 'append foo', _delete: false },
          { name: 'append bar', _delete: false },
          { id: 1, _delete: true },
          { id: 2, _delete: true },
        ]
      });
    });
  });
});
