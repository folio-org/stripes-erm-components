import React from 'react';

import { Row } from '@folio/stripes/components';

const OrganizationsArrayDisplay = ({ orgs }) => {
  return orgs.map((record, index) => {
    const isLastElement = index === orgs.length - 1;
    const comma = isLastElement ? '' : ', ';
    const name = record.org?.name ? `${record.org.name}${comma}` : '';
    return (
      <Row key={record.id}>
        {name}
      </Row>
    );
  });
};

export default OrganizationsArrayDisplay;
