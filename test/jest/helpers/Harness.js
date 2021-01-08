import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import translations from '../../../translations/stripes-erm-components/en';
import prefixKeys from './prefixKeys';
import mockOffsetSize from './mockOffsetSize';

export default function Harness({
  children,
  translations: translationsConfig,
  shouldMockOffsetSize = true,
  width = 500,
  height = 500,
}) {
  const allTranslations = prefixKeys(translations);

  translationsConfig.forEach(tx => {
      Object.assign(allTranslations, prefixKeys(tx.translations, tx.prefix));
  });

  if (shouldMockOffsetSize) { // MCL autosize mock
    mockOffsetSize(width, height);
  }

  return (
    <IntlProvider
      key="en"
      locale="en"
      messages={allTranslations}
      timeZone="UTC"
    >
      {children}
    </IntlProvider>
  );
}

Harness.propTypes = {
  children: PropTypes.node,
  translations: PropTypes.arrayOf(
    PropTypes.shape({
      prefix: PropTypes.string,
      translations: PropTypes.object,
    })
  ),
  shouldMockOffsetSize: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

Harness.defaultProps = {
  width: 500,
  height: 500,
  shouldMockOffsetSize: true,
};
