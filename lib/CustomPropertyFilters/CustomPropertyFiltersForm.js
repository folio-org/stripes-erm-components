import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  Label,
  Layout,
  Modal,
  ModalFooter,
  Row,
  Select,
} from '@folio/stripes/components';

import stripesFinalForm from '@folio/stripes/final-form';

import EditCard from '../EditCard';
import { required as requiredValidator } from '../validators';

import CustomPropertyRule from './CustomPropertyRule';

class CustomPropertyFiltersForm extends React.Component {
  static propTypes = {
    filterHandlers: PropTypes.shape({
      state: PropTypes.func.isRequired,
    }),
    form: PropTypes.shape({
      change: PropTypes.func.isRequired,
      mutators: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }),
    }),
    handleSubmit: PropTypes.func.isRequired,
    terms: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })
    ),
    values: PropTypes.object,
  };

  state = {
    editingFilters: false,
  }

  renderFooter = () => (
    <ModalFooter>
      <Button
        buttonStyle="primary"
        data-test-apply-filters
        onClick={values => {
          const promise = this.props.handleSubmit(values);
          promise?.then(() => this.setState({ editingFilters: false })); // eslint-disable-line no-unused-expressions
        }}
      >
        <FormattedMessage id="ui-licenses.apply" />
      </Button>
      <Button
        data-test-cancel-filters
        onClick={() => this.setState({ editingFilters: false })}
      >
        <FormattedMessage id="ui-licenses.cancel" />
      </Button>
    </ModalFooter>
  );

  render() {
    const {
      form: {
        mutators: { push },
        change,
      },
      terms,
      values,
    } = this.props;
    const { editingFilters } = this.state;

    return (
      <>
        <Button
          data-test-open-custprops-filters
          onClick={() => this.setState({ editingFilters: true })}
        >
          <FormattedMessage id="stripes-erm-components.customProperty.filters.editCustomPropertyFilters" />
        </Button>
        { editingFilters &&
          <Modal
            dismissible
            enforceFocus={false}
            footer={this.renderFooter()}
            id="term-filters-modal"
            label={<FormattedMessage id="stripes-erm-components.customProperty.filters.builder" />}
            onClose={() => this.setState({ editingFilters: false })}
            open
            size="medium"
          >
            <FieldArray name="filters">
              {({ fields }) => fields.map((name, index) => (
                <React.Fragment key={name}>
                  <EditCard
                    key={name}
                    data-test-term-filter
                    deleteButtonTooltipText={<FormattedMessage id="stripes-erm-components.customProperty.filters.removeCustomProperty" values={{ index: index + 1 }} />}
                    header={<FormattedMessage id="stripes-erm-components.customProperty.filters.termFilterIndex" values={{ index: index + 1 }} />}
                    marginBottom0={index !== fields.length - 1}
                    onDelete={() => fields.remove(index)}
                  >
                    <Field
                      component={Select}
                      data-test-term
                      dataOptions={terms.map(t => ({ label: t.label, value: t.name }))}
                      id={`input-term-${index}`}
                      label={<FormattedMessage id="stripes-erm-components.customProperties.term" />}
                      name={`${name}.customProperty`}
                      placeholder=" "
                      required
                      validate={requiredValidator}
                    />
                    {/* This next div is rendered so that it can be referred to using aria-labelledby */}
                    <div
                      data-test-selected-term-name
                      id={`selected-term-name-${index}`}
                      style={{ display: 'none' }}
                    >
                      {terms.find(t => t.name === fields.value[index]?.customProperty)?.label ?? ''}
                    </div>
                    <Row>
                      <Col xs={2} />
                      <Col xs={4}>
                        <Label id="rule-column-header-comparator" required>
                          <FormattedMessage id="stripes-erm-components.customProperty.filters.comparator" />
                        </Label>
                      </Col>
                      <Col xs={4}>
                        <Label id="rule-column-header-value" required>
                          <FormattedMessage id="stripes-erm-components.customProperty.filters.value" />
                        </Label>
                      </Col>
                      <Col xs={2} />
                    </Row>
                    <FieldArray name={`${name}.rules`}>
                      {({ fields: ruleFields }) => ruleFields.map((ruleFieldName, ruleFieldIndex) => (
                        <CustomPropertyRule
                          key={ruleFieldName}
                          ariaLabelledby={`selected-term-name-${index}`}
                          clearRuleValue={() => change(`filters[${index}].rules[${ruleFieldIndex}].value`, '')}
                          index={ruleFieldIndex}
                          name={ruleFieldName}
                          onDelete={() => ruleFields.remove(ruleFieldIndex)}
                          termDefinition={terms.find(t => t.name === fields.value[index].customProperty)}
                          value={values.filters[index]?.rules[ruleFieldIndex]}
                        />
                      ))}
                    </FieldArray>
                    <Button
                      data-test-add-rule-btn
                      disabled={!fields.value[index]?.customProperty}
                      onClick={() => push(`${name}.rules`)}
                    >
                      <FormattedMessage id="stripes-erm-components.customProperty.filters.addRule" />
                    </Button>
                  </EditCard>
                  {index < fields.value.length - 1 && (
                    <Layout className="textCentered">
                      <FormattedMessage id="ui-licenses.AND" />
                    </Layout>
                  )}
                </React.Fragment>
              ))}
            </FieldArray>
            <Button
              data-test-add-term-filter-btn
              onClick={() => push('filters', { rules: [{}] })}
            >
              <FormattedMessage id="stripes-erm-components.customProperty.filters.addCustomPropertyFilter" />
            </Button>
          </Modal>
        }
      </>
    );
  }
}

export default stripesFinalForm({
  enableReinitialize: true,
  subscription: {
    values: true,
  },
})(CustomPropertyFiltersForm);
