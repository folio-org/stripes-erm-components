import React from 'react';
import { Icon } from '@folio/stripes/components';

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);

    /* eslint-disable no-console */
    console.warn(`Warning: <Spinner> is deprecated in stripes-erm-components and will be removed in release 3.0.0
Switch to importing Spinner from @folio/stripes/components instead
`);
  }

  render() {
    return <Icon icon="spinner-ellipsis" width="10px" />;
  }
}
