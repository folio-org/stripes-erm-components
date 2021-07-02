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
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      })
    ),
    error: PropTypes.node,
    id: PropTypes.string,
    loading: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  render() {
    const { contacts, error, id, loading, onChange, value } = this.props;

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
            onFilter={(searchString, dataOptions) => {
              return dataOptions.filter(({ label }) => label.toLowerCase().indexOf(searchString.toLowerCase()) >= 0);
            }}
            placeholder={typeof placeholder === 'string' ? placeholder : placeholder[0]}
            value={value}
          />
        )}
      </FormattedMessage>
    );
  }
}
