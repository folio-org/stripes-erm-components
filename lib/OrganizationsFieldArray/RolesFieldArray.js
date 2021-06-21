import { useEffect, useState } from 'react';
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

const RolesFieldArray = ({
  items,
  name,
  onAddField,
  onDeleteField,
  roleValues
}) => {
  const [rolesInUse, setRolesInUse] = useState([]);

  useEffect(() => {
    setRolesInUse(items.map(i => i?.role?.value).filter(x => !!x));
  }, [items]);

  const renderRoles = () => (
    items.map((item, index) => {
      // Construct roleValues per item
      // Allow either the currently set roleValue OR any that are not set elsewhere
      const dataOptions = roleValues.filter(rv => !rolesInUse.includes(rv.value) || rv.value === item.role?.value);
      return (
        <Row key={index}>
          <Col md={4} xs={12}>
            <Label required tagName="span">
              <FormattedMessage id="stripes-erm-components.organizations.role" />
            </Label>
            <Field
              component={Select}
              dataOptions={dataOptions}
              index={index}
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
    <div data-test-org-role>
      <div>
        {renderRoles()}
      </div>
      <Button
        data-test-org-fa-add-button
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
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.shape({
      note: PropTypes.string,
      org: PropTypes.shape({
        name: PropTypes.string,
        orgsUuid: PropTypes.string,
      }),
      roles: PropTypes.arrayOf(PropTypes.object),
    })
  }),
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
