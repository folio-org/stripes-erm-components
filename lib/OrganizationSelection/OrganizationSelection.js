import React from 'react';
import PropTypes from 'prop-types';
import { withStripes } from '@folio/stripes/core';

import OrganizationSelectionContainer from './OrganizationSelectionContainer';

class OrganizationSelection extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string,
    }),
    path: PropTypes.string,
    stripes: PropTypes.shape({
      connect: PropTypes.func,
    }),
  };

  static defaultProps = {
    path: 'erm/org',
  }

  constructor(props) {
    super(props);

    this.connectedOrganizationSelectionContainer = props.stripes.connect(
      OrganizationSelectionContainer,
      { dataKey: props.input.name }
    );
  }

  render() {
    return <this.connectedOrganizationSelectionContainer {...this.props} />;
  }
}

export default withStripes(OrganizationSelection);
