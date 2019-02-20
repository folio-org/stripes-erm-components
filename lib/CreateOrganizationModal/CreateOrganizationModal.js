import React from 'react';
import PropTypes from 'prop-types';
import { withStripes } from '@folio/stripes/core';

import CreateOrganizationModalContainer from './CreateOrganizationModalContainer';

class CreateOrganizationModal extends React.Component {
  static propTypes = {
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

    this.connectedCreateOrganizationModalContainer = props.stripes.connect(CreateOrganizationModalContainer);
  }

  render() {
    return <this.connectedCreateOrganizationModalContainer {...this.props} />;
  }
}

export default withStripes(CreateOrganizationModal);
