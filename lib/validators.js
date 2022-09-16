import {
  composeValidators,
  composeValidatorsWithArgs,
  invalidNumber as invalidNumberValidator,
  rangeOverflow as rangeOverflowValidator,
  rangeUnderflow as rangeUnderflowValidator,
  required,
  requiredObject
} from '@k-int/stripes-kint-components';

const min = Number.MIN_SAFE_INTEGER;
const max = Number.MAX_SAFE_INTEGER;

const invalidNumber = value => (
  invalidNumberValidator(value, min, max, 'stripes-erm-components')
);

const rangeOverflow = value => (
  rangeOverflowValidator(value, min, max, 'stripes-erm-components')
);

const rangeUnderflow = value => (
  rangeUnderflowValidator(value, min, max, 'stripes-erm-components')
);

export {
  composeValidators,
  composeValidatorsWithArgs,
  invalidNumber,
  rangeOverflow,
  rangeUnderflow,
  required,
  requiredObject,
};
