import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Pluggable } from '@folio/stripes/core';

export default class OrganizationPicker extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    index: PropTypes.number,
    onAddOrg: PropTypes.func,
    searchButtonStyle: PropTypes.string,
    searchLabel: PropTypes.node,
  };

  static defaultProps = {
    searchButtonStyle: 'primary',
    searchLabel: <FormattedMessage id="stripes-erm-components.organizations.addOrganization" />,
  }

  render() {
    const {
      id,
      index,
      onAddOrg,
      searchButtonStyle,
      searchLabel
    } = this.props;

    return (
      <Pluggable
        aria-haspopup="true"
        buttonProps={{ marginBottom0: true }}
        dataKey="organization"
        disableRecordCreation
        id={`${id}-search-button`}
        marginTop0
        searchButtonStyle={searchButtonStyle}
        searchLabel={searchLabel}
        selectVendor={org => {
          onAddOrg(org, index);
        }}
        type="find-organization"
      />
    );
  }
}
