/* eslint-disable react/prop-types */

import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

import { Button } from '@folio/stripes/components';

import { mount } from '../../../tests/helpers';
import withKiwtFieldArray from '../withKiwtFieldArray';

import TasksFormInteractor from './interactor';

chai.use(spies);
const { expect, spy } = chai;

const onSubmit = spy();

const TasksFieldArray = (props) => (
  <div id="tasks">
    { props.items.map((item, i) => (
      <div data-test-task key={i}>
        <Field
          component="input"
          data-test-label
          label="Task"
          name={`${props.name}[${i}].label`}
        />
        <Button data-test-delete onClick={() => props.onDeleteField(i, item)}>
          Delete Task
        </Button>
        <Button data-test-replace onClick={() => props.onReplaceField(i, { label: 'TODO' })}>
          Make TODO
        </Button>
      </div>
    )) }
    <Button id="add" onClick={() => props.onAddField()}>
      Append Task
    </Button>
    <Button id="prepend" onClick={() => props.onPrependField()}>
      Prepend Task
    </Button>
  </div>
);

const WrappedTasksFieldArray = withKiwtFieldArray(TasksFieldArray);

describe('withKiwtFieldArray', () => {
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
    beforeEach(async () => {
      await mount(
        <Form
          onSubmit={onSubmit}
          mutators={{ ...arrayMutators }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FieldArray
                component={WrappedTasksFieldArray}
                name="tasks"
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
      const todo = 'buy groceries';

      beforeEach(async () => {
        await interactor.appendTask();
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
          tasks: []
        });
      });

      testSubmit({
        tasks: [
          { label: todo, _delete: false },
        ]
      });
    });
  });

  describe('mounted with three initial values', () => {
    beforeEach(async () => {
      await mount(
        <Form
          initialValues={{
            tasks: [
              { id: 1, label: 'task one' },
              { id: 2, label: 'task two' },
              { id: 3, label: 'task three' },
            ]
          }}
          onSubmit={onSubmit}
          mutators={{ ...arrayMutators }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FieldArray
                component={WrappedTasksFieldArray}
                name="tasks"
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
      const todo = 'buy groceries';

      beforeEach(async () => {
        await interactor.appendTask();
        await interactor.items(3).fillTask(todo);
      });

      it('should have four items', () => {
        expect(interactor.size).to.equal(4);
      });

      it('should have a value entered', () => {
        expect(interactor.items(3).task).to.equal(todo);
      });

      testSubmit({
        tasks: [
          { id: 1, label: 'task one' },
          { id: 2, label: 'task two' },
          { id: 3, label: 'task three' },
          { label: todo, _delete: false },
        ]
      });
    });

    describe('replacing the first task', () => {
      beforeEach(async () => {
        await interactor.items(0).replace();
      });

      it('should have three items', () => {
        expect(interactor.size).to.equal(3);
      });

      it('should have the replaced task', () => {
        expect(interactor.items(0).task).to.equal('TODO');
      });

      testSubmit({
        tasks: [
          { label: 'TODO' },
          { id: 2, label: 'task two' },
          { id: 3, label: 'task three' },
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
        tasks: [
          { id: 2, label: 'task two' },
          { id: 3, label: 'task three' },
          { id: 1, _delete: true },
        ]
      });
    });

    describe('deleting the first two items and appending two items', () => {
      beforeEach(async () => {
        await interactor.items(0).delete();
        await interactor.items(0).delete();
        await interactor.appendTask();
        await interactor.items(1).fillTask('append foo');
        await interactor.appendTask();
        await interactor.items(2).fillTask('append bar');
      });

      it('should have three items', () => {
        expect(interactor.size).to.equal(3);
      });

      testSubmit({
        tasks: [
          { id: 3, label: 'task three' },
          { label: 'append foo', _delete: false },
          { label: 'append bar', _delete: false },
          { id: 1, _delete: true },
          { id: 2, _delete: true },
        ]
      });
    });

    describe('deleting the first two items and prepending two items', () => {
      beforeEach(async () => {
        await interactor.items(0).delete();
        await interactor.items(0).delete();
        await interactor.prependTask();
        await interactor.items(0).fillTask('prepend foo');
        await interactor.prependTask();
        await interactor.items(0).fillTask('prepend bar');
      });

      it('should have three items', () => {
        expect(interactor.size).to.equal(3);
      });

      testSubmit({
        tasks: [
          { label: 'prepend bar', _delete: false },
          { label: 'prepend foo', _delete: false },
          { id: 3, label: 'task three' },
          { id: 1, _delete: true },
          { id: 2, _delete: true },
        ]
      });
    });
  });
});
