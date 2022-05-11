import React from 'react';
import PropTypes from 'prop-types';

import css from './Card.css';

/* DEPRECATED */
export default class Card extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.node.isRequired,
  }

  render() {
    /* eslint-disable no-console */
    console.warn(`Warning: <Card> is deprecated in stripes-erm-components and will be removed in a future release
        Switch to importing Card from @folio/stripes/components instead
        `);

    const {
      children,
      header,
      ...rest
    } = this.props;

    return (
      <div className={css.card} {...rest}>
        <div
          className={css.header}
          data-test-card-header
        >
          {header}
        </div>
        <div
          className={css.body}
          data-test-card-body
        >
          {children}
        </div>
      </div>
    );
  }
}
