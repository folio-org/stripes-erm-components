import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import translations from '../../translations/stripes-erm-components/en';

// mimics the StripesTranslationPlugin in @folio/stripes-core
function prefixKeys(obj) {
  const res = {};
  // eslint-disable-next-line no-unused-vars
  for (const key of Object.keys(obj)) {
    res[`stripes-erm-components.${key}`] = obj[key];
  }
  return res;
}

class Harness extends React.Component {
  render() {
    return (
      <IntlProvider
        key="en"
        locale="en"
        messages={prefixKeys(translations)}
        onError={() => {}}
        timeZone="UTC"
      >
        {this.props.children}
      </IntlProvider>
    );
  }
}

Harness.propTypes = {
  children: PropTypes.node,
};

export default Harness;
