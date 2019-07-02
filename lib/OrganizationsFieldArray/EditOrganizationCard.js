import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, uniq } from 'lodash';
import { AppIcon } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import {
  Button,
  Card,
  Col,
  IconButton,
  Layout,
  Label,
  Select,
} from '@folio/stripes/components';
import { required } from '../validators';
import ViewOrganizationCard from '../ViewOrganizationCard';
import SelectOrganizationCard from './SelectOrganizationCard';

export default class EditOrganizationCard extends React.Component {
  static propTypes = {
    index: PropTypes.string,
    name: PropTypes.string,
    organization: PropTypes.object,
    onDeleteField: PropTypes.func,
    onMarkforDeletion: PropTypes.func,
    onReplaceField: PropTypes.func,
    roles: PropTypes.arrayOf(PropTypes.object),
  };

  renderHeaderStart = () => (
    <span>
      <AppIcon
        app="organizations"
        size="small"
      />
      {' '}
      <strong>
        <FormattedMessage id="stripes-erm-components.organization" />
      </strong>
    </span>
  );

  renderHeaderEnd = (isOrgPresent) => {
    const { index, name } = this.props;
    return isOrgPresent ?
      (
        <Button
          data-test-unlink-button
          buttonStyle="danger"
          id={`${name}-unlink-${index}`}
          marginBottom0
          onClick={() => this.handleUnlinkOrg()}
        >
          <FormattedMessage id="stripes-erm-components.organizations.unlinkOrganization" />
        </Button>
      ) :
      (
        <this.props.organizationPickerComponent
          onAddOrg={this.handleAddOrg}
          data-test-org-name
          index={index}
          id={`${name}-nameOrg-${index}`}
        />
      );
  }

  renderOrgInfoHeaderStart = () => (
    <strong>
      <FormattedMessage id="stripes-erm-components.organization" />
    </strong>
  );

  renderSelectOrganizationCard = () => {
    const { index, name } = this.props;
    return (
      <Field
        component={SelectOrganizationCard}
        data-test-org-name
        headerStart={this.renderHeaderStart()}
        headerEnd={this.renderHeaderEnd(false)}
        key={index}
        name={`${name}[${index}].org`}
        validate={required}
      >
        {this.renderEmptyLayout()}
      </Field>
    );
  }

  renderViewOrganizationCard = () => {
    const { index, name, organization : { org } } = this.props;
    return (
      <ViewOrganizationCard
        headerStart={this.renderHeaderStart()}
        headerEnd={this.renderHeaderEnd(true)}
        id={`${name}-nameOrg-${index}`}
        key={index}
        org={org}
      />
    );
  };

  validateDuplicateEntries = /* istanbul ignore next */ (value, allValues) => {
    const orgs = allValues[this.props.name] || [];

    const organizations = orgs.filter(organization => {
      const { org } = organization;
      return org && (organization.role === value);
    });

    if (organizations.length < 2) return undefined;
    const namesForThisOrg = organizations.map(organization => {
      const { org } = organization;
      return org.name;
    });

    if (uniq(namesForThisOrg).length !== namesForThisOrg.length) {
      return <FormattedMessage id="stripes-erm-components.organizations.noDuplicates" />;
    }

    return undefined;
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
              dataOptions={this.props.roles}
              id={`${name}-role-${index}`}
              key={index}
              name={`${name}[${index}].role`}
              placeholder={placeholder}
              validate={[required, this.validateDuplicateEntries]}
            />
          )}
        </FormattedMessage>
      </Col>
    );
  }

  renderEmptyLayout = () => (
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
  );

  handleAddOrg = (organization, index) => {
    const { name, id } = organization;
    const org = { name, orgsUuid: id };
    this.props.onReplaceField(index, { org });
  }

  handleUnlinkOrg = () => {
    const { organization, index } = this.props;
    /* unlinkOrg should mark the org to be deleted here for deletion once we update the form.
    onMarkforDeletion does that job. It pushes the {id:id, _delete:true) into the fields array
    and on update would actually delete the field, whereas onReplaceField here takes care
    of replacing the linked org UI with the default Add Organization UI */
    this.props.onMarkforDeletion(organization);
    this.props.onReplaceField(index, { org: {} });
  }

  render() {
    const {
      index,
      name,
      organization,
      onDeleteField,
      roles,
    } = this.props;

    const { org } = organization;

    return (
      <Card
        data-test-organizations-org
        hasMargin
        headerStart={
          <strong>
            <FormattedMessage id="stripes-erm-components.organization" />
            &nbsp;
            {index + 1}
          </strong>
        }
        headerEnd={
          <IconButton
            data-test-org-delete-button
            id={`${name}-delete-${index}`}
            onClick={() => onDeleteField(index, organization)}
            icon="trash"
          />
        }
        key={index}
      >
        {org && !isEmpty(org) ? this.renderViewOrganizationCard() : this.renderSelectOrganizationCard()}
        {roles && this.renderRole(name, index)}
      </Card>
    );
  }
}
