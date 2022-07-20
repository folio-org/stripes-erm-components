import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Button, Layout } from '@folio/stripes/components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';
import EditOrganizationCard from './EditOrganizationCard';

const OrganizationsFieldArray = ({
  addOrganizationBtnLabel = <FormattedMessage id="stripes-erm-components.organizations.addOrganization" />,
  fields,
  isEmptyMessage = <FormattedMessage id="stripes-erm-components.organizations.noOrganizations" />,
  roles
}) => {
  const { items, onAddField, onDeleteField, onUpdateField } = useKiwtFieldArray(fields.name, true);
  const renderEmpty = () => (
    <Layout className="padding-bottom-gutter" data-test-org-empty-message>
      {isEmptyMessage}
    </Layout>
  );

  const roleValues = roles.map(role => ({ value: role.id, label: role.label }));
  const renderOrganizations = () => (
    items.map((organization, index) => {
      return (
        <Field
          key={index}
          component={EditOrganizationCard}
          fields={fields}
          id={`${fields.name}-${index}`}
          index={index}
          name={`${fields.name}[${index}]`}
          onDelete={() => onDeleteField(index, organization)}
          onUpdate={onUpdateField}
          organization={organization}
          orgsKey={fields.name}
          roleValues={roleValues}
        />
      );
    })
  );


  return (
    <div data-test-org-fa>
      <div>
        {items.length ? renderOrganizations() : renderEmpty()}
      </div>
      <Button
        data-test-org-fa-add-button
        id="add-org-btn"
        onClick={() => onAddField()}
      >
        {addOrganizationBtnLabel}
      </Button>
    </div>
  );
};

OrganizationsFieldArray.propTypes = {
  addOrganizationBtnLabel: PropTypes.node,
  fields: PropTypes.object,
  isEmptyMessage: PropTypes.node,
  roles: PropTypes.arrayOf(PropTypes.object),
};

export default OrganizationsFieldArray;
