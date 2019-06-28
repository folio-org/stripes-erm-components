import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';
import { AppIcon } from '@folio/stripes/core';
import { Field } from 'redux-form';
import {
  Button,
  Card,
  Layout,
} from '@folio/stripes/components';

export default class OrgInfo extends React.Component {
  static propTypes = {
    index: PropTypes.string,
    name: PropTypes.string,
    organization: PropTypes.object,
    onReplaceField: PropTypes.func,
    onAddField: PropTypes.func,
    organizationPickerComponent: PropTypes.elementType,
  };

  renderOrganizationPicker = (index, name) => {
    const { organizationPickerComponent } = this.props;
    return (
      <Field
        component={organizationPickerComponent}
        data-test-org-name
        onAddOrg={this.onAddOrg}
        index={index}
        id={`${name}-nameOrg-${index}`}
        name={`${name}[${index}].picker`}
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
    const { organization } = this.props;
    const { org } = organization;

    return org && !isEmpty(org) ?
      this.renderOrgInfo() :
      this.renderDefault();
  }
}
