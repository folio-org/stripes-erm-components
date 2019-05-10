import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { TextField } from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

export default class OrganizationPicker extends React.Component {
  static propTypes = {
    addOrganization: PropTypes.func,
    meta: PropTypes.shape({
      error: PropTypes.node,
    }),
    input: PropTypes.shape({
      onChange: PropTypes.func,
      onFilter: PropTypes.func,
      value: PropTypes.string,
    }),
  };

  render() {
    const { addOrganization, input: { onChange, value }, meta: { error } } = this.props;

    return (
      <FormattedMessage id="stripes-erm-components.contacts.clickSearchButton">
        {placeholder => (
          <TextField
            error={error}
            endControl={(
              <Pluggable
                aria-haspopup="true"
                dataKey="organization"
                disableRecordCreation
                marginTop0
                searchButtonStyle="fieldControl"
                selectVendor={org => {
                  if (addOrganization) addOrganization(org);
                  onChange(org);
                }}
                type="find-organization"
              >
                <span>N/A</span>
              </Pluggable>
            )}
            hasClearIcon={false}
            onChange={onChange}
            placeholder={placeholder}
            readOnly
            value={value}
          />
        )}
      </FormattedMessage>
    );
  }
}
