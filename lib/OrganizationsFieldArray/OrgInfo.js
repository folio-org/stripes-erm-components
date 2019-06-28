import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';
import { AppIcon } from '@folio/stripes/core';
import { Field } from 'redux-form';
import {
  Button,
  Col,
  Card,
  Layout,
  Label,
  Select,
} from '@folio/stripes/components';
import { required } from '../validators';

export default class OrgInfo extends React.Component {
  static propTypes = {
    index: PropTypes.string,
    name: PropTypes.string,
    organization: PropTypes.object,
    onReplaceField: PropTypes.func,
    onAddField: PropTypes.func,
    roles: PropTypes.arrayOf(PropTypes.object),
  };

  renderOrganizationPicker = (index, name) => {
    return (
      <this.props.organizationPickerComponent
        data-test-org-name
        onAddOrg={this.onAddOrg}
        index={index}
        id={`${name}-nameOrg-${index}`}
      />
    );
  }

  onAddOrg = (organization, index) => {
    const { name, id } = organization;
    const org = { name, orgsUuid: id };
    this.props.onReplaceField(index, { org });
  }

  unlinkOrg = (index, orgId) => {
    this.props.onAddField({ id: orgId, _delete: true });
    this.props.onReplaceField(index, { org: {} });
  }

  renderOrganizationName = (orgName) => {
    const { index, name } = this.props;
    return (
      <span>
        <AppIcon
          app="organizations"
          appIconKey="organizations"
          size="small"
        />
        {' '}
        <strong id={`${name}-nameOrg-${index}`}>{`${orgName}`}</strong>
      </span>
    );
  }

  renderOrgInfo = () => {
    const { index, organization, name } = this.props;
    const { org } = organization;
    return (
      <Card
        cardStyle="positive"
        hasMargin
        headerStart={
          <strong>Organization</strong>
        }
        key={index}
        headerEnd={
          <Button
            data-test-unlink-button
            buttonStyle="danger"
            id={`${name}-unlink-${index}`}
            onClick={() => this.unlinkOrg(index, organization.id)}
          >
            <FormattedMessage id="stripes-erm-components.organizations.unlinkOrganization" />
          </Button>
        }
        roundedBorder
      >
        {this.renderOrganizationName(org.name)}
      </Card>
    );
  }

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

  renderDefault = () => {
    const { index, name } = this.props;
    return (
      <Field
        component={Card}
        data-test-org-name
        id={`${name}-nameOrg-${index}`}
        name={`${name}[${index}].org`}
        cardStyle="negative"
        hasMargin
        headerStart={
          <span>
            <AppIcon
              app="organizations"
              appIconKey="organizations"
              size="small"
            />
            {' '}
            <strong>Organization</strong>
          </span>
        }
        headerEnd={this.renderOrganizationPicker(index, name)}
        roundedBorder
      >
        <div>
          <Layout className="textCentered">
            <strong>
              <FormattedMessage id="stripes-erm-components.organizations.noOrganization" />
            </strong>
          </Layout>
          <Layout className="textCentered">
            <FormattedMessage id="stripes-erm-components.organizations.addOrganizationToStart" />
          </Layout>
        </div>
      </Field>
    );
  }

  render() {
    const { organization, name, index } = this.props;
    const { org } = organization;
    return (
      <div>
        {org && !isEmpty(org) ? this.renderOrgInfo() : this.renderDefault()}
        {this.renderRole(name, index)}
      </div>
    );
  }
}
