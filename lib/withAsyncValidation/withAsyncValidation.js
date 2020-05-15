import React from 'react';
import PropTypes from 'prop-types';
import { withStripes } from '@folio/stripes/core';

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default function withAsyncValidation(WrappedComponent) {
  class WithAsyncValidate extends React.Component {
    static propTypes = {
      stripes: PropTypes.shape({
        okapi: PropTypes.shape({
          tenant: PropTypes.string.isRequired,
          token: PropTypes.string.isRequired,
          url: PropTypes.string,
        }).isRequired,
      }).isRequired,
    };

    handleAsyncValidation = (path, property, value) => {
      const { okapi } = this.props.stripes;
      const payload = { [property]: value };
      return fetch(`${okapi.url}/${path}/${property}}`,
        {
          method: 'POST',
          headers: {
            'X-Okapi-Tenant': okapi.tenant,
            'X-Okapi-Token': okapi.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
        });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          checkAsyncValidation={this.handleAsyncValidation}
        />
      );
    }
  }

  WithAsyncValidate.displayName = `WithAsyncValidate(${getDisplayName(WrappedComponent)})`;
  return withStripes(WithAsyncValidate);
}
