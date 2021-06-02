import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, uniq } from 'lodash';
import { AppIcon, Pluggable } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import { Field, useForm } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import {
  Button,
  Checkbox,
  Layout,
  TextArea,
  Tooltip,
} from '@folio/stripes/components';

import EditCard from '../EditCard';
import { required } from '../validators';
import ViewOrganizationCard from '../ViewOrganizationCard';
import RolesFieldArray from './RolesFieldArray';

import css from './EditOrganizationCard.css';

const EditOrganizationCard = ({
  id,
  index,
  input,
  onDelete,
  onUpdate,
  roleValues,
  uniqueRole,
  organization,
}) => {
  let triggerButton = useRef(null);

  useEffect(() => {
    if (!input?.value?.org?.orgsUuid && triggerButton.current) {
      triggerButton.current.focus();
    }
  }, [input, triggerButton]);

  const { change } = useForm();
  /* const changeIsPrimary = ({ target: { checked } }) => {
    fields.forEach((fieldName, i) => (
      i === fieldIndex
        ? change(`${fieldName}.isPrimary`, checked)
        : change(`${fieldName}.isPrimary`, false)
    ));
  }; */

  const handleLinkOrg = (o, i) => {
    const org = { name: o.name, orgsUuid: o.id };
    onUpdate(i, { org });
  };

  const validateDuplicateEntries = /* istanbul ignore next */ (value, allValues) => {
    const name = input.name;
    const orgsKey = name.substring(0, name.indexOf('['));
    const orgs = allValues[orgsKey] || [];

    const organizations = orgs.filter(o => {
      const { org } = o;
      return org && (o.role === value);
    });

    if (organizations.length < 2) return undefined;
    const namesForThisOrg = organizations.map(o => {
      const { org } = o;
      return org.name;
    });

    if (uniq(namesForThisOrg).length !== namesForThisOrg.length) {
      return <FormattedMessage id="stripes-erm-components.organizations.noDuplicates" />;
    }

    return undefined;
  };

  const validateMultipleUniqueRoles = /* istanbul ignore next */ (value, allValues) => {
    const name = input.name;

    if (!uniqueRole) return undefined;

    const orgsKey = name.substring(0, name.indexOf('['));
    const orgs = allValues[orgsKey] || [];

    const organizations = orgs.filter(o => {
      const { org } = o;
      return org && (o.role === uniqueRole);
    });

    if (organizations.length > 1) {
      return <FormattedMessage id="stripes-erm-components.organizations.multipleUniqueRoles" />;
    }

    return undefined;
  };

  const isOrgSelected = input.value.org && !isEmpty(input.value.org);

  return (
    <EditCard
      data-test-organizations-org
      deleteBtnProps={{
        'id': `${id}-delete-btn`,
        'data-test-org-delete-button': true
      }}
      deleteButtonTooltipText={<FormattedMessage id="stripes-erm-components.organizations.removeOrganization" values={{ index: index + 1 }} />}
      header={
        <>
          <FormattedMessage id="stripes-erm-components.organizations.organizationIndex" values={{ index: index + 1 }} />
          <Layout
            className="padding-left-gutter"
          >
            <Field
              component={Checkbox}
              inline
              label="Set as primary Organization"
              labelClass={css.labelClass}
              name={`${input.name}.primaryOrg`}
                // onChange={changeIsPrimary}
              type="checkbox"
            />
          </Layout>

        </>
        }
      onDelete={onDelete}
    >
      <Field
        component={ViewOrganizationCard}
        headerEnd={(
          <Pluggable
            dataKey="organization"
            disableRecordCreation
            marginTop0
            renderTrigger={(pluggableRenderProps) => {
              triggerButton = pluggableRenderProps.buttonRef;

              const orgName = organization?.org?.name;
              const buttonProps = {
                'aria-haspopup': 'true',
                'buttonRef': triggerButton,
                'buttonStyle': isOrgSelected ? 'default' : 'primary',
                'id': `${id}-link-button`,
                'marginBottom0': true,
                'name': `${input.name}.org.orgsUuid`,
                'onClick': pluggableRenderProps.onClick
              };

              if (isOrgSelected) {
                return (
                  <Tooltip
                    id={`${pluggableRenderProps.id}-license-button-tooltip`}
                    text={<FormattedMessage id="stripes-erm-components.organizations.replaceOrganizationSpecific" values={{ orgName }} />}
                    triggerRef={triggerButton}
                  >
                    {({ ariaIds }) => (
                      <Button
                        aria-labelledby={ariaIds.text}
                        data-test-org-link
                        {...buttonProps}
                      >
                        <FormattedMessage id="stripes-erm-components.organizations.replaceOrganization" />
                      </Button>
                    )}
                  </Tooltip>
                );
              }
              return (
                <Button
                  data-test-org-link
                  {...buttonProps}
                >
                  <FormattedMessage id="stripes-erm-components.organizations.linkOrganization" />
                </Button>
              );
            }}
            selectVendor={o => handleLinkOrg(o, index)}
            type="find-organization"
          >
            <FormattedMessage id="stripes-erm-components.organizations.noOrgPlugin" />
          </Pluggable>
          )}
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
        id={id}
        name={`${input.name}.org.orgsUuid`}
        org={input.value.org}
        validate={required}
      />

      <Field
        component={TextArea}
        data-test-org-note
        id={`${id}-note`}
        label={<FormattedMessage id="stripes-erm-components.organizations.note" />}
        name={`${input.name}.note`}
        parse={v => v}
      />

      <FieldArray
        component={RolesFieldArray}
        id={id}
        name={`${input.name}.roles`}
        roleValues={roleValues}
      />
    </EditCard>
  );
};

EditOrganizationCard.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.shape({
      note: PropTypes.string,
      org: PropTypes.shape({
        name: PropTypes.string,
        orgsUuid: PropTypes.string,
      }),
      roles: PropTypes.arrayOf(PropTypes.object),
    })
  }),
  meta: PropTypes.shape({
    error: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
    touched: PropTypes.bool,
  }),
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  roleValues: PropTypes.arrayOf(PropTypes.object),
  uniqueRole: PropTypes.string,
  organization: PropTypes.shape({
    org: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

export default EditOrganizationCard;
