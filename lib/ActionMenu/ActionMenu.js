import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Dropdown,
  DropdownMenu,
  Icon
} from '@folio/stripes/components';

import css from './ActionMenu.css';

const ActionMenu = ({ actionMenu }) => {
  // eslint-disable-next-line react/prop-types
  const renderActionMenuToggle = ({ onToggle, triggerRef, keyHandler, open, ariaProps, getTriggerProps }) => (
    <Button
      ref={triggerRef}
      buttonClass={css.actionMenuToggle}
      buttonStyle="primary"
      marginBottom0
      onClick={onToggle}
      onKeyDown={keyHandler}
      type="button"
      {...getTriggerProps()}
      {...ariaProps}
    >
      <Icon icon={open ? 'triangle-up' : 'triangle-down'} iconPosition="end">
        <FormattedMessage id="stripes-erm-components.canvas.actions" />
      </Icon>
    </Button>
  );

  // eslint-disable-next-line react/prop-types
  const renderActionMenuContent = ({ onToggle, open, keyHandler }) => (
    <DropdownMenu>
      {actionMenu({ onToggle, open, keyHandler })}
    </DropdownMenu>
  );

  const renderActionMenu = () => (
    <Dropdown
      key="action-menu-toggle"
      hasPadding
      renderMenu={renderActionMenuContent}
      renderTrigger={renderActionMenuToggle}
    />
  );

  return renderActionMenu();
};

ActionMenu.propTypes = {
  actionMenu: PropTypes.func.isRequired
};

export default ActionMenu;
