import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Col,
  IconButton,
  Layout,
  Row,
  Select,
  Tooltip,
} from '@folio/stripes/components';

import { required as requiredValidator } from '../validators';

import getOperators from './getOperators';
import getValueProps from './getValueProps';

const propTypes = {
  ariaLabelledby: PropTypes.string.isRequired,
  clearRuleValue: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  intl: PropTypes.object,
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  custPropDefinition: PropTypes.shape({
    type: PropTypes.string,
    category: PropTypes.shape({
      values: PropTypes.arrayOf(PropTypes.object),
    }),
  }),
  value: PropTypes.shape({
    operator: PropTypes.string,
    value: PropTypes.string,
  }),
};

const CustomPropertyRule = props => {
  const {
    ariaLabelledby,
    clearRuleValue,
    index,
    intl: { formatMessage },
    name,
    onDelete,
    custPropDefinition,
    value,
  } = props;

  const valueProps = getValueProps(custPropDefinition, formatMessage);
  const operators = getOperators(custPropDefinition, formatMessage);
  const selectedOperator = operators.find(o => o.value === value?.operator);

  return (
    <Row
      key={name}
      data-test-rule-row
    >
      <Col xs={2}>
        <Layout className="textCentered">
          {index === 0 ? null : <FormattedMessage id="stripes-erm-components.OR" />}
        </Layout>
      </Col>
      <Col xs={4}>
        <Field
          name={`${name}.operator`}
          validate={requiredValidator}
        >
          {({ input, meta }) => (
            <Select
              {...input}
              aria-labelledby={`${ariaLabelledby} rule-column-header-comparator`}
              data-test-rule-operator
              dataOptions={operators}
              error={meta?.touched && meta?.error}
              onChange={e => {
                input.onChange(e);

                const newlySelectedOperator = operators.find(o => o.value === e.target.value);
                if (newlySelectedOperator?.noValueAllowed) {
                  clearRuleValue();
                }
              }}
              placeholder=" "
              required
            />
          )}
        </Field>
      </Col>
      <Col xs={4}>
        { selectedOperator?.noValueAllowed ?
          null
          :
          <Field
            aria-labelledby={`${ariaLabelledby} rule-column-header-value`}
            data-test-rule-value
            name={`${name}.value`}
            required
            validate={requiredValidator}
            {...valueProps}
          />
        }
      </Col>
      <Col xs={2}>
        { index ? (
          <Tooltip
            id={uniqueId('delete-rule-btn')}
            text={<FormattedMessage id="stripes-erm-components.customProperty.filters.removeRule" values={{ index: index + 1 }} />}
          >
            {({ ref, ariaIds }) => (
              <IconButton
                ref={ref}
                aria-labelledby={ariaIds.text}
                data-test-delete-rule-btn
                icon="trash"
                onClick={onDelete}
              />
            )}
          </Tooltip>
        ) : null}
      </Col>
    </Row>
  );
};

CustomPropertyRule.propTypes = propTypes;

export default injectIntl(CustomPropertyRule);
