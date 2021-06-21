import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { Button, Layout } from '@folio/stripes/components';

import withKiwtFieldArray from '../withKiwtFieldArray';
import EditOrganizationCard from './EditOrganizationCard';

const OrganizationsFieldArray = ({
  addOrganizationBtnLabel = <FormattedMessage id="stripes-erm-components.organizations.addOrganization" />,
  fields,
  isEmptyMessage = <FormattedMessage id="stripes-erm-components.organizations.noOrganizations" />,
  items,
  name,
  onAddField,
  onDeleteField,
  onUpdateField,
  roles
}) => {
  const renderEmpty = () => (
    <Layout className="padding-bottom-gutter" data-test-org-empty-message>
      {isEmptyMessage}
    </Layout>
  );

  const renderOrganizations = () => (
    items.map((organization, index) => {
      return (
        <Field
          key={index}
          component={EditOrganizationCard}
          fields={fields}
          id={`${name}-${index}`}
          index={index}
          name={`${name}[${index}]`}
          onDelete={() => onDeleteField(index, organization)}
          onUpdate={onUpdateField}
          organization={organization}
          orgsKey={name}
          roleValues={roles}
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
  items: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  onAddField: PropTypes.func.isRequired,
  onDeleteField: PropTypes.func.isRequired,
  onUpdateField: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PropTypes.object),
};

export default withKiwtFieldArray(OrganizationsFieldArray);
