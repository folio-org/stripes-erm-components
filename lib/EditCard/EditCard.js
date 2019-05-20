import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from '@folio/stripes/components';

import Card from '../Card';

import css from './EditCard.css';

export default class EditCard extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    deleteBtnProps: PropTypes.object,
    header: PropTypes.node.isRequired,
    onDelete: PropTypes.func,
  }

  static defaultProps = {
    deleteBtnProps: {},
  }

  renderDeleteButton = () => (
    <Button
      buttonStyle="link slim"
      style={{ margin: 0, padding: 0 }}
      onClick={this.props.onDelete}
      {...this.props.deleteBtnProps}
    >
      <Icon icon="trash" />
    </Button>
  )

  renderHeader = () => {
    const { header, onDelete } = this.props;

    return (
      <React.Fragment>
        <div>
          <strong>{ header }</strong>
        </div>
        <div className={css.headerDelete}>
          { onDelete ? this.renderDeleteButton() : null }
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { children, deleteBtnProps, header, onDelete, ...rest } = this.props; // eslint-disable-line no-unused-vars

    return (
      <Card header={this.renderHeader()} {...rest}>
        {children}
      </Card>
    );
  }
}
