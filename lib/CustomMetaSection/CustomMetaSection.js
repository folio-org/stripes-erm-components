import React from 'react';
import PropTypes from 'prop-types';
import { Accordion } from '@folio/stripes/components';
import CustomMetaSectionHeader from './CustomMetaSectionHeader';
import css from './CustomMetaSection.css';

const propTypes = {
  accordionLabel: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  children: PropTypes.node,
  contentId: PropTypes.string,
  headingLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  id: PropTypes.string,
};

const CustomMetaSection = ({
  id,
  headingLevel,
  accordionLabel,
  children,
  contentId
}) => {
  return (
    <div className={css.metaSectionRoot} data-test-meta-section>
      <Accordion
        contentId={contentId}
        header={CustomMetaSectionHeader}
        headerProps={{
          headingLevel
        }}
        id={id}
        label={accordionLabel}
      >
        <div className={css.metaSectionContent}>
          {React.Children.map(children, child => React.cloneElement(child, {
            className: `${child.props.className} ${css.metaSectionContentBlock}`
          }))}
        </div>
      </Accordion>
    </div>
  );
};

CustomMetaSection.propTypes = propTypes;

export default CustomMetaSection;
