import React from 'react';

jest.mock('@folio/stripes-components/lib/Icon', () => {
  // eslint-disable-next-line react/prop-types
  return ({ children }) => (
    <span>
      <span>{children}</span>
    </span>
  );
});
