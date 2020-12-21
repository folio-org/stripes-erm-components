import React from 'react';
import { Accordion, FilterAccordionHeader, Layout } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import DateFilterForm from './DateFilterForm';

export default class DateFilter extends React.Component {
  handleSubmit = (values) => {
    const { activeFilters, filterHandlers, name } = this.props;
    // const { jaffa = {} } = values;
    const { dateFrom, dateTo, isDateSet } = values;
    const arr = ['dateFrom', 'dateTo'];
    const operators = ['<=', '>='];

    // this case doesnt cover the case where only the checkbox is set and the datePickers are empty.
    const filterStrings = arr
      .filter(fieldName => values[fieldName])
      .map((fieldName, index) => `${name}${operators[index]}${values[fieldName]}${isDateSet ? `||${name} isNull`: ''}`);
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

    /* this logic only handles the case where filterStrings lenght is === 2.
    It doesnt handle the case where there is only one filter applied. (eg:
      filters=startDate>=2020-01-01 or filters=startDate>=2020-01-01||startDate isNull or filters=startDate<=2020-12-31||startDate isNull)
      It needs to be revisited in sprint 106.
    */
    if (filterStrings.length === 2) {
      dateFrom = filterStrings[0].split('||')[0].split('<=')[1];
      dateTo = filterStrings[1].split('||')[0].split('>=')[1];
      isDateSet = filterStrings[0]?.split('||')?.[1]?.split(' ')?.[1] === 'isNull' ? true : false;
    }

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
