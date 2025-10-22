
/* This is the "Simple" AccessControl filter, as it is the implementation copying the feature set elsewhere,
 * ie a Selection to filter by a SINGLE Acquisition unit policy.
 *
 * Our API supports much more complex query building, across multiple policy types, and we could design a Typedown (or otherwise)
 * based UI which allows the user to find policies for which they are a member, by type, by restriction, etc etc.
 * This is NOT that component, rather this is as above, the "Simple" case.
 */
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { Accordion, FilterAccordionHeader, Selection, Spinner } from '@folio/stripes/components';

import { useDoAccessControl, useReadPolicies } from '../hooks';
import { ACQUISITION_UNIT_POLICY_TYPE, POLICIES_FILTER_NAME } from '../constants';

const SimpleAccessControlFilter = ({
  accessControlEndpoint,
  activeFilters,
  disabled,
  filterHandlers,
  filterLabel,
  filterName = POLICIES_FILTER_NAME,
  isLoading
}) => {
  const { doAccessControl, enabledEnginesQuery } = useDoAccessControl({ endpoint: accessControlEndpoint });

  const { flattenedPolicies: readPolicies } = useReadPolicies({
    endpoint: accessControlEndpoint,
    // THIS WILL NEED TO BE RETHOUGHT IF WE HANDLE MULTIPLE POLICY TYPES LATER
    policyType: ACQUISITION_UNIT_POLICY_TYPE, // We are only handling acquisition unit policies here, so only fetch those
    queryOptions: {
      enabled: doAccessControl
    }
  });

  const selectifyPolicies = useMemo(() => [
    {
      value: 'NONE:NONE',
      label: <FormattedMessage id="stripes-erm-components.accesscontrol.filter.simple.noPolicy" />
    },
    ...(readPolicies ?? []).map(policy => ({
      value: `${ACQUISITION_UNIT_POLICY_TYPE}:${policy.policy.id}`,
      label: policy.policy.name
    }))
  ], [readPolicies]);

  const handleFilter = (filter) => {
    return selectifyPolicies.filter(sp => sp.label.toLowerCase().includes(filter.toLowerCase()));
  };

  // Set up a spinner for the loading case, it can vanish if not needed.
  const renderSpinner = isLoading || enabledEnginesQuery.isLoading;

  if (disabled || !doAccessControl) {
    return null;
  }

  return (
    <Accordion
      displayClearButton={!!activeFilters[filterName]?.length}
      displayWhenClosed={renderSpinner ? <Spinner /> : null}
      displayWhenOpen={renderSpinner ? <Spinner /> : null}
      header={FilterAccordionHeader}
      id={`clickable-agreement-${filterName}-filter`}
      label={filterLabel ?? <FormattedMessage id="stripes-erm-components.accesscontrol.filter.simple.label" />}
      onClearFilter={() => filterHandlers.state({ ...activeFilters, [filterName]: [] })
      }
      separator={false}
    >
      <Selection
        dataOptions={selectifyPolicies}
        loading={renderSpinner}
        name="policiesFilter"
        onChange={(val) => filterHandlers.state({ ...activeFilters, [filterName]: [val] })}
        onFilter={handleFilter}
        value={activeFilters[filterName] ? activeFilters[filterName][0] : undefined}
      />
    </Accordion>
  );
};

export default SimpleAccessControlFilter;
