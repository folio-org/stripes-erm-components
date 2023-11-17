import { useQuery } from 'react-query';
import { useOkapiKy } from '@folio/stripes/core';
import { defaultTagQuery, tagNamespaceArray } from '../utils';

const useTags = (namespaceArray, options) => {
  const ky = useOkapiKy();
  const nsArray = namespaceArray ?? tagNamespaceArray;

  return useQuery(
    nsArray,
    () => ky.get(defaultTagQuery).json(),
    options
  );
};

export default useTags;
