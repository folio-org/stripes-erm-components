import React from 'react';

import { Row } from '@folio/stripes/components';

const OrganizationsArrayDisplay = ({ orgs }) => {
  return orgs.map(record => {
    const name = record.org?.name ? `${record.org.name}, ` : '';
    return (
      <Row>
        {name}
      </Row>
    );
  });
};

export default OrganizationsArrayDisplay;
