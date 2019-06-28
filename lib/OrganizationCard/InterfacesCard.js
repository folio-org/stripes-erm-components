import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get, isEmpty } from 'lodash';
import { AppIcon } from '@folio/stripes/core';
import { Field } from 'redux-form';
import {
  Button,
  Card,
  Layout,
  MultiColumnList,
  Icon,
} from '@folio/stripes/components';

export default class InterfacesCard extends React.Component {
  static propTypes = {
    index: PropTypes.string,
    name: PropTypes.string,
    organization: PropTypes.object,
    organizations: PropTypes.arrayOf(PropTypes.object),
    onReplaceField: PropTypes.func,
    onAddField: PropTypes.func,
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

  renderOrgPreview = (organization) => {
    const { org: { id } } = organization;
    const { organizations } = this.props;
    const orgToDisplay = organizations.find(org => org.org.id === id);
    const interfaces = orgToDisplay ? orgToDisplay.interfaces : [];
    return (
      organization.org ?
        <div>
          {interfaces && interfaces.length ?
            <MultiColumnList
              columnMapping={{
                name: <FormattedMessage id="ui-agreements.interface.name" />,
                username: <FormattedMessage id="ui-agreements.interface.username" />,
                password: <FormattedMessage id="ui-agreements.interface.password" />,
                type: <FormattedMessage id="ui-agreements.interface.type" />,
                notes: <FormattedMessage id="ui-agreements.interface.notes" />,
              }}
              columnWidths={{
                name: 130,
                notes: 180,
                username: 100,
                password: 100,
                type: 130,
              }}
              contentData={interfaces}
              formatter={{
                name: item => (
                  <span>
                    {item.name}
                    <a href={item.uri}>
                      <Icon icon="external-link" iconPosition="end" />
                    </a>
                  </span>
                ),
                notes: item => get(item, 'notes'),
                username: item => get(item, 'username'),
                password: item => get(item, 'password'),
                type: item => get(item, 'type'),
              }}
              interactive={false}
              visibleColumns={['name', 'username', 'password', 'type', 'notes']}
            /> : <FormattedMessage id="ui-agreements.interface.notFound" />}
        </div> : null
    );
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

  renderInterfacesCard = () => {
    const { index, organization, name } = this.props;
    const { org } = organization;
    const addOrg = org && !org.orgsUuid_object;
    return (
      <Card
        cardStyle="positive"
        hasMargin
        headerStart={
          addOrg ?
            <strong>Organization</strong> :
            this.renderOrganizationName(org.name)
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
        { addOrg ? this.renderOrganizationName(org.name) : this.renderOrgPreview(organization)}
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
        <React.Fragment>
          <Layout className="textCentered">
            <strong>
              <FormattedMessage id="stripes-erm-components.organizations.noOrganization" />
            </strong>
          </Layout>
          <Layout className="textCentered">
            <FormattedMessage id="stripes-erm-components.organizations.addOrganizationToStart" />
          </Layout>
        </React.Fragment>
      </Field>
    );
  }

  render() {
    const { organization } = this.props;
    const { org } = organization;

    return org && !isEmpty(org) ?
      this.renderInterfacesCard() :
      this.renderDefault();
  }
}
