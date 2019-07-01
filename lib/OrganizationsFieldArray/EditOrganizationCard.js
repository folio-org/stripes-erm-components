import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, uniq } from 'lodash';
import { AppIcon } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import {
  Card,
  IconButton,
  Button,
  Layout,
  Col,
  Label,
  Select,
} from '@folio/stripes/components';
import { required } from '../validators';
import OrganizationCard from './OrganizationCard';

export default class EditOrganizationCard extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    index: PropTypes.string,
    organization: PropTypes.object,
    onMarkforDeletion: PropTypes.func,
    onDeleteField: PropTypes.func,
    onReplaceField: PropTypes.func,
    roles: PropTypes.arrayOf(PropTypes.object),
  };

  renderOrgInfoHeaderEnd = () => {
    const { name, index } = this.props;
    return (
      <Button
        data-test-unlink-button
        buttonStyle="danger"
        id={`${name}-unlink-${index}`}
        onClick={() => this.unlinkOrg()}
      >
        <FormattedMessage id="stripes-erm-components.organizations.unlinkOrganization" />
      </Button>
    );
  }

  renderHeaderStart = (isOrgPresent) => {
    return (
      isOrgPresent ?
        (
          <strong>
            <FormattedMessage id="stripes-erm-components.organization" />
          </strong>
        ) : (
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

        )
    );
  };

  renderHeaderEnd = (isOrgPresent, id) => {
    const { index, name } = this.props;
    return isOrgPresent ?
      this.renderOrgInfoHeaderEnd(id) :
      this.renderOrganizationPicker(index, name);
  }

  renderOrgInfoHeaderStart = () => (
    <strong>
      <FormattedMessage id="stripes-erm-components.organization" />
    </strong>
  );

  getOrganizationCardProps = () => {
    const { index, organization : { org, id } } = this.props;
    const isOrgPresent = org && !isEmpty(org);
    const headerStart = this.renderHeaderStart(isOrgPresent);
    const cardStyle = isOrgPresent ? 'positive' : 'negative';
    const name = `${this.props.name}[${index}].org`;
    const headerEnd = this.renderHeaderEnd(isOrgPresent, id);
    const key = index;
    const fieldId = `${this.props.name}-nameOrg-${index}`;
    const validate = isOrgPresent ? [required, this.validateDuplicateEntries] : required;
    const renderDefault = !isOrgPresent && this.renderDefaultLayout;

    return {
      headerStart,
      cardStyle,
      index,
      name,
      headerEnd,
      key,
      id:fieldId,
      org,
      validate,
      renderDefault
    };
  };

  renderOrganizationCard = () => (
    <Field
      data-test-org-name
      component={OrganizationCard}
      {...this.getOrganizationCardProps()}
    />
  );

  validateDuplicateEntries = /* istanbul ignore next */ (value, allValues) => {
    const orgs = allValues[this.props.name] || [];

    const organizations = orgs.filter(organization => {
      const { org } = organization;
      return org && (org.name === value.name);
    });

    if (organizations.length < 2) return undefined;
    const rolesForThisOrg = organizations.map(org => org.role);

    if (uniq(rolesForThisOrg).length !== rolesForThisOrg.length) {
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
              id={`${name}-role-${index}`}
              name={`${name}[${index}].role`}
              placeholder={placeholder}
              dataOptions={this.props.roles}
              validate={required}
            />
          )}
        </FormattedMessage>
      </Col>
    );
  }

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

  renderDefaultLayout = () => (
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

  onAddOrg = (organization, index) => {
    const { name, id } = organization;
    const org = { name, orgsUuid: id };
    this.props.onReplaceField(index, { org });
  }

  unlinkOrg = () => {
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
      name,
      index,
      organization,
      onDeleteField,
      roles,
    } = this.props;

    return (
      <Card
        data-test-organizations-org
        hasMargin
        key={index}
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
      >
        {this.renderOrganizationCard()}
        {roles && this.renderRole(name, index)}
      </Card>
    );
  }
}
