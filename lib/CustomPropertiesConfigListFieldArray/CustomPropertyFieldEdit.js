import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Button,
  Card,
  Col,
  InfoPopover,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import { IntlConsumer } from '@folio/stripes/core';

import { required as requiredValidator } from '../validators';

export default class CustomPropertyFieldEdit extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.shape({
        id: PropTypes.string,
      }).isRequired,
    }).isRequired,
    meta: PropTypes.shape({
      invalid: PropTypes.bool,
      pristine: PropTypes.bool,
      submitting: PropTypes.bool,
    }),
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    pickLists: PropTypes.arrayOf(PropTypes.object),
    translationKey: PropTypes.string,
  };

  booleanToString = booleanValue => booleanValue.toString();

  stringToBoolean = stringValue => stringValue === 'true';

  render() {
    const {
      input: { name, value = {} },
      meta,
      onCancel,
      onSave,
      pickLists,
      translationKey,
    } = this.props;

    return (
      <IntlConsumer>
        {intl => (
          <Card
            data-test-customproperty={value.name}
            headerStart={
              <strong>
                {value.id ? (
                  <FormattedMessage
                    id={`stripes-erm-components.customProperties.${translationKey}.edit`}
                  />
                ) : (
                  <FormattedMessage
                    id={`stripes-erm-components.customProperties.${translationKey}.new`}
                  />
                )}
              </strong>
            }
            headerEnd={
              <span>
                <Button
                  data-test-customproperty-cancel-btn
                  marginBottom0
                  onClick={onCancel}
                >
                  <FormattedMessage id="stripes-core.button.cancel" />
                </Button>
                <Button
                  buttonStyle="primary"
                  data-test-customproperty-save-btn
                  disabled={meta.invalid || meta.pristine || meta.submitting}
                  marginBottom0
                  onClick={onSave}
                >
                  <FormattedMessage id="stripes-core.button.save" />
                </Button>
              </span>
            }
          >
            <Row>
              <Col xs={6}>
                <Field
                  component={TextField}
                  label={
                    <FormattedMessage id="stripes-erm-components.customProperties.label" />
                  }
                  name={`${name}.label`}
                  required
                  startControl={
                    <InfoPopover
                      content={
                        <FormattedMessage
                          id={`stripes-erm-components.${translationKey}.help.label`}
                        />
                      }
                    />
                  }
                  validate={requiredValidator}
                />
              </Col>
              <Col xs={6}>
                <Field
                  component={TextField}
                  label={
                    <FormattedMessage id="stripes-erm-components.customProperties.name" />
                  }
                  name={`${name}.name`}
                  required
                  startControl={
                    <InfoPopover
                      content={
                        <FormattedMessage
                          id={`stripes-erm-components.${translationKey}.help.name`}
                        />
                      }
                    />
                  }
                  validate={v => {
                    if (v && v.length) {
                      return /^[a-z][a-z0-9]*$/i.test(v) ? (
                        undefined
                      ) : (
                        <FormattedMessage id="stripes-erm-components.errors.hasNonAlphaName" />
                      );
                    }

                    return requiredValidator(v);
                  }}
                />
              </Col>
            </Row>
            <Field
              component={TextArea}
              label={
                <FormattedMessage id="stripes-erm-components.customProperties.description" />
              }
              name={`${name}.description`}
              required
              validate={requiredValidator}
            />
            <Row>
              <Col xs={4}>
                <Field
                  component={TextField}
                  label={
                    <FormattedMessage id="stripes-erm-components.customProperties.orderWeight" />
                  }
                  name={`${name}.weight`}
                  required
                  validate={requiredValidator}
                  type="number"
                />
              </Col>
              <Col xs={4}>
                <Field
                  component={Select}
                  dataOptions={[
                    {
                      label: intl.formatMessage({
                        id: 'stripes-erm-components.yes',
                      }),
                      value: 'true',
                    },
                    {
                      label: intl.formatMessage({
                        id: 'stripes-erm-components.no',
                      }),
                      value: 'false',
                    },
                  ]}
                  format={this.booleanToString}
                  label={
                    <FormattedMessage
                      id={`stripes-erm-components.customProperties.${translationKey}.primary`}
                    />
                  }
                  name={`${name}.primary`}
                  parse={this.stringToBoolean}
                  required
                  validate={requiredValidator}
                />
              </Col>
              <Col xs={4}>
                <Field
                  component={Select}
                  dataOptions={[
                    {
                      label: intl.formatMessage({
                        id:
                          'stripes-erm-components.customProperty.internalTrue',
                      }),
                      value: 'true',
                    },
                    {
                      label: intl.formatMessage({
                        id:
                          'stripes-erm-components.customProperty.internalFalse',
                      }),
                      value: 'false',
                    },
                  ]}
                  format={this.booleanToString}
                  label={
                    <FormattedMessage id="stripes-erm-components.customProperties.defaultVisibility" />
                  }
                  name={`${name}.defaultInternal`}
                  parse={this.stringToBoolean}
                  required
                  validate={requiredValidator}
                />
              </Col>
            </Row>
            {/* Users can only configure the type of a custom property when creating it, not when editing it */}
            {value.id === undefined && (
              <Row>
                <Col xs={6}>
                  <Field
                    component={Select}
                    dataOptions={[
                      { label: '', value: '' },
                      {
                        label: intl.formatMessage({
                          id: 'stripes-erm-components.customProperties.type.decimal',
                        }),
                        value: 'Decimal',
                      },
                      {
                        label: intl.formatMessage({
                          id: 'stripes-erm-components.customProperties.type.integer',
                        }),
                        value: 'Integer',
                      },
                      {
                        label: intl.formatMessage({
                          id: 'stripes-erm-components.customProperties.type.text',
                        }),
                        value: 'Text',
                      },
                      {
                        label: intl.formatMessage({
                          id: 'stripes-erm-components.customProperties.type.pickList',
                        }),
                        value: 'Refdata',
                      },
                    ]
                    }
                    label={
                      <FormattedMessage id="stripes-erm-components.customProperties.type" />
                    }
                    name={`${name}.type`}
                    required
                    validate={requiredValidator}
                  />
                </Col>
                <Col xs={6}>
                  {value.type === 'Refdata' && (
                    <Field
                      component={Select}
                      dataOptions={[{ label: '', value: '' }, ...pickLists]}
                      label={
                        <FormattedMessage id="stripes-erm-components.customProperties.type.pickList" />
                      }
                      name={`${name}.category`}
                      required
                      validate={requiredValidator}
                    />
                  )}
                </Col>
              </Row>
            )}
          </Card>
        )}
      </IntlConsumer>
    );
  }
}
