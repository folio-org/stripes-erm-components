import React from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty, uniq } from 'lodash';
import { AppIcon, Pluggable } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import {
  Button,
  Col,
  Label,
  Select,
} from '@folio/stripes/components';

import EditCard from '../EditCard';
import { composeValidators, required } from '../validators';
import ViewOrganizationCard from '../ViewOrganizationCard';

export default class EditOrganizationCard extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number,
    input: PropTypes.shape({
      value: PropTypes.shape({
        org: PropTypes.shape({
          name: PropTypes.string,
          orgsUuid: PropTypes.string,
        }),
        role: PropTypes.string,
      })
    }),
    meta: PropTypes.shape({
      error: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
      touched: PropTypes.bool,
    }),
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
    roles: PropTypes.arrayOf(PropTypes.object),
    uniqueRole: PropTypes.string,
  };

  componentDidMount() {
    if (!get(this.props, 'input.value.org.orgsUuid') && get(this.triggerButton, 'current')) {
      this.triggerButton.current.focus();
    }
  }

  handleLinkOrg = (organization, index) => {
    const { name, id } = organization;
    const org = { name, orgsUuid: id };

    this.props.onUpdate(index, { org });
  }

  validateDuplicateEntries = /* istanbul ignore next */ (value, allValues) => {
    const { input: { name } } = this.props;
    const orgsKey = name.substring(0, name.indexOf('['));
    const orgs = allValues[orgsKey] || [];

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
    const { input: { name }, uniqueRole } = this.props;

    if (!uniqueRole) return undefined;

    const orgsKey = name.substring(0, name.indexOf('['));
    const orgs = allValues[orgsKey] || [];

    const organizations = orgs.filter(organization => {
      const { org } = organization;
      return org && (organization.role === uniqueRole);
    });

    if (organizations.length > 1) {
      return <FormattedMessage id="stripes-erm-components.organizations.multipleUniqueRoles" />;
    }

    return undefined;
  }

  render() {
    const {
      id,
      index,
      input: { name, value: { org } },
      onDelete,
      roles,
    } = this.props;

    const isOrgSelected = org && !isEmpty(org);

    return (
      <EditCard
        data-test-organizations-org
        deleteBtnProps={{
          'id': `${id}-delete-btn`,
          'data-test-org-delete-button': true
        }}
        deleteButtonTooltipText={<FormattedMessage id="stripes-erm-components.organizations.removeOrganization" />}
        hasMargin
        header={<FormattedMessage id="stripes-erm-components.organizations.organizationIndex" values={{ index: index + 1 }} />}
        onDelete={onDelete}
      >
        <Field
          component={ViewOrganizationCard}
          headerStart={(
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
          )}
          headerEnd={(
            <Pluggable
              dataKey="organization"
              disableRecordCreation
              marginTop0
              renderTrigger={(props) => {
                this.triggerButton = props.buttonRef;

                return (
                  <Button
                    aria-haspopup="true"
                    buttonRef={this.triggerButton}
                    buttonStyle={isOrgSelected ? 'default' : 'primary'}
                    data-test-org-link
                    id={`${id}-link-button`}
                    marginBottom0
                    name={`${name}.org.orgsUuid`}
                    onClick={props.onClick}
                  >
                    {isOrgSelected ?
                      <FormattedMessage id="stripes-erm-components.organizations.replaceOrganization" /> :
                      <FormattedMessage id="stripes-erm-components.organizations.linkOrganization" />
                    }
                  </Button>
                );
              }}
              selectVendor={o => this.handleLinkOrg(o, index)}
              type="find-organization"
            >
              <FormattedMessage id="stripes-erm-components.organizations.noOrgPlugin" />
            </Pluggable>
          )}
          id={id}
          name={`${name}.org.orgsUuid`}
          org={org}
          validate={required}
        />
        <Col xs={5}>
          <Label required tagName="span">
            <FormattedMessage id="stripes-erm-components.organizations.role" />
          </Label>
          <Field
            component={Select}
            data-test-org-role
            dataOptions={roles}
            id={`${id}-role`}
            name={`${name}.role`}
            placeholder=" "
            validate={composeValidators(required, this.validateDuplicateEntries, this.validateMultipleUniqueRoles)}
          />
        </Col>
      </EditCard>
    );
  }
}
