import React from 'react';
import PropTypes from 'prop-types';

import css from './Card.css';

export default class Card extends React.Component {
  static propTypes = {
    bodyClass: PropTypes.string,
    cardClass: PropTypes.string,
    children: PropTypes.node.isRequired,
    header: PropTypes.node.isRequired,
    headerClass: PropTypes.string,
  }

  static defaultProps = {
    bodyClass: '',
    cardClass: '',
    headerClass: '',
  }

  render() {
    const {
      bodyClass,
      cardClass,
      children,
      header,
      headerClass,
      ...rest
    } = this.props;

    return (
      <div className={`${css.card} ${cardClass}`} {...rest}>
        <div
          className={`${css.header} ${headerClass}`}
          data-test-card-header
          {...headerClass}
        >
          {header}
        </div>
        <div
          data-test-card-body
          className={`${css.body} ${bodyClass}`}
          {...bodyClass}
        >
          {children}
        </div>
      </div>
    );
  }
}
