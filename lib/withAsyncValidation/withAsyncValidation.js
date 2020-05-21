import React from 'react';
import PropTypes from 'prop-types';
import { withStripes } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';

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
      const results = await response.json();

      if (results.total > 0) {
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
      return '';
    };

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
