import React from 'react';
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
import { composeValidators, required } from '../validators';
import withKiwtFieldArray from '../withKiwtFieldArray';

class RolesFieldArray extends React.Component {
  static propTypes = {
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
    }),
    orgIndex: PropTypes.number,
  };

  static defaultProps = {
    items: [],
  }

  validateDuplicateRoles = (value, allValues) => {
    const { orgIndex } = this.props;

    const orgRoles = allValues?.orgs[orgIndex]?.roles.map(r => r?.role?.value);
    const orgRolesWithCurrentValue = orgRoles.filter(v => v === value);

    if (orgRolesWithCurrentValue.length > 1) {
      return <FormattedMessage id="stripes-erm-components.organizations.noDuplicates" />;
    }

    return undefined;
  }

  renderRoles = () => {
    const { items, name, onDeleteField } = this.props;
    return items.map((item, index) => {
      return (
        <Row key={index}>
          <Col md={4} xs={12}>
            <Label required tagName="span">
              <FormattedMessage id="stripes-erm-components.organizations.role" />
            </Label>
            <Field
              component={Select}
              dataOptions={this.props.roleValues}
              index={index}
              name={`${name}[${index}].role.value`}
              placeholder=" "
              validate={composeValidators(required, this.validateDuplicateRoles)}
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
    });
  }

  render() {
    return (

      <div data-test-org-role>
        <div>
          {this.renderRoles()}
        </div>
        <Button
          data-test-org-fa-add-button
          id="add-org-role-btn"
          onClick={() => this.props.onAddField()}
        >
          <FormattedMessage id="stripes-erm-components.organizations.addRole" />
        </Button>
      </div>

    );
  }
}

export default withKiwtFieldArray(RolesFieldArray);
