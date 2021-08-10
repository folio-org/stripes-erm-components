import React from 'react';

jest.mock('@folio/stripes-components/lib/Icon', () => {
  return ({ children }) => (
    <span>
      <span>{children}</span>
    </span>
  );
});
