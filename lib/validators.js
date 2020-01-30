import React from 'react';
import { FormattedMessage } from 'react-intl';

const required = value => (
  (value || value === false || value === 0) ? undefined : <FormattedMessage id="stripes-core.label.missingRequiredField" />
);

const requiredObject = (formValue = {}) => {
  // withKiwtFieldArray sets the _delete property on new objects by default
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
  required,
  requiredObject,
};
