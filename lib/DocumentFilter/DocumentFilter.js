import PropTypes from 'prop-types';

import {
  Accordion,
  FilterAccordionHeader,
  Layout,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

import {
  parseKiwtQueryFilters,
} from '@k-int/stripes-kint-components';

import DocumentFilterForm from './DocumentFilterForm';

const DocumentFilter = ({
  activeFilters,
  atTypeValues = [], // DEPRECATED
  categoryValues = [], // Use this instead of atTypeValues
  filterHandlers,
  filterLabel,
  filterModalProps = {},
  filterName = 'docs'
}) => {
  let categoryValuesToUse = categoryValues;
  if (categoryValuesToUse.length === 0 && atTypeValues.length !== 0) {
    // eslint-disable-next-line no-console
    console.error('atTypeValues have been deprecated from Ramsons. Use categoryValues instead');
    categoryValuesToUse = atTypeValues;
  }

  // Due to how filters are handled within SearchAndSortQuery the filter string needs to be parsed back into a usual object
  const parseQueryString = (filterArray) => {
    if (filterArray?.length) {
      // Since the filters are grouped, the docuements filterstring will be within the first array element
      const parsedFilters = parseKiwtQueryFilters(filterArray?.[0]);

      // This reduce function removes all array elements that contain solely comparators so the initial value shape is returned
      // ---
      // Before parsing:
      // [
      //   [{ path, comparator, value }],
      //   '||',
      //   [{ path, comparator, value }, '||', { path, comparator, value }],
      // ];
      // ---
      // After: parsing
      // [
      //   [{ path, comparator, value }],
      //   [
      //     { path, comparator, value },
      //     { path, comparator, value },
      //   ],
      // ];
      const filters = parsedFilters.reduce((acc, curr) => {
        if (typeof curr === 'string') {
          return [...acc];
        }
        return [...acc, { rules: curr.filter((e) => typeof e !== 'string') }];
      }, []);
      return filters;
    }
    return [];
  };

  const parsedFilterData = parseQueryString(activeFilters?.[filterName] || []);

  return (
    <Accordion
      closedByDefault
      displayClearButton={!!parsedFilterData?.length}
      header={FilterAccordionHeader}
      id={`clickable-agreement-${filterName}-filter`}
      label={filterLabel ?? <FormattedMessage id="stripes-erm-components.documentFilter.documents" />}
      onClearFilter={() => filterHandlers.state({ ...activeFilters, [filterName]: [] })
      }
      separator={false}
    >
      {!!parsedFilterData?.length && (
        <Layout className="padding-bottom-gutter">
          <FormattedMessage
            id="stripes-erm-components.documentFilter.filtersApplied"
            values={{ filtersLength: parsedFilterData?.length }}
          />
        </Layout>
      )}
      <DocumentFilterForm
        activeFilters={activeFilters}
        categoryValues={categoryValuesToUse}
        filterHandlers={filterHandlers}
        filterModalProps={filterModalProps}
        filterName={filterName}
        filters={parsedFilterData}
      />
    </Accordion>
  );
};

DocumentFilter.propTypes = {
  activeFilters: PropTypes.object,
  atTypeValues: PropTypes.arrayOf(PropTypes.object),
  categoryValues: PropTypes.arrayOf(PropTypes.object),
  filterHandlers: PropTypes.object,
  filterLabel: PropTypes.string,
  filterName: PropTypes.string,
  filterModalProps: PropTypes.shape({
    label: PropTypes.string,
  }),
};

export default DocumentFilter;
