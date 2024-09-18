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
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const min = Number.MIN_SAFE_INTEGER;
const max = Number.MAX_SAFE_INTEGER;
const isURLProps = { allow_underscores: true, require_protocol: true };

const datePlausibilityCheck = (value, dateFormat, backendDateStandard) => {
  if (value) {
    const formats = [dateFormat, backendDateStandard];
    const isValid = formats.some(format => dayjs(value, format, true).isValid());

    if (!isValid) {
      return <FormattedMessage id="stripes-erm-components.errors.invalidDate" />;
    }
  }

  return undefined;
};

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
  const validateProps = {
    ...isURLProps,
    validate_length: false
  };
  if (value) {
    if (!isURL(value, validateProps)) {
      return <FormattedMessage id="stripes-erm-components.url.error.invalidURL" />;
    }
  }

  return undefined;
};

const validateURLAndLength = (value) => {
  if (value) {
    if (!isURL(value, isURLProps)) {
      return <FormattedMessage id="stripes-erm-components.url.error.invalidURL" />;
    }
  }

  return undefined;
};

export {
  composeValidators,
  composeValidatorsWithArgs,
  datePlausibilityCheck,
  invalidNumber,
  rangeOverflow,
  rangeUnderflow,
  required,
  requiredObject,
  validateURL,
  validateURLAndLength
};
