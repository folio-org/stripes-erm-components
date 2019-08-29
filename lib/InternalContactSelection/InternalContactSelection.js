import React from 'react';
import PropTypes from 'prop-types';
import { withStripes } from '@folio/stripes/core';

import InternalContactSelectionContainer from './InternalContactSelectionContainer';

class InternalContactSelection extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string,
    }),
    path: PropTypes.string.isRequired,
    stripes: PropTypes.shape({
      connect: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);

    this.connectedInternalContactSelectionContainer = props.stripes.connect(
      InternalContactSelectionContainer,
      { dataKey: props.input.name }
    );
  }

  render() {
    return <this.connectedInternalContactSelectionContainer {...this.props} />;
  }
}

export default withStripes(InternalContactSelection);
