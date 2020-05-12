import { Select, TextField } from '@folio/stripes/components';
import customPropertyTypes from '../customPropertyTypes';
import { invalidNumber as invalidNumberValidator, required as requiredValidator } from '../validators';

const { DECIMAL, NUMBER, SELECT } = customPropertyTypes;

export default custPropDefinition => {
  const props = {
    validate: requiredValidator
  };

  const type = custPropDefinition?.type;

  if (type === NUMBER || type === DECIMAL) {
    props.component = TextField;
    props.type = 'number';
    props.validate = invalidNumberValidator;
  } else if (type === SELECT) {
    props.component = Select;
    props.dataOptions = custPropDefinition.category.values.map(rdv => ({ label: rdv.label, value: rdv.id }));
    props.placeholder = ' ';
  } else {
    props.component = TextField;
  }

  return props;
};
