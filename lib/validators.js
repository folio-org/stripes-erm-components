import React from 'react';
import { FormattedMessage } from 'react-intl';

const invalidNumber = value => (
  (value || value === 0) ? undefined : <FormattedMessage id="stripes-erm-components.errors.customPropertyInvalidNumber" />
);

const required = value => {
  const blankString = /^\s+$/;
  if ((value && !blankString.test(value)) || value === false || value === 0) {
    return undefined;
  }
  return <FormattedMessage id="stripes-core.label.missingRequiredField" />;
};

const requiredObject = (formValue = {}) => {
  // useKiwtFieldArray sets the _delete property on new objects by default
  // eslint-disable-next-line no-unused-vars
  const { _delete, ...value } = formValue;
  if (Object.keys(value).length === 0) {
    return <FormattedMessage id="stripes-core.label.missingRequiredField" />;
  }
  return undefined;
};

const composeValidators = (...validators) => (
  (value, allValues, meta) => (
    validators.reduce((error, validator) => (
      error || validator(value, allValues, meta)
    ), undefined)
  )
);

export {
  composeValidators,
  invalidNumber,
  required,
  requiredObject,
};
