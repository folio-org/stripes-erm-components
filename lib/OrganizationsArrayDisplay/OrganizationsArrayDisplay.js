import React from 'react';

import { Row } from '@folio/stripes/components';

const OrganizationsArrayDisplay = ({ orgs }) => {
  return orgs.map((record, index) => {
    const name = record.org?.name ? `${record.org.name}${index !== orgs.length - 1 ? ', ' : ''}` : '';
    return (
      <Row key={index}>
        {name}
      </Row>
    );
  });
};

export default OrganizationsArrayDisplay;
