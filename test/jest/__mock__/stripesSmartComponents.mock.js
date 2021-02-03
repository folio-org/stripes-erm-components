import React from 'react';

jest.mock('@folio/stripes/smart-components', () => ({
  ...jest.requireActual('@folio/stripes/smart-components'),
  LocationLookup: () => <div>LocationLookup</div>,
  ViewMetaData: () => <div>ViewMetaData</div>,
  StripesConnectedSource(props, logger, resourceName) {
    const fetchMore = jest.fn(val => val);
    const totalCount = () => props?.resources?.[resourceName]?.other?.totalRecords ?? undefined;
    const update = jest.fn();
    const loaded = jest.fn();
    const records = () => props?.resources?.[resourceName]?.records ?? [];
    return { fetchMore, totalCount, update, loaded, records };
  }
}), { virtual: true });
