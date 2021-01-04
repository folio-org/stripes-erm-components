import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, FilterAccordionHeader } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import DateFilterForm from './DateFilterForm';

const DateFilter = ({ activeFilters, filterHandlers, name }) => {
  const fieldOperatorsMap = {
    'dateFrom': '>=',
    'dateTo': '<='
  };

  const handleSubmit = (values) => {
    const { dateFrom, dateTo, isDateSet } = values;
    let filterStrings;
    if (!dateFrom && !dateTo && isDateSet) {
      filterStrings = [`${name} isNull`]; // filterString === ["startDate isNull"]
    } else {
      filterStrings = Object.keys(fieldOperatorsMap)
        .filter(fieldName => values[fieldName])
        .map(fieldName => `${name}${fieldOperatorsMap[fieldName]}${values[fieldName]}${isDateSet ? `||${name} isNull` : ''}`); // filter of shape "startDate>=2021-01-04||startDate isNull"
    }

    filterHandlers.state({ ...activeFilters, [name]: filterStrings });
  };

  const filterStrings = activeFilters[name] || [];

  let dateFrom;
  let dateTo;
  let isDateSet;

  // covers all the different filter string cases
  const operators = Object.values(fieldOperatorsMap);
  filterStrings.forEach(filter => {
    const operator = operators.find(op => filter.includes(op)); // finds if the filter has either the <= or >= operator in it
    if (operator) {
      const [date, dateSet] = filter.split('||'); // filter of shape "startDate>=2021-01-04||startDate isNull"

      if (date.includes('>=')) dateFrom = date?.split('>=')?.[1];
      if (date.includes('<=')) dateTo = date?.split('<=')?.[1];

      isDateSet = dateSet?.split(' ')?.[1] === 'isNull';
    } else {
      isDateSet = filter?.split(' ')?.[1] === 'isNull'; // filter of shape "startDate isNull"
    }
  });

  const initialValues = {
    dateFrom,
    dateTo,
    isDateSet
  };

  return (
    <Accordion
      closedByDefault
      displayClearButton={activeFilters?.[name]?.length > 0}
      header={FilterAccordionHeader}
      id={`clickable-${name}-filter`}
      label={<FormattedMessage id={`stripes-erm-components.dateFilter.${name}`} />}
      onClearFilter={() => filterHandlers.state({ ...activeFilters, [name]: [] })}
      separator={false}
    >
      <DateFilterForm
        initialValues={initialValues}
        name={name}
        onSubmit={handleSubmit}
      />
    </Accordion>
  );
};

DateFilter.propTypes = {
  activeFilters: PropTypes.object,
  filterHandlers: PropTypes.object,
  name: PropTypes.string
};

export default DateFilter;
