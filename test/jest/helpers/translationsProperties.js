import { translationsProperties as coreTranslations } from '@folio/stripes-erm-testing';

import translations from '../../../translations/stripes-erm-components/en';

const translationsProperties = [
  {
    prefix: 'stripes-erm-components',
    translations,
  },
  ...coreTranslations
];

export default translationsProperties;
