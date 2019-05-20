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
    id: PropTypes.string,
    input: PropTypes.shape({
      onChange: PropTypes.func,
      onFilter: PropTypes.func,
      value: PropTypes.object,
    }),
  };

  // istanbul ignore next
  render() {
    const { id, input: { onChange, value }, meta: { error } } = this.props;

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
                id={`${id}-search-button`}
                marginTop0
                searchButtonStyle="fieldControl"
                selectVendor={org => {
                  const { name } = org;
                  onChange({ name, orgsUuid: org.id });
                }}
                type="find-organization"
              >
                <span>N/A</span>
              </Pluggable>
            )}
            hasClearIcon={false}
            id={id}
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
