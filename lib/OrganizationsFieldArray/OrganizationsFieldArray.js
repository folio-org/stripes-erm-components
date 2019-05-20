import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { uniq } from 'lodash';
import { Field } from 'redux-form';

import {
  Button,
  Col,
  IconButton,
  Label,
  Layout,
  Row,
  Select,
} from '@folio/stripes/components';

import withKiwtFieldArray from '../withKiwtFieldArray';
import { required } from '../validators';
import OrganizationPicker from './OrganizationPicker';

class OrganizationsFieldArray extends React.Component {
  static propTypes = {
    addOrganizationBtnLabel: PropTypes.node,
    isEmptyMessage: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    onAddField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    roles: PropTypes.arrayOf(PropTypes.object),
    organizationPickerComponent: PropTypes.elementType,
  };

  static defaultProps = {
    addOrganizationBtnLabel: <FormattedMessage id="stripes-erm-components.organizations.addOrganization" />,
    isEmptyMessage: <FormattedMessage id="stripes-erm-components.organizations.noOrganizations" />,
    organizationPickerComponent: OrganizationPicker,
  }

  validateDuplicateEntries = /* istanbul ignore next */ (value, allValues) => {
    const orgs = allValues[this.props.name] || [];

    const organizations = orgs.filter(organization => {
      const { org } = organization;
      return org ? org.name === value.name : [];
    });
    if (organizations.length < 2) return undefined;

    const rolesForThisOrg = orgs.map(org => org.role);
    if (uniq(rolesForThisOrg).length !== rolesForThisOrg.length) {
      return <FormattedMessage id="stripes-erm-components.organizations.noDuplicates" />;
    }

    return undefined;
  }

  renderEmpty = () => (
    <Layout className="padding-bottom-gutter" data-test-org-empty-message>
      {this.props.isEmptyMessage}
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
            component={this.props.organizationPickerComponent}
            data-test-org-name
            id={`${name}-nameOrg-${index}`}
            name={`${name}[${index}].org`}
            validate={[required, this.validateDuplicateEntries]}
          />
        </Col>
        <Col xs={5}>
          <FormattedMessage id="stripes-erm-components.organizations.selectRole">
            {placeholder => (
              <Field
                component={Select}
                data-test-org-role
                dataOptions={this.props.roles}
                id={`${name}-role-${index}`}
                name={`${name}[${index}].role`}
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
            id={`${name}-delete-${index}`}
            onClick={() => onDeleteField(index, org)}
          />
        </Col>
      </Row>
    ));

    return (
      <React.Fragment>
        <Row>
          <Col xs={6}>
            <Label required tagName="span">
              <FormattedMessage id="stripes-erm-components.organizations.name" />
            </Label>
          </Col>
          <Col xs={5}>
            <Label required tagName="span">
              <FormattedMessage id="stripes-erm-components.organizations.role" />
            </Label>
          </Col>
        </Row>
        {orgs}
      </React.Fragment>
    );
  }

  render() {
    const { items, onAddField } = this.props;

    return (
      <div data-test-organizations-field-array>
        <div>
          {items.length ? this.renderOrganizations() : this.renderEmpty()}
        </div>
        <Button
          data-test-orgfa-add-button
          onClick={() => onAddField({})}
          id="add-org-btn"
        >
          {this.props.addOrganizationBtnLabel}
        </Button>
      </div>
    );
  }
}

export default withKiwtFieldArray(OrganizationsFieldArray);
