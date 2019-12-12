import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Card, Layout } from '@folio/stripes/components';

import css from '../styles.css';

export default class SelectOrganizationCard extends React.Component {
  static propTypes = {
    headerEnd: PropTypes.node,
    headerStart: PropTypes.node,
    meta: PropTypes.shape({
      error: PropTypes.node,
      touched: PropTypes.bool,
    }),
  };

  renderError = (error) => (
    <Layout className={`textCentered ${css.error}`}>
      <strong>
        {error}
      </strong>
    </Layout>
  );

  render() {
    const {
      meta: { error, touched },
      headerEnd,
      headerStart,
    } = this.props;

    return (
      <div>
        <Card
          cardStyle="negative"
          data-test-organization-card
          hasMargin
          headerStart={headerStart}
          headerEnd={headerEnd}
          roundedBorder
        >
          <div>
            <Layout className="textCentered">
              <strong>
                <FormattedMessage id="stripes-erm-components.organizations.noOrganization" />
              </strong>
            </Layout>
            <Layout className="textCentered">
              <FormattedMessage id="stripes-erm-components.organizations.linkOrganizationToStart" />
            </Layout>
          </div>
          {error && touched ? this.renderError(error) : null}
        </Card>
      </div>
    );
  }
}
