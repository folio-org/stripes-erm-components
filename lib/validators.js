import React from 'react';
import { FormattedMessage } from 'react-intl';

const required = value => (
  (value || value === false || value === 0) ? undefined : <FormattedMessage id="stripes-core.label.missingRequiredField" />
);

const requiredObject = (value = {}) => {
  // withKiwtFieldArray sets the _delete property on new objects by default
  delete value._delete;
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
  required,
  requiredObject,
};
