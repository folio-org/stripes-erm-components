import customPropertyTypes from '../customPropertyTypes';

const { DECIMAL, NUMBER, SELECT, TEXT } = customPropertyTypes;

export default (termDefinition, formatMessage) => {
  const getLabel = id => (formatMessage ? formatMessage({ id }) : undefined);

  const type = termDefinition?.type;

  const operators = [
    { value: ' isSet', label: getLabel('ui-licenses.operator.isSet'), noValueAllowed: true },
    { value: ' isNotSet', label: getLabel('ui-licenses.operator.isNotSet'), noValueAllowed: true },
  ];

  if (!type || type === NUMBER || type === DECIMAL) {
    operators.push(
      { value: '==', label: getLabel('ui-licenses.operator.equals') },
      { value: '!=', label: getLabel('ui-licenses.operator.doesNotEqual') },
      { value: '>=', label: getLabel('ui-licenses.operator.isGreaterThanOrEqual') },
      { value: '<=', label: getLabel('ui-licenses.operator.isLessThanOrEqual') },
    );
  }

  if (!type || type === SELECT) {
    operators.push(
      { value: '==', label: getLabel('ui-licenses.operator.is') },
      { value: '!=', label: getLabel('ui-licenses.operator.isNot') },
    );
  }

  if (!type || type === TEXT) {
    operators.push(
      { value: '=~', label: getLabel('ui-licenses.operator.contains') },
      { value: '!~', label: getLabel('ui-licenses.operator.doesNotContain') },
    );
  }

  return operators;
};
