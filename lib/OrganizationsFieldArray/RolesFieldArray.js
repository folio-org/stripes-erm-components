import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import {
  Button,
  Col,
  IconButton,
  Label,
  Row,
  Select,
  TextArea,
} from '@folio/stripes/components';
import { required } from '../validators';
import withKiwtFieldArray from '../withKiwtFieldArray';

// custom hook that holds any required value (props/state) from  the previous render cycle via a ref.
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const RolesFieldArray = ({
  items,
  name,
  onAddField,
  onDeleteField,
  roleValues
}) => {
  const [rolesInUse, setRolesInUse] = useState([]);
  const roleRefs = useRef([]);
  roleRefs.current = [];

  useEffect(() => {
    setRolesInUse(items.map(i => i?.role?.id).filter(x => !!x));
  }, [items]);

  const itemsLength = items.length;
  const previousCount = usePrevious(itemsLength);

  useEffect(() => {
    // the second conditional is checking if the current field to be focused is the default role field. (hits the condition when there are 2 fields left and one of them is deleted)
    if (roleRefs.current.length > 1 || (roleRefs.current.length > 0 && previousCount - itemsLength === 1)) {
      roleRefs.current[itemsLength - 1].focus();
    }
  }, [previousCount, itemsLength]);

  // callback ref that adds the individual ref to a field into the roleRefs array
  const addToRefs = (node) => {
    if (node && !roleRefs.current.includes(node)) {
      roleRefs.current.push(node);
    }
  };

  const renderRoles = () => (
    items.map((item, index) => {
      // Construct roleValues per item
      // Allow either the currently set roleValue OR any that are not set elsewhere
      const dataOptions = roleValues.filter(rv => !rolesInUse.includes(rv.value) || rv.value === item.role?.id);

      return (
        <Row key={index}>
          <Col md={4} xs={12}>
            <Label required tagName="span">
              <FormattedMessage id="stripes-erm-components.organizations.role" />
            </Label>
            <Field
              component={Select}
              data-test-org-role-field
              data-testid={`rolesFieldArray[${index}]`}
              dataOptions={dataOptions}
              index={index}
              inputRef={addToRefs}
              name={`${name}[${index}].role.id`}
              placeholder=" "
              validate={required}
            />
          </Col>
          <Col md={7} xs={12}>
            <Field
              component={TextArea}
              data-test-org-note
              label={<FormattedMessage id="stripes-erm-components.organizations.note" />}
              name={`${name}[${index}].note`}
              parse={v => v}
            />
          </Col>
          {items.length > 1 ?
            <Col xs={1}>
              <IconButton
                data-test-delete-role-field-button
                icon="trash"
                onClick={() => onDeleteField(index, item)}
              />
            </Col>
            : undefined}
        </Row>
      );
    })
  );

  return (
    <div data-test-render-org-role>
      <div>
        {renderRoles()}
      </div>
      <Button
        data-test-org-role-add-button
        id="add-org-role-btn"
        onClick={() => onAddField()}
      >
        <FormattedMessage id="stripes-erm-components.organizations.addRole" />
      </Button>
    </div>
  );
};

RolesFieldArray.defaultProps = {
  items: []
};

RolesFieldArray.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  onAddField: PropTypes.func,
  onDeleteField: PropTypes.func,
  roleValues: PropTypes.arrayOf(PropTypes.object),
  organization: PropTypes.shape({
    org: PropTypes.shape({
      name: PropTypes.string,
    }),
  })
};

export default withKiwtFieldArray(RolesFieldArray);
