import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Accordion, FilterAccordionHeader } from '@folio/stripes/components';
import { MultiSelectionFilter } from '@folio/stripes/smart-components';

const TagsFilter = (props) => {
  const { activeFilters, filterHandlers, tags } = props;
  const intl = useIntl();
  const tagFilters = activeFilters.tags || [];

  return (
    <Accordion
      closedByDefault
      displayClearButton={tagFilters.length > 0}
      header={FilterAccordionHeader}
      id="clickable-tags-filter"
      label={<FormattedMessage id="stripes-erm-components.tags" />}
      onClearFilter={() => {
        filterHandlers.clearGroup('tags');
      }}
      separator={false}
    >
      <MultiSelectionFilter
        aria-label={intl.formatMessage({ id: 'stripes-erm-components.tags' })}
        dataOptions={tags || []}
        id="tags-filter"
        name="tags"
        onChange={(e) => filterHandlers.state({ ...activeFilters, tags: e.values })}
        selectedValues={tagFilters}
      />
    </Accordion>
  );
};

TagsFilter.propTypes = {
  activeFilters: PropTypes.object,
  filterHandlers: PropTypes.object,
  tags: PropTypes.arrayOf(PropTypes.object),
};

export default TagsFilter;
