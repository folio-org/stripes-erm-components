import React from 'react';
import PropTypes from 'prop-types';
import { withStripes } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';

/* DEPRECATED */

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

    asyncValidate = (path, property, value) => {
      const { okapi } = this.props.stripes;
      const payload = { [property]: value };
      return fetch(`${okapi.url}/${path}/${property}`,
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

    handleAsyncValidation = async (app, validationPath, value, meta) => {
      const response = await this.asyncValidate(validationPath, meta.name, value);

      if (response.ok) {
        return '';
      } else {
        const results = await response.json();
        const { errors = [] } = results;

        return (
          errors.map((error, index) => (
            <FormattedMessage
              key={index}
              defaultMessage={error.message}
              id={`${app}.${error.i18n_code}`}
              tagName="div"
            />
          ))
        );
      }
    };

    render() {
      /* eslint-disable no-console */
      console.warn(`Warning: <withAsyncValidation> is deprecated in stripes-erm-components and will be removed in a future release
   Switch to importing useAsyncValidation instead
   `);
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
