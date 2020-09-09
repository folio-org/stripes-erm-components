import React from 'react';
import { NoValue } from '@folio/stripes/components';

export default (user) => {
  const {
    firstName,
    lastName,
    middleName
  } = user?.personal ?? {};

  if (!firstName && !lastName && !middleName) return <NoValue />;

  return `${lastName ?? '-'}${firstName ? ', ' : ' '}${firstName ?? ''} ${middleName ?? ''}`;
};
