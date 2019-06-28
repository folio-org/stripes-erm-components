import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  Card,
  IconButton,
  Label,
  Select,
} from '@folio/stripes/components';
import { required } from '../validators';
import OrgInfo from './OrgInfo';

export default class OrganizationCard extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    index: PropTypes.string,
    organization: PropTypes.object,
    onDeleteField: PropTypes.func,
    onReplaceField: PropTypes.func,
    onAddField: PropTypes.func,
    organizationPickerComponent: PropTypes.elementType,
    roles: PropTypes.arrayOf(PropTypes.object),
  };


  renderRole = (name, index) => {
    return (
      <Col xs={5}>
        <Label required tagName="span">
          <FormattedMessage id="stripes-erm-components.organizations.role" />
        </Label>
        <FormattedMessage id="stripes-erm-components.organizations.selectRole">
          {placeholder => (
            <Field
              component={Select}
              data-test-org-role
              id={`${name}-role-${index}`}
              name={`${name}[${index}].role`}
              placeholder={placeholder}
              dataOptions={this.props.roles}
              validate={required}
            />
          )}
        </FormattedMessage>
      </Col>);
  }

  render() {
    const {
      name,
      index,
      organization,
      onDeleteField,
      onReplaceField,
      onAddField,
      organizationPickerComponent,
    } = this.props;

    return (
      <Card
        data-test-organizations-org
        hasMargin
        key={index}
        headerStart={<strong>{`Organization ${index + 1}`}</strong>}
        headerEnd={
          <IconButton
            data-test-org-delete-button
            id={`${name}-delete-${index}`}
            onClick={() => onDeleteField(index, organization)}
            icon="trash"
          />
        }
      >
        <div>
          <OrgInfo
            name={name}
            index={index}
            organization={organization}
            onAddField={onAddField}
            onReplaceField={onReplaceField}
            organizationPickerComponent={organizationPickerComponent}
          />
          {this.renderRole(name, index)}
        </div>
      </Card>
    );
  }
}
