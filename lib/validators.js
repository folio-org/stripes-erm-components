import React from 'react';
import { FormattedMessage } from 'react-intl';

const required = value => (
  (value || value === false || value === 0) ? undefined : <FormattedMessage id="stripes-core.label.missingRequiredField" />
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
