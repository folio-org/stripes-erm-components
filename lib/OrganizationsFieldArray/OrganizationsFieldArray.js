import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  Button,
  Col,
  IconButton,
  Layout,
  Row,
  Select,
} from '@folio/stripes/components';

import withKiwtFieldArray from '../withKiwtFieldArray';
import { required } from '../validators';
import OrganizationPicker from './OrganizationPicker';

class OrganizationsFieldArray extends React.Component {
  static propTypes = {
    addContactBtnLabel: PropTypes.node,
    change: PropTypes.func,
    isEmptyMessage: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    onAddField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    roles: PropTypes.arrayOf(PropTypes.object),
    organizationPickerComponent: PropTypes.elementType,
  };

  static defaultProps = {
    addContactBtnLabel: <FormattedMessage id="stripes-erm-components.organizations.addOrganization" />,
    isEmptyMessage: <FormattedMessage id="stripes-erm-components.organizations.noOrganizations" />,
    organizationPickerComponent: OrganizationPicker,
  }

  state = {
    organizations: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (props.items.length > Object.keys(state.organizations).length) {
      const organizations = { state };
      props.items.forEach(org => { organizations[org.id] = org; });
      return { organizations };
    }
    return null;
  }

  addOrganization = (org, index) => {
    const { name } = this.props;

    this.setState(prevState => ({
      organizations: {
        ...prevState.organizations,
        [org.id]: org,
      }
    }), () => this.props.change(`${name}[${index}].org.orgsUuid`, org.id)); // creates a new field in redux-form for orgsUuid
  };

  renderEmpty = () => (
    <Layout className="padding-bottom-gutter" data-test-org-empty-message>
      { this.props.isEmptyMessage }
    </Layout>
  );

  renderOrganizations = () => {
    const { items, name, onDeleteField } = this.props;

    const orgs = items.map((org, index) => (
      <Row
        data-test-org
        key={index}
      >
        <Col xs={6}>
          <Field
            addOrganization={this.addOrganization}
            component={this.props.organizationPickerComponent}
            data-test-org-name
            name={`${name}[${index}].org.name`}
            index={index}
            id={`${name}-org-${index}`}
            normalize={value => value.name}
          />
        </Col>
        <Col xs={5}>
          <FormattedMessage id="stripes-erm-components.contacts.selectRole">
            {placeholder => (
              <Field
                name={`${name}[${index}].role`}
                component={Select}
                data-test-org-role
                dataOptions={this.props.roles}
                placeholder={placeholder}
                validate={required}
              />
            )}
          </FormattedMessage>
        </Col>
        <Col xs={1}>
          <IconButton
            data-test-org-delete-button
            icon="trash"
            onClick={() => onDeleteField(index, org)}
          />
        </Col>
      </Row>
    ));

    return (
      <React.Fragment>
        <Row>
          <Col xs={6}><FormattedMessage id="stripes-erm-components.organizations.name" /></Col>
          <Col xs={5}><FormattedMessage id="stripes-erm-components.organizations.role" /></Col>
        </Row>
        { orgs }
      </React.Fragment>
    );
  }

  render() {
    const { items, name, onAddField } = this.props;

    return (
      <div data-test-organizations-field-array>
        <div>
          { items.length ? this.renderOrganizations() : this.renderEmpty() }
        </div>
        <Button
          data-test-orgfa-add-button
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
