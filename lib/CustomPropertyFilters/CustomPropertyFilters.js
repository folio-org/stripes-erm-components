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
    data: PropTypes.object.isRequired,
    filterHandlers: PropTypes.object,
    name: PropTypes.string,
  };


  handleSubmit = values => {
    const { activeFilters, filterHandlers } = this.props;
    const { filters = [] } = values;

    const filterStrings = filters
      .filter(filter => filter.rules)
      .map(filter => filter.rules
        .map(rule => `customProperties.${filter.customProperty}.value${rule.operator}${rule.value ?? ''}`)
        .join('||'));

    filterHandlers.state({ ...activeFilters, custProps: filterStrings });

    return Promise.resolve();
  }

  render() {
    const { activeFilters, data, filterHandlers, name } = this.props;
    const custProps = data?.terms ?? data?.supplementaryProperties;

    let numberOfFilters = 0;
    const filterStrings = activeFilters.custProps || [];
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
        id="clickable-custprops-filter"
        label={<FormattedMessage id={`stripes-erm-components.customProperty.${name}.plural`} />}
        onClearFilter={() => filterHandlers.state({ ...activeFilters, custProps: [] })}
        separator={false}
      >
        <Layout className="padding-bottom-gutter">
          <FormattedMessage
            id={`stripes-erm-components.customProperty.filters.${name}.filtersApplied`}
            values={{ count: numberOfFilters }}
          />
        </Layout>
        <CustomPropertyFiltersForm
          custPropName={name}
          custProps={custProps}
          initialValues={{ filters: filters.length ? filters : [{ rules: [{}] }] }}
          onSubmit={this.handleSubmit}
        />
      </Accordion>
    );
  }
}
