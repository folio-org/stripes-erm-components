import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { uniq } from 'lodash';
import { Field } from 'redux-form';

import {
  Button,
  Col,
  IconButton,
  Layout,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

import withKiwtFieldArray from '../withKiwtFieldArray';
import { required } from '../validators';
import OrganizationPicker from './OrganizationPicker';

class OrganizationsFieldArray extends React.Component {
  static propTypes = {
    addContactBtnLabel: PropTypes.node,
    isEmptyMessage: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    onAddField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    roles: PropTypes.arrayOf(PropTypes.object),
    organizations: PropTypes.arrayOf(PropTypes.object),
    organizationPickerComponent: PropTypes.elementType,
  };

  static defaultProps = {
    addContactBtnLabel: <FormattedMessage id="stripes-erm-components.contacts.addContact" />,
    isEmptyMessage: <FormattedMessage id="stripes-erm-components.contacts.noContacts" />,
    organizationPickerComponent: OrganizationPicker,
  }

  state = {
    organizations: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (props.organizations.length > Object.keys(state.organizations).length) {
        const organizations = { state };
        props.organizations.forEach(org => { organizations[org.id] = org; });
        return { organizations };
      }
    return null;
  }

  validateDuplicateEntries = (value, allValues) => {
    const orgs = allValues[this.props.name] || [];

    const org = orgs.filter(org => {
      if(org.org) return org.org.name === value;
    });
    if (org.length < 2) return undefined;

    const rolesForThisorg = orgs.map(org => org.role);
    if (uniq(rolesForThisorg).length !== rolesForThisorg.length) {
       return <FormattedMessage id="stripes-erm-components.contacts.noDuplicates" />;
     }

    return undefined;
  }

  addOrganization = (org) => {
    console.log(org.id,'na modda');
    this.setState(prevState => ({
      organizations: {
        ...prevState.organizations,
        [org.id]: org,
      },
    }));
  }

  // renderOrganizationName = (org) => {
  //   console.log(org, 'here');
  //   const organization = org ? this.state.organizations[org.id] : org;
  //   if (!organization) return org;
  //
  //   const { name } = organization;
  //   console.log(name,'name');
  //   return name;
  // }

  // renderOrganizationId = (org) => {
  //   console.log(org,'id');
  //   const organization = org ? this.state.organizations[org.id] : org;
  //   if (!organization) return org;
  //
  //   const { id } = organization;
  //   console.log(id,'id');
  //   return id;
  // }


  renderEmpty = () => (
    <Layout className="padding-bottom-gutter" data-test-ic-empty-message>
      { this.props.isEmptyMessage }
    </Layout>
  );

  renderOrganizations = () => {
    const { items, name, onDeleteField } = this.props;

    const orgs = items.map((org, index) => (
      <Row
        data-test-internal-contact
        key={index}
      >
        <Col xs={6}>
          <Field
            addOrganization={this.addOrganization}
            component={this.props.organizationPickerComponent}
            data-test-ic-user
            name={`${name}[${index}].org.name`}
            id={`${name}-org-${index}`}
            normalize={value => {console.log(value,'val'); return value.name}}
            items={Object.keys(this.state.organizations).length}
            validate={[required, this.validateDuplicateEntries]}
          />
        </Col>
        <Col xs={5}>
          <FormattedMessage id="stripes-erm-components.contacts.selectRole">
            {placeholder => (
              <Field
                name={`${name}[${index}].role`}
                component={Select}
                data-test-ic-role
                dataOptions={this.props.roles}
                placeholder={placeholder}
                validate={required}
              />
            )}
          </FormattedMessage>
        </Col>
        <Col xs={1}>
          <IconButton
            data-test-ic-delete-button
            icon="trash"
            onClick={() => onDeleteField(index, org)}
          />
        </Col>
      </Row>
    ));

    return (
      <React.Fragment>
        <Row>
          <Col xs={6}><FormattedMessage id="stripes-erm-components.contacts.name" /></Col>
          <Col xs={5}><FormattedMessage id="stripes-erm-components.contacts.role" /></Col>
        </Row>
        { orgs }
      </React.Fragment>
    );
  }

  render() {
    const { items, onAddField } = this.props;

    return (
      <div data-test-internal-contacts-field-array>
        <div>
          { items.length ? this.renderOrganizations() : this.renderEmpty() }
        </div>
        <Button
          data-test-icfa-add-button
          onClick={() => onAddField({})}
          id={`add-org-${name}-btn`}
        >
          { this.props.addContactBtnLabel }
        </Button>
      </div>
    );
  }
}

export default withKiwtFieldArray(OrganizationsFieldArray);
