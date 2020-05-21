import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form-html5-validation';
import PropTypes from 'prop-types';
import {
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';

import customPropertyTypes from '../customPropertyTypes';

class CustomPropertyValue extends React.Component {
  static propTypes = {
    customProperty: PropTypes.object,
    index: PropTypes.number,
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      onChange: PropTypes.func,
    }),
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }),
    validate: PropTypes.func
  };

  render() {
    const { customProperty, index, intl, validate } = this.props;
    const { input: { name, onChange, value } } = this.props;
    const currentValue = value[customProperty.value] ? value[customProperty.value][0] : {};
    const min = Number.MIN_SAFE_INTEGER;
    const max = Number.MAX_SAFE_INTEGER;

    const handleChange = e => {
      onChange({
        ...value,
        [customProperty.value]: [{
          ...currentValue,
          _delete: e.target.value === '' ? true : undefined, // Delete customProperty if removing the value.
          value: e.target.value
        }],
      });
    };

    // Figure out which component we're rendering and specify its unique props.
    let fieldProps = { component: TextField };

    if (customProperty.type === customPropertyTypes.SELECT) {
      fieldProps = {
        component: Select,
        dataOptions: customProperty.options,
        format: (v) => v?.value,
      }
    } else if (customProperty.type === customPropertyTypes.NUMBER || customProperty.type === customPropertyTypes.DECIMAL) {
      fieldProps = {
        badInput: intl.formatMessage({ id: 'stripes-erm-components.errors.customPropertyInvalidNumber' }),
        component: TextField,
        max,
        min,
        rangeOverflow: intl.formatMessage({ id: 'stripes-erm-components.errors.customPropertyDecimalValueNotInRange' }, { min, max }),
        rangeUnderflow: intl.formatMessage({ id: 'stripes-erm-components.errors.customPropertyDecimalValueNotInRange' }, { min, max }),
        step: 'any',
        type: 'number',
      };
    } else if (customProperty.type === customPropertyTypes.TEXT) {
      fieldProps = {
        component: TextArea,
        parse: v => v  // Lets us send an empty string instead of `undefined`
      };
    }

    return (
      <Field
        data-test-customproperty-value
        id={`edit-customproperty-${index}-value`}
        label={<FormattedMessage id="stripes-erm-components.prop.customPropertyValue" />}
        name={`${name}.${customProperty.value}[0].value`}
        onChange={handleChange}
        required={!customProperty.primary}
        validate={(fieldValue, allValues) => validate(fieldValue, allValues, customProperty)}
        valueMissing={intl.formatMessage({ id: 'stripes-core.label.missingRequiredField' })}
        {...fieldProps}
      />
    );
  }
}

export default CustomPropertyValue;
