import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { TextField } from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

export default class OrganizationPicker extends React.Component {
  static propTypes = {
    meta: PropTypes.shape({
      error: PropTypes.node,
    }),
    inputId: PropTypes.string,
    input: PropTypes.shape({
      onChange: PropTypes.func,
      onFilter: PropTypes.func,
      value: PropTypes.object,
    }),
  };

  // istanbul ignore next
  render() {
    const { inputId, input: { onChange, value }, meta: { error } } = this.props;

    return (
      <FormattedMessage id="stripes-erm-components.organizations.clickSearchButton">
        {placeholder => (
          <TextField
            error={error}
            endControl={(
              <Pluggable
                aria-haspopup="true"
                dataKey="organization"
                disableRecordCreation
                id={`${inputId}-search-button`}
                marginTop0
                searchButtonStyle="fieldControl"
                selectVendor={org => {
                  const { name, id } = org;
                  onChange({ name, orgsUuid: id });
                }}
                type="find-organization"
              >
                <span>N/A</span>
              </Pluggable>
            )}
            hasClearIcon={false}
            id={inputId}
            onChange={onChange}
            placeholder={placeholder}
            readOnly
            value={value.name}
          />
        )}
      </FormattedMessage>
    );
  }
}
