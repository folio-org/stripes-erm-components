import PropTypes from 'prop-types';

import classNames from 'classnames';
import css from './InfoBox.css';

const InfoBox = ({ children, className, type }) => {
  const classnames = [css.infoBox];

  switch (type) {
    case 'error':
      classnames.push(css.error);
      break;
    case 'warn':
      classnames.push(css.warn);
      break;
    case 'success':
      classnames.push(css.success);
      break;
    default:
      classnames.push(css.default);
      break;
  }

  return (
    <span
      className={
        classNames(classnames, className)
      }
    >
      {children}
    </span>
  );
};

InfoBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'success',
    'warn',
    'error'
  ])
};

export default InfoBox;
