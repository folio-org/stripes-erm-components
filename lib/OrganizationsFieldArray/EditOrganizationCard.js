import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, uniq } from 'lodash';
import { AppIcon } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import {
  Button,
  Col,
  Layout,
  Label,
  Select,
} from '@folio/stripes/components';
import EditCard from '../EditCard';
import { composeValidators, required } from '../validators';
import ViewOrganizationCard from '../ViewOrganizationCard';
import SelectOrganizationCard from './SelectOrganizationCard';

export default class EditOrganizationCard extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    name: PropTypes.string,
    organization: PropTypes.object,
    onDeleteField: PropTypes.func,
    onMarkForDeletion: PropTypes.func,
    onReplaceField: PropTypes.func,
    roles: PropTypes.arrayOf(PropTypes.object),
    uniqueRole: PropTypes.string,
  };

  renderHeaderStart = () => (
    <span>
      <AppIcon
        app="organizations"
        size="small"
      >
        <strong>
          <FormattedMessage id="stripes-erm-components.organization" />
        </strong>
      </AppIcon>
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
    const { index, name, organization: { org } } = this.props;
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

  validateMultipleUniqueRoles = /* istanbul ignore next */ (value, allValues) => {
    const { name, uniqueRole } = this.props;

    if (!uniqueRole) return undefined;

    const orgs = allValues[name] || [];

    const organizations = orgs.filter(organization => {
      const { org } = organization;
      return org && (organization.role === uniqueRole);
    });

    if (organizations.length > 1) {
      return <FormattedMessage id="stripes-erm-components.organizations.multipleUniqueRoles" />;
    }

    return undefined;
  }

  renderRole = (name, index) => {
    return (
      <Col xs={5}>
        <Label required tagName="span">
          <FormattedMessage id="stripes-erm-components.organizations.role" />
        </Label>
        <Field
          component={Select}
          data-test-org-role
          dataOptions={this.props.roles}
          id={`${name}-role-${index}`}
          key={index}
          name={`${name}[${index}].role`}
          placeholder=" "
          validate={composeValidators(required, this.validateDuplicateEntries, this.validateMultipleUniqueRoles)}
        />
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
    onMarkForDeletion does that job. It pushes the {id:id, _delete:true) into the fields array
    and on update would actually delete the field, whereas onReplaceField here takes care
    of replacing the linked org UI with the default Add Organization UI */
    this.props.onMarkForDeletion(organization);
    this.props.onReplaceField(index, { org: {} });
  }

  render() {
    const {
      index,
      name,
      onDeleteField,
      organization,
      roles,
    } = this.props;

    const { org } = organization;

    return (
      <EditCard
        data-test-organizations-org
        deleteBtnProps={{
          'id': `${name}-delete-${index}`,
          'data-test-org-delete-button': true
        }}
        deleteButtonTooltipText={<FormattedMessage id="stripes-erm-components.organizations.removeOrganization" />}
        hasMargin
        header={<FormattedMessage id="stripes-erm-components.organizations.organizationIndex" values={{ index: index + 1 }} />}
        onDelete={() => onDeleteField(index, organization)}
        key={index}
      >
        {org && !isEmpty(org) ? this.renderViewOrganizationCard() : this.renderSelectOrganizationCard()}
        {roles && this.renderRole(name, index)}
      </EditCard>
    );
  }
}
