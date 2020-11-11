import React from 'react';

jest.mock('@folio/stripes-components/lib/Icon/icons', () => {
  return () => <span>Icon</span>;
});
