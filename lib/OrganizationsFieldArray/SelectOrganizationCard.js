import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Layout
} from '@folio/stripes/components';
import css from './OrganizationCard.css';

export default class SelectOrganizationCard extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    headerEnd: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    headerStart: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    meta: PropTypes.shape({
      error: PropTypes.node,
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
      headerEnd,
      headerStart,
    } = this.props;

    const { meta, children } = this.props;
    const error = meta && meta.touched && meta.error;
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
          { error ? this.renderError(error) : children }
        </Card>
      </div>
    );
  }
}
