import React from 'react';
import { FormattedMessage } from 'react-intl';

const required = value => (
  !value ? <FormattedMessage id="stripes-core.label.missingRequiredField" /> : undefined
);

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
};
