import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Icon,
  OptionSegment,
  Selection,
} from '@folio/stripes/components';

export default class InternalContactSelectionDisplay extends React.Component {
  static propTypes = {
    error: PropTypes.node,
    loading: PropTypes.bool,
    id: PropTypes.string,
    onChange: PropTypes.func,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      })
    ),
    value: PropTypes.string,
  };

  render() {
    const { error, id, loading, onChange, contacts, value } = this.props;

    return (
      <FormattedMessage id="stripes-erm-components.contactSelect.selectContact">
        {placeholder => (
          <Selection
            dataOptions={contacts}
            emptyMessage={<FormattedMessage id="stripes-erm-components.contactSelect.typeToSearch" />}
            error={error}
            formatter={(props) => {
              const { option } = props;
              if (loading || !option) return <Icon icon="spinner-ellipsis" />;

              return <OptionSegment {...props}>{option.label}</OptionSegment>;
            }}
            id={id}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
          />
        )}
      </FormattedMessage>
    );
  }
}
