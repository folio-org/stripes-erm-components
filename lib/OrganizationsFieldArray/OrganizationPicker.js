import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Pluggable } from '@folio/stripes/core';

export default class OrganizationPicker extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    index: PropTypes.string,
    onAddOrg: PropTypes.func,
  };

  render() {
    const { id, index, onAddOrg } = this.props;
    return (
      <Pluggable
        aria-haspopup="true"
        dataKey="organization"
        disableRecordCreation
        id={`${id}-search-button`}
        marginTop0
        searchLabel={<FormattedMessage id="stripes-erm-components.organizations.addOrganization" />}
        searchButtonStyle="primary"
        selectVendor={org => {
          onAddOrg(org, index);
        }}
        type="find-organization"
      />
    );
  }
}
