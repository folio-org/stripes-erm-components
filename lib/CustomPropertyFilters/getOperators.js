import customPropertyTypes from '../customPropertyTypes';

const { DECIMAL, NUMBER, SELECT, TEXT } = customPropertyTypes;

export default (custPropDefinition, formatMessage) => {
  const getLabel = id => (formatMessage ? formatMessage({ id }) : undefined);

  const type = custPropDefinition?.type;

  const operators = [
    { value: ' isSet', label: getLabel('stripes-erm-components.operator.isSet'), noValueAllowed: true },
    { value: ' isNotSet', label: getLabel('stripes-erm-components.operator.isNotSet'), noValueAllowed: true },
  ];

  if (!type || type === NUMBER || type === DECIMAL) {
    operators.push(
      { value: '==', label: getLabel('stripes-erm-components.operator.equals') },
      { value: '!=', label: getLabel('stripes-erm-components.operator.doesNotEqual') },
      { value: '>=', label: getLabel('stripes-erm-components.operator.isGreaterThanOrEqual') },
      { value: '<=', label: getLabel('stripes-erm-components.operator.isLessThanOrEqual') },
    );
  }

  if (!type || type === SELECT) {
    operators.push(
      { value: '==', label: getLabel('stripes-erm-components.operator.is') },
      { value: '!=', label: getLabel('stripes-erm-components.operator.isNot') },
    );
  }

  if (!type || type === TEXT) {
    operators.push(
      { value: '=~', label: getLabel('stripes-erm-components.operator.contains') },
      { value: '!~', label: getLabel('stripes-erm-components.operator.doesNotContain') },
    );
  }

  return operators;
};
