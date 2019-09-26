import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Layout, Pane, Paneset } from '@folio/stripes/components';
import Spinner from '../Spinner';

export default class LoadingPane extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Paneset>
        <Pane
          dismissible
          defaultWidth="100%"
          onClose={this.props.onClose}
          paneTitle={<FormattedMessage id="ui-agreements.loading" />}
        >
          <Layout className="marginTop1">
            <Spinner />
          </Layout>
        </Pane>
      </Paneset>
    );
  }
}