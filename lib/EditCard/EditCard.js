import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon, Tooltip, IconButton } from '@folio/stripes/components';

export default class EditCard extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    deleteBtnProps: PropTypes.object,
    deleteButtonTooltipText: PropTypes.node,
    header: PropTypes.node.isRequired,
    onDelete: PropTypes.func,
  }

  static defaultProps = {
    deleteBtnProps: {},
  }

  renderDeleteButton = () => {
    const { deleteButtonTooltipText } = this.props;
    return (
      deleteButtonTooltipText ?
        (
          <Tooltip
            text={deleteButtonTooltipText}
          >
            {({ ref, ariaIds }) => (
              <IconButton
                ref={ref}
                icon="trash"
                aria-labelledby={ariaIds.text}
                onClick={this.props.onDelete}
                {...this.props.deleteBtnProps}
              />
            )}
          </Tooltip>
        ) :
        (
          <Button
            buttonStyle="link slim"
            style={{ margin: 0, padding: 0 }}
            onClick={this.props.onDelete}
            {...this.props.deleteBtnProps}
          >
            <Icon icon="trash" />
          </Button>
        )
    );
  }

  render() {
    const {
      children,
      deleteBtnProps, // eslint-disable-line no-unused-vars
      header,
      onDelete,
      ...rest
    } = this.props;

    return (
      <Card
        headerStart={<strong>{header}</strong>}
        headerEnd={onDelete ? this.renderDeleteButton() : undefined}
        {...rest}
      >
        {children}
      </Card>
    );
  }
}
