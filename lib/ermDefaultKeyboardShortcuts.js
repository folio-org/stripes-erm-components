import React from 'react';
import { FormattedMessage } from 'react-intl';

const ermDefaultKeyboardShortcuts = [
  {
    label: (<FormattedMessage id="stripes-erm-components.shortcut.openShortcutModal" />),
    name: 'openShortcutModal',
    shortcut: 'mod + alt + k',
  },
  {
    label: (<FormattedMessage id="stripes-erm-components.shortcut.closeModal" />),
    name: 'closeModal',
    shortcut: 'esc',
  },
  {
    label: (<FormattedMessage id="stripes-erm-components.shortcut.copy" />),
    name: 'copy',
    shortcut: 'mod + c',
  },
  {
    label: (<FormattedMessage id="stripes-erm-components.shortcut.cut" />),
    name: 'cut',
    shortcut: 'mod + x',
  },
  {
    label: (<FormattedMessage id="stripes-erm-components.shortcut.paste" />),
    name: 'paste',
    shortcut: 'mod + v',
  },
  {
    label: (<FormattedMessage id="stripes-erm-components.shortcut.find" />),
    name: 'find',
    shortcut: 'mod + f',
  },
];

export default ermDefaultKeyboardShortcuts;
