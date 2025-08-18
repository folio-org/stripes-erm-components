import { FormattedMessage } from 'react-intl';

import { Pane } from '@folio/stripes/components';

import css from './Error.css';

const AccessControlErrorPane = (props) => {
  return (
    <Pane
      defaultWidth="100%" // This is a required prop, we'll almost always override it but default here anyway
      paneTitle={<FormattedMessage id="stripes-erm-components.accesscontrol.error.pane.title" />}
      {...props}
    >
      <div className={css.errorBox}>
        <FormattedMessage id="stripes-erm-components.accesscontrol.error.noAccess" />
      </div>
    </Pane>
  );
};

export default AccessControlErrorPane;
