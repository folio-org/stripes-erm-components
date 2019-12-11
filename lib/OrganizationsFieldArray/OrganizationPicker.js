import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Pluggable } from '@folio/stripes/core';
import { Button } from '@folio/stripes/components';

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

  // componentDidMount() {
  //   if (!get(this.props, 'input.value') && get(this.triggerButton, 'current')) {
  //     this.triggerButton.current.focus();
  //   }
  // }

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
        dataKey="organization"
        disableRecordCreation
        renderTrigger={(props) => {
          this.triggerButton = props.buttonRef;
          return (
            <Button
              aria-haspopup="true"
              buttonRef={this.triggerButton}
              buttonStyle={searchButtonStyle}
              id={`${id}-search-button`}
              marginBottom0
              onClick={props.onClick}
            >
              {searchLabel}
            </Button>
          );
        }}
        selectVendor={org => {
          onAddOrg(org, index);
        }}
        type="find-organization"
      />
    );
  }
}
