import { FormattedMessage } from 'react-intl';
import {
  composeValidators,
  composeValidatorsWithArgs,
  invalidNumber as invalidNumberValidator,
  rangeOverflow as rangeOverflowValidator,
  rangeUnderflow as rangeUnderflowValidator,
  required,
  requiredObject
} from '@k-int/stripes-kint-components';
import isURL from 'validator/lib/isURL';

const min = Number.MIN_SAFE_INTEGER;
const max = Number.MAX_SAFE_INTEGER;
const validateProps = { allow_underscores: true };

const invalidNumber = value => (
  invalidNumberValidator(value, min, max, 'stripes-erm-components')
);

const rangeOverflow = value => (
  rangeOverflowValidator(value, min, max, 'stripes-erm-components')
);

const rangeUnderflow = value => (
  rangeUnderflowValidator(value, min, max, 'stripes-erm-components')
);

const validateURL = (value) => {
  const isURLProps = {
    ...validateProps,
    validate_length: false
  };
  if (value) {
    if (!isURL(value, isURLProps)) {
      return <FormattedMessage id="stripes-erm-components.url.error.invalidURL" />;
    }
  }

  return undefined;
};

const validateURLAndLength = (value) => {
  if (value) {
    if (!isURL(value, validateProps)) {
      return <FormattedMessage id="stripes-erm-components.url.error.invalidURL" />;
    }
  }

  return undefined;
};

export {
  composeValidators,
  composeValidatorsWithArgs,
  invalidNumber,
  rangeOverflow,
  rangeUnderflow,
  required,
  requiredObject,
  validateURL,
  validateURLAndLength,
  validateURLSize
};
