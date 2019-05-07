import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { TextField } from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';

export default class UserPicker extends React.Component {
  static propTypes = {
    addUser: PropTypes.func,
    meta: PropTypes.shape({
      error: PropTypes.node,
    }),
    input: PropTypes.shape({
      onChange: PropTypes.func,
      onFilter: PropTypes.func,
      value: PropTypes.string,
    }),
  };

  // We can't test plugins as part of a unit test
  // istanbul ignore next
  render() {
    const { addUser, input: { onChange, value }, meta: { error } } = this.props;

    return (
      <FormattedMessage id="stripes-erm-components.contacts.clickSearchButton">
        {placeholder => (
          <TextField
            error={error}
            endControl={(
              <Pluggable
                aria-haspopup="true"
                dataKey="user"
                disableRecordCreation
                marginTop0
                searchButtonStyle="fieldControl"
                selectUser={user => {
                  if (addUser) addUser(user);

                  onChange(user);
                }}
                type="find-user"
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
