import {
  composeValidators,
  invalidNumber as invalidNumberValidator,
  required,
  requiredObject
} from '@k-int/stripes-kint-components';

const invalidNumber = value => (
  invalidNumberValidator(value, 'stripes-erm-components')
);

export {
  composeValidators,
  invalidNumber,
  required,
  requiredObject,
};
