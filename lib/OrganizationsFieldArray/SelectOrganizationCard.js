import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Layout
} from '@folio/stripes/components';
import css from './OrganizationCard.css';

export default class SelectOrganizationCard extends React.Component {
  static propTypes = {
    headerStart: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    headerEnd: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    meta: PropTypes.shape({
      error: PropTypes.node,
    }),
    renderEmpty: PropTypes.func,
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
      renderEmpty,
      headerStart,
      headerEnd,
    } = this.props;

    const { meta } = this.props;
    const error = meta && meta.touched && meta.error;
    return (
      <div>
        <Card
          data-test-organization-card
          cardStyle="negative"
          hasMargin
          headerStart={headerStart}
          headerEnd={headerEnd}
          roundedBorder
        >
          { error ? this.renderError(error) : (renderEmpty && renderEmpty())}
        </Card>
      </div>
    );
  }
}
