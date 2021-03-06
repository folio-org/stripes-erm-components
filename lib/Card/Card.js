import React from 'react';
import PropTypes from 'prop-types';

import css from './Card.css';

export default class Card extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.node.isRequired,
  }

  render() {
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
