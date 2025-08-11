import { Pane } from '@folio/stripes/components';
import css from './Error.css';

const AccessControlErrorPane = (props) => {
  return (
    <Pane
      paneTitle="Access control error" // FIXME should probably be in stripes-components
      {...props}
    >
      <div className={css.errorBox}>
        WHOOPS
      </div>
    </Pane>
  );
};

export default AccessControlErrorPane;
