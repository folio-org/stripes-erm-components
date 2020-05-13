import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Accordion, FilterAccordionHeader, Layout } from '@folio/stripes/components';

import CustomPropertyFiltersForm from './CustomPropertyFiltersForm';
import getOperators from './getOperators';

const operators = getOperators().map(o => o.value);

export default class CustomPropertyFilters extends React.Component {
  static propTypes = {
    activeFilters: PropTypes.object,
    customProperties: PropTypes.object,
    custPropName: PropTypes.oneOf(['supplementaryProperty', 'term']),
    filterHandlers: PropTypes.object,
  };


  handleSubmit = values => {
    const { activeFilters, filterHandlers } = this.props;
    const { filters = [] } = values;

    const filterStrings = filters
      .filter(filter => filter.rules)
      .map(filter => filter.rules
        .map(rule => `customProperties.${filter.customProperty}.value${rule.operator}${rule.value ?? ''}`)
        .join('||'));

    filterHandlers.state({ ...activeFilters, customProperties: filterStrings });

    return Promise.resolve();
  }

  render() {
    const { activeFilters, customProperties, custPropName, filterHandlers } = this.props;

    let numberOfFilters = 0;
    const filterStrings = activeFilters.customProperties || [];
    const filters = filterStrings.map(filter => {
      let customProperty;
      const rules = filter.split('||').map(ruleString => {
        // ruleString is constructed in this.handleSubmit passed to CustomPropertyFiltersForm
        // and has shape "customProperties.foo.value!=42"
        const [customPropertyPath, rule] = ruleString.split('.value');
        customProperty = customPropertyPath.replace('customProperties.', '');

        const operator = operators.find(o => rule.startsWith(o)) ?? '';
        const value = rule.substring(operator.length);

        numberOfFilters += 1;

        return { operator, value };
      });

      return {
        customProperty,
        rules,
      };
    });

    return (
      <Accordion
        closedByDefault
        displayClearButton={numberOfFilters > 0}
        header={FilterAccordionHeader}
        id="clickable-customProperties-filter"
        label={<FormattedMessage id={`stripes-erm-components.customProperty.${custPropName}.plural`} />}
        onClearFilter={() => filterHandlers.state({ ...activeFilters, customProperties: [] })}
        separator={false}
      >
        <Layout className="padding-bottom-gutter">
          <FormattedMessage
            id={`stripes-erm-components.customProperty.filters.${custPropName}.filtersApplied`}
            values={{ count: numberOfFilters }}
          />
        </Layout>
        <CustomPropertyFiltersForm
          customProperties={customProperties}
          custPropName={custPropName}
          initialValues={{ filters: filters.length ? filters : [{ rules: [{}] }] }}
          onSubmit={this.handleSubmit}
        />
      </Accordion>
    );
  }
}
