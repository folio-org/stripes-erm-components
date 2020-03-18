import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form-html5-validation';
import PropTypes from 'prop-types';
import {
  Select,
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
    let FieldComponent = TextField;
    let fieldProps = {};

    if (customProperty.type === customPropertyTypes.SELECT) {
      FieldComponent = Select;
      fieldProps.dataOptions = customProperty.options;
      fieldProps.format = (v) => v?.value;
    }

    if (customProperty.type === customPropertyTypes.NUMBER || customProperty.type === customPropertyTypes.DECIMAL) {
      FieldComponent = TextField;
      fieldProps = {
        badInput: intl.formatMessage({ id: 'stripes-erm-components.errors.customPropertyInvalidNumber' }),
        max,
        min,
        rangeOverflow: intl.formatMessage({ id: 'stripes-erm-components.errors.customPropertyDecimalValueNotInRange' }, { min, max }),
        rangeUnderflow: intl.formatMessage({ id: 'stripes-erm-components.errors.customPropertyDecimalValueNotInRange' }, { min, max }),
        step: 'any',
        type: 'number',
      };
    }

    if (FieldComponent === TextField) {
      fieldProps.maxLength = 255;
    }

    return (
      <Field
        component={FieldComponent}
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
