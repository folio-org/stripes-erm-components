import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  IconButton,
} from '@folio/stripes/components';
import OrgInfo from './OrgInfo';

export default class OrganizationCard extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    index: PropTypes.string,
    organization: PropTypes.object,
    onDeleteField: PropTypes.func,
    onReplaceField: PropTypes.func,
    onAddField: PropTypes.func,
    organizationPickerComponent: PropTypes.elementType,
    roles: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    const {
      name,
      index,
      organization,
      onDeleteField,
      onReplaceField,
      onAddField,
      organizationPickerComponent,
      roles,
    } = this.props;

    return (
      <Card
        data-test-organizations-org
        hasMargin
        key={index}
        headerStart={<strong>{`Organization ${index + 1}`}</strong>}
        headerEnd={
          <IconButton
            data-test-org-delete-button
            id={`${name}-delete-${index}`}
            onClick={() => onDeleteField(index, organization)}
            icon="trash"
          />
        }
      >
        <OrgInfo
          name={name}
          index={index}
          organization={organization}
          onAddField={onAddField}
          onReplaceField={onReplaceField}
          organizationPickerComponent={organizationPickerComponent}
          roles={roles}
        />
      </Card>
    );
  }
}
