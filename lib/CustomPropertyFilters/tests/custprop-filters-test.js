import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import chai from 'chai';
import spies from 'chai-spies';
import { StaticRouter as Router } from 'react-router-dom';

import '@folio/stripes-components/lib/global.css';

import { mountWithContext } from '../../../tests/helpers';
import translations from '../../../translations/stripes-erm-components/en';

import CustomPropertyFiltersForm from '../CustomPropertyFiltersForm';
import CustomPropertyFiltersFormInteractor from './interactor';

import {
  DecimalCustProp,
  IntegerCustProp,
  RefDataCustProp,
  TextCustProp,
} from './customProperties';

const custProps = [
  DecimalCustProp,
  IntegerCustProp,
  RefDataCustProp,
  TextCustProp,
];

const custPropNameArray = ['supplementaryProperty', 'term'];

custPropNameArray.forEach((custPropName) => {
  chai.use(spies);
  const { expect, spy } = chai;

  let handleSubmit = spy(() => Promise.resolve());

  const interactor = new CustomPropertyFiltersFormInteractor();

  describe.only('Custom Property Filters', () => {
    describe('no initial values', () => {
      beforeEach(async () => {
        handleSubmit = spy(() => Promise.resolve());

        await mountWithContext(
          <Router context={{}}>
            <CustomPropertyFiltersForm
              customProperties={custProps}
              custPropName={custPropName}
              initialValues={{ filters: [{ rules: [{}] }] }}
              onSubmit={handleSubmit}
            />
          </Router>,
          [{ translations, prefix: 'ui-stripes-erm-components' }]
        );
      });

      it('renders', () => {
        expect(1).to.equal(1);
      });

      describe('clicking the "Edit ... filters" button', () => {
        beforeEach(async () => {
          await interactor.open();
        });

        it('opens the custProps filters modal', () => {
          expect(interactor.modalIsVisible).to.equal(true);
        });

        it('is initialized with one filter', () => {
          expect(interactor.filtersCount).to.equal(1);
        });

        it('has no custProp selected', () => {
          expect(interactor.filters(0).custProp).to.equal('');
        });

        it('is initialized with one rule ', () => {
          expect(interactor.filters(0).rulesCount).to.equal(1);
        });

        it('has no operator selected', () => {
          expect(interactor.filters(0).rules(0).operator).to.equal('');
        });

        it('has no value entered', () => {
          expect(interactor.filters(0).rules(0).value).to.equal('');
        });

        describe('applying filters without selecting a custProp', () => {
          beforeEach(async () => {
            await interactor.apply();
          });

          it('did not call handleSubmit', () => {
            expect(handleSubmit).to.have.been.called.exactly(0);
          });

          it('displayed an error', () => {
            expect(interactor.errorIsVisible).to.be.true;
          });
        });

        describe('applying filters without selecting a rule operator', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(DecimalCustProp.label);
            await interactor.filters(0).rules(0).fillValue('15.5');
            await interactor.apply();
          });

          it('did not call handleSubmit', () => {
            expect(handleSubmit).to.have.been.called.exactly(0);
          });

          it('displayed an error', () => {
            expect(interactor.errorIsVisible).to.be.true;
          });
        });

        describe('applying filters without filling a rule value', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(DecimalCustProp.label);
            await interactor.filters(0).rules(0).selectOperator('equals');
            await interactor.apply();
          });

          it('did not call handleSubmit', () => {
            expect(handleSubmit).to.have.been.called.exactly(0);
          });

          it('displayed an error', () => {
            expect(interactor.errorIsVisible).to.be.true;
          });
        });

        describe('applying filters with an incomplete second filter set', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(DecimalCustProp.label);
            await interactor.filters(0).rules(0).selectOperator('equals');
            await interactor.filters(0).rules(0).fillValue('15.5');
            await interactor.addCustPropFilter();
            await interactor.apply();
          });

          it('did not call handleSubmit', () => {
            expect(handleSubmit).to.have.been.called.exactly(0);
          });

          it('displayed an error', () => {
            expect(interactor.errorIsVisible).to.be.true;
          });

          describe('applying filters after filling out the second filter set', () => {
            beforeEach(async () => {
              await interactor.filters(1).selectCustProp(IntegerCustProp.label);
              await interactor.filters(1).rules(0).selectOperator('equals');
              await interactor.filters(1).rules(0).fillValue('51');
              await interactor.apply();
            });

            it('calls handleSubmit with the expected filters', () => {
              expect(handleSubmit).to.have.been.called.with({
                filters: [{
                  customProperty: DecimalCustProp.name,
                  rules: [
                    { operator: '==', value: '15.5' },
                  ],
                }, {
                  customProperty: IntegerCustProp.name,
                  rules: [
                    { operator: '==', value: '51' },
                  ],
                }],
              });
            });
          });
        });

        describe('clicking the "Add ... filter" button', () => {
          beforeEach(async () => {
            await interactor.addCustPropFilter();
          });

          it('is creates a second empty filter', () => {
            expect(interactor.filtersCount).to.equal(2);
            expect(interactor.filters(1).custProp).to.equal('');
            expect(interactor.filters(1).rulesCount).to.equal(1);
            expect(interactor.filters(1).rules(0).operator).to.equal('');
            expect(interactor.filters(1).rules(0).value).to.equal('');
          });
        });

        describe('selecting the Decimal CustProp, setting a rule to "is set" and applying', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(DecimalCustProp.label);
            await interactor.filters(0).rules(0).selectOperator('is set');
            await interactor.apply();
          });

          it('calls handleSubmit with the expected filters', () => {
            expect(handleSubmit).to.have.been.called.with({
              filters: [{
                customProperty: DecimalCustProp.name,
                rules: [
                  { operator: ' isSet', value: '' }
                ],
              }],
            });
          });
        });

        describe('selecting the Decimal CustProp, setting a rule to "equals 42.5" and applying', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(DecimalCustProp.label);
            await interactor.filters(0).rules(0).selectOperator('equals');
            await interactor.filters(0).rules(0).fillValue('15.5');
            await interactor.apply();
          });

          it('calls handleSubmit with the expected filters', () => {
            expect(handleSubmit).to.have.been.called.with({
              filters: [{
                customProperty: DecimalCustProp.name,
                rules: [
                  { operator: '==', value: '15.5' }
                ],
              }],
            });
          });
        });

        describe('selecting the Decimal CustProp, setting a rule to "does not equal 42.5" and applying', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(DecimalCustProp.label);
            await interactor.filters(0).rules(0).selectOperator('does not equal');
            await interactor.filters(0).rules(0).fillValue('15.5');
            await interactor.apply();
          });

          it('calls handleSubmit with the expected filters', () => {
            expect(handleSubmit).to.have.been.called.with({
              filters: [{
                customProperty: DecimalCustProp.name,
                rules: [
                  { operator: '!=', value: '15.5' }
                ],
              }],
            });
          });
        });

        describe('selecting the Decimal CustProp, setting a rule to "is greater than or equals 42.5" and applying', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(DecimalCustProp.label);
            await interactor.filters(0).rules(0).selectOperator('is greater than or equals');
            await interactor.filters(0).rules(0).fillValue('15.5');
            await interactor.apply();
          });

          it('calls handleSubmit with the expected filters', () => {
            expect(handleSubmit).to.have.been.called.with({
              filters: [{
                customProperty: DecimalCustProp.name,
                rules: [
                  { operator: '>=', value: '15.5' }
                ],
              }],
            });
          });
        });

        describe('selecting the Decimal CustProp, setting a rule to "is less than or equals 42.5" and applying', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(DecimalCustProp.label);
            await interactor.filters(0).rules(0).selectOperator('is less than or equals');
            await interactor.filters(0).rules(0).fillValue('15.5');
            await interactor.apply();
          });

          it('calls handleSubmit with the expected filters', () => {
            expect(handleSubmit).to.have.been.called.with({
              filters: [{
                customProperty: DecimalCustProp.name,
                rules: [
                  { operator: '<=', value: '15.5' }
                ],
              }],
            });
          });
        });

        describe('selecting the Integer CustProp, setting a rule to "equals 42" and applying', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(IntegerCustProp.label);
            await interactor.filters(0).rules(0).selectOperator('equals');
            await interactor.filters(0).rules(0).fillValue(42);
            await interactor.apply();
          });

          it('calls handleSubmit with the expected filters', () => {
            expect(handleSubmit).to.have.been.called.with({
              filters: [{
                customProperty: IntegerCustProp.name,
                rules: [
                  { operator: '==', value: '42' }
                ],
              }],
            });
          });
        });

        describe('selecting the Integer CustProp, setting a rule to "is set" and applying', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(IntegerCustProp.label);
            await interactor.filters(0).rules(0).selectOperator('is set');
            await interactor.apply();
          });

          it('calls handleSubmit with the expected filters', () => {
            expect(handleSubmit).to.have.been.called.with({
              filters: [{
                customProperty: IntegerCustProp.name,
                rules: [
                  { operator: ' isSet', value: '' }
                ],
              }],
            });
          });
        });

        describe('selecting the RefData CustProp, setting a rule to "is Yes" and applying', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(RefDataCustProp.label);
            await interactor.filters(0).rules(0).selectOperator('is');
            await interactor.filters(0).rules(0).selectValue('Yes');
            await interactor.apply();
          });

          it('calls handleSubmit with the expected filters', () => {
            const YesOption = RefDataCustProp.category.values.find(v => v.label === 'Yes');
            expect(handleSubmit).to.have.been.called.with({
              filters: [{
                customProperty: RefDataCustProp.name,
                rules: [
                  { operator: '==', value: YesOption.id }
                ],
              }],
            });
          });
        });

        describe('selecting the RefData CustProp, setting a rule to "is set" and applying', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(RefDataCustProp.label);
            await interactor.filters(0).rules(0).selectOperator('is set');
            await interactor.apply();
          });

          it('calls handleSubmit with the expected filters', () => {
            expect(handleSubmit).to.have.been.called.with({
              filters: [{
                customProperty: RefDataCustProp.name,
                rules: [
                  { operator: ' isSet', value: '' }
                ],
              }],
            });
          });
        });

        describe('selecting the Text CustProp, setting a rule to "contains foo" and applying', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(TextCustProp.label);
            await interactor.filters(0).rules(0).selectOperator('contains');
            await interactor.filters(0).rules(0).fillValue('foo');
            await interactor.apply();
          });

          it('calls handleSubmit with the expected filters', () => {
            expect(handleSubmit).to.have.been.called.with({
              filters: [{
                customProperty: TextCustProp.name,
                rules: [
                  { operator: '=~', value: 'foo' }
                ],
              }],
            });
          });
        });

        describe('selecting the Text CustProp, setting a rule to "does not contain foo" and applying', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(TextCustProp.label);
            await interactor.filters(0).rules(0).selectOperator('does not contain');
            await interactor.filters(0).rules(0).fillValue('foo');
            await interactor.apply();
          });

          it('calls handleSubmit with the expected filters', () => {
            expect(handleSubmit).to.have.been.called.with({
              filters: [{
                customProperty: TextCustProp.name,
                rules: [
                  { operator: '!~', value: 'foo' }
                ],
              }],
            });
          });
        });

        describe('selecting the Text CustProp, setting a rule to "is set" and applying', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(TextCustProp.label);
            await interactor.filters(0).rules(0).selectOperator('is set');
            await interactor.apply();
          });

          it('calls handleSubmit with the expected filters', () => {
            expect(handleSubmit).to.have.been.called.with({
              filters: [{
                customProperty: TextCustProp.name,
                rules: [
                  { operator: ' isSet', value: '' }
                ],
              }],
            });
          });
        });

        describe('setting multiple rules for one filter', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(TextCustProp.label);
            await interactor.filters(0).rules(0).selectOperator('does not contain');
            await interactor.filters(0).rules(0).fillValue('foo');
            await interactor.filters(0).addRule();
            await new Promise(resolve => { setTimeout(resolve, 500); }); // Should be removed as a part of ERM-825
            await interactor.filters(0).rules(1).selectOperator('contains');
            await interactor.filters(0).rules(1).fillValue('bar');
            await interactor.apply();
          });

          it('calls handleSubmit with the expected filters', () => {
            expect(handleSubmit).to.have.been.called.with({
              filters: [{
                customProperty: TextCustProp.name,
                rules: [
                  { operator: '!~', value: 'foo' },
                  { operator: '=~', value: 'bar' },
                ],
              }],
            });
          });
        });

        describe('`setting multiple rules for multiple filters`', () => {
          beforeEach(async () => {
            await interactor.filters(0).selectCustProp(TextCustProp.label);
            await interactor.filters(0).rules(0).selectOperator('does not contain');
            await interactor.filters(0).rules(0).fillValue('foo');
            await interactor.filters(0).addRule();
            await new Promise(resolve => { setTimeout(resolve, 500); }); // Should be removed as a part of ERM-825
            await interactor.filters(0).rules(1).selectOperator('contains');
            await interactor.filters(0).rules(1).fillValue('bar');

            await interactor.addCustPropFilter();
            await new Promise(resolve => { setTimeout(resolve, 500); }); // Should be removed as a part of ERM-825

            await interactor.filters(1).selectCustProp(IntegerCustProp.label);
            await interactor.filters(1).rules(0).selectOperator('is greater than or equals');
            await interactor.filters(1).rules(0).fillValue('5');
            await interactor.filters(1).addRule();
            await new Promise(resolve => { setTimeout(resolve, 500); }); // Should be removed as a part of ERM-825
            await interactor.filters(1).rules(1).selectOperator('is less than or equals');
            await interactor.filters(1).rules(1).fillValue('15');

            await interactor.apply();
          });

          it('calls handleSubmit with the expected filters', () => {
            expect(handleSubmit).to.have.been.called.with({
              filters: [{
                customProperty: TextCustProp.name,
                rules: [
                  { operator: '!~', value: 'foo' },
                  { operator: '=~', value: 'bar' },
                ],
              }, {
                customProperty: IntegerCustProp.name,
                rules: [
                  { operator: '>=', value: '5' },
                  { operator: '<=', value: '15' },
                ],
              }],
            });
          });
        });
      });
    });
  });
});
