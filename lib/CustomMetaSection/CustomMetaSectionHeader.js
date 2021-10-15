import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Headline, Icon } from '@folio/stripes/components';
import css from './CustomMetaSection.css';

const propTypes = {
  contentId: PropTypes.string,
  displayWhenClosed: PropTypes.element,
  displayWhenOpen: PropTypes.element,
  headingLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  id: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  onToggle: PropTypes.func,
  open: PropTypes.bool,
};

const defaultProps = {
  headingLevel: 4
};

const CustomMetaAccordionHeader = (props) => {
  let toggleElem = null;
  let labelElem = null;
  let containerElem = null;

  function handleHeaderClick(e) {
    const { id, label } = props;
    props.onToggle({ id, label });
    e.stopPropagation();
  }

  function handleKeyPress(e) {
    e.preventDefault();
    if (e.charCode === 13 || e.charCode === 32) { // enter key or space key...
      if (e.target === toggleElem || e.target === labelElem || e.target === containerElem) {
        const { id, label } = props;
        props.onToggle({ id, label });
      }
    }
  }

  const { label, open, displayWhenOpen, displayWhenClosed, contentId } = props;

  return (
    <div ref={(ref) => { containerElem = ref; }} className={css.headerWrapper}>
      <Headline className="sr-only" margin="none" size="small" tag={`h${props.headingLevel}`}>
        <FormattedMessage id="stripes-components.metaSection.screenReaderLabel" />
      </Headline>
      <button
        ref={(ref) => { toggleElem = ref; }}
        aria-controls={contentId}
        aria-expanded={open}
        className={css.metaHeaderButton}
        onClick={handleHeaderClick}
        onKeyPress={handleKeyPress}
        tabIndex="0"
        type="button"
      >
        <div className={css.metaHeader}>
          <Icon icon={props.open ? 'caret-up' : 'caret-down'} size="small" />
          <div ref={(ref) => { labelElem = ref; }}>
            <div className={css.metaHeaderLabel}>{label}</div>
          </div>
        </div>
      </button>
      {open ? displayWhenOpen : displayWhenClosed}
    </div>
  );
};

CustomMetaAccordionHeader.propTypes = propTypes;
CustomMetaAccordionHeader.defaultProps = defaultProps;

export default CustomMetaAccordionHeader;
