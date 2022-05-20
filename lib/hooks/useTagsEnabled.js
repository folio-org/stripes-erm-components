import { useOkapiKy } from '@folio/stripes/core';
import { useQuery } from 'react-query';

import { MOD_SETTINGS_ENDPOINT } from '../endpoints';

const useTagsEnabled = () => {
  const ky = useOkapiKy();

  const queryObject = useQuery(
    [MOD_SETTINGS_ENDPOINT, 'query=(module==TAGS and configName==tags_enabled)', 'stripes-erm-components', 'useTagsEnabled'],
    () => ky.get(`${MOD_SETTINGS_ENDPOINT}?query=(module==TAGS and configName==tags_enabled)`).json()
  );

  const { data: { configs: { 0: { value } = {}} = []} = {} } = queryObject;
  return !value || value === 'true';
};

export default useTagsEnabled;
