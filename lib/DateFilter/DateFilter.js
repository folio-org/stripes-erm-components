import React from 'react';
import { Accordion, FilterAccordionHeader, Layout } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import DateFilterForm from './DateFilterForm';

export default class DateFilter extends React.Component {
  handleSubmit = (values) => {
    const { activeFilters, filterHandlers, name } = this.props;
    const { dateFrom, dateTo, isDateSet } = values;
    const arr = ['dateFrom', 'dateTo'];
    const operators = ['<=', '>='];
    const fieldOperatorsMap = {
      'dateFrom': '<=',
      'dateTo': '>='
    };

    // this case doesnt cover the case where only the checkbox is set and the datePickers are empty.
    const filterStrings = arr
      .filter(fieldName => values[fieldName])
      .map((fieldName, index) => `${name}${fieldOperatorsMap[fieldName]}${values[fieldName]}${isDateSet ? `||${name} isNull`: ''}`);
    filterHandlers.state({ ...activeFilters, [name]: filterStrings });
  }

  render() {
    const { activeFilters, filterHandlers, name } = this.props;
    const filterStrings = activeFilters[name] || [];
    const arr = ['dateFrom', 'dateTo'];
    const operators = ['<=', '>='];

    let dateFrom;
    let dateTo;
    let isDateSet;

  // covers all the different filter string cases
   const filters = filterStrings.map((filter, index) => {
     const [date, dateSet] = filter.split('||');
     if (date.includes('<=')) dateFrom = date?.split('<=')?.[1];
     if (date.includes('>=')) dateTo = date?.split('>=')?.[1];

     isDateSet = dateSet?.split(' ')?.[1] === 'isNull' ? true : false;
   });

    const initialValues = {
      dateFrom,
      dateTo,
      isDateSet
    }

    return (
      <Accordion
        closedByDefault
        displayClearButton={activeFilters?.[name]?.length > 0}
        header={FilterAccordionHeader}
        id="clickable-custprop-filter"
        onClearFilter={() => filterHandlers.state({ ...activeFilters, [name]: [] })}
        label="Start date"
        separator={false}
      >
        <DateFilterForm
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
        />
      </Accordion>
    );
  }
}
