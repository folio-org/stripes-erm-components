import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { AppIcon, Pluggable } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import {
  Button,
  Layout,
  TextArea,
  Tooltip,
} from '@folio/stripes/components';

import EditCard from '../EditCard';
import { required } from '../validators';
import ViewOrganizationCard from '../ViewOrganizationCard';
import RolesFieldArray from './RolesFieldArray';
import FieldPrimaryOrg from './FieldPrimaryOrg';

import css from './EditOrganizationCard.css';

/*
 * IMPORTANT - due to a bug in RFF, this MUST be declared outside
 * of the parent FieldArray, otherwise will be caught in an infinite loop
 */
const defaultRoleValue = [{}];

const EditOrganizationCard = ({
  id,
  index,
  input,
  fields,
  onDelete,
  onUpdate,
  roleValues,
  organization,
}) => {
  let triggerButton = useRef(null);
  const [nameOfOrgNotLinked, setNOONL] = useState(null);

  useEffect(() => {
    if (!input?.value?.org?.orgsUuid && triggerButton.current) {
      triggerButton.current.focus();
    }
  }, [input, triggerButton]);

  const [duplicateWarning, setDuplicateWarning] = useState(false);

  const { values } = useFormState();
  const [uuidList, setUuidList] = useState([]);

  // Keep an up to date list of all the org UUIDs in this array
  useEffect(() => {
    const filledFieldValues = values?.orgs?.filter(o => !!o?.org?.orgsUuid) ?? [];
    if (uuidList.length !== filledFieldValues.length) {
      setUuidList(
        filledFieldValues.map(filteredOrg => filteredOrg?.org?.orgsUuid)
      );
    }
  }, [setUuidList, values, uuidList]);

  /*
   * This is the function which handles setting the field value
   * to the current org, acting as the "onChange".
   * This is where the logic to set isDuplicate should live
   */
  const handleLinkOrg = (o, i) => {
    if (uuidList.includes(o.id)) {
      // Don't update field, set duplicate warning
      setDuplicateWarning(true);
      setNOONL(o.name);
    } else {
      const org = { name: o.name, orgsUuid: o.id };
      onUpdate(i, { org });
    }
  };

  const isOrgSelected = input.value.org && Object.keys(input.value.org).length !== 0;

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
            <FieldPrimaryOrg
              fieldIndex={index}
              fieldPrefix={`${input.name}`}
              fields={fields}
              labelClass={css.labelClass}
              labelId="stripes-erm-components.organizations.setAsPrimary"
            />
          </Layout>

        </>
        }
      onDelete={onDelete}
    >
      <Field
        component={ViewOrganizationCard}
        duplicateMessage={<FormattedMessage id="stripes-erm-components.organizations.duplicateOrgError" values={{ orgName: nameOfOrgNotLinked }} />}
        duplicateWarning={duplicateWarning}
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
        setDuplicateWarning={setDuplicateWarning}
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
        defaultValue={defaultRoleValue}
        id={id}
        name={`${input.name}.roles`}
        orgIndex={index}
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
  fields: PropTypes.object,
  // meta: PropTypes.shape({
  //   error: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  //   touched: PropTypes.bool,
  // }),
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  roleValues: PropTypes.arrayOf(PropTypes.object),
  organization: PropTypes.shape({
    org: PropTypes.shape({
      name: PropTypes.string,
    }),
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        role: PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        }),
      })
    ),
  }),
};

export default EditOrganizationCard;
