import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import InfoBox from '../InfoBox';

import css from './NewBox.css';

const NewBox = ({ className }) => (
  <InfoBox
    className={
      classNames(css.newBox, className)
    }
    type="success"
  >
    <FormattedMessage id="stripes-erm-components.new" />
  </InfoBox>
);

NewBox.propTypes = {
  className: PropTypes.string,
};

export default NewBox;
