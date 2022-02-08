import React from 'react';
import { NoValue } from '@folio/stripes/components';

export default (orgs) => {
  const { name } = orgs?.org ?? {};

  if (!name) return <NoValue />;

  return `${name}`;
};
