import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Pluggable } from '@folio/stripes/core';

export default class OrganizationPicker extends React.Component {
  static propTypes = {
    index: PropTypes.string,
    onAddOrg: PropTypes.func,
  };

  render() {
    const { index, onAddOrg } = this.props;
    return (
      <Pluggable
        aria-haspopup="true"
        dataKey="organization"
        disableRecordCreation
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
