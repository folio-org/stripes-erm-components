import { useMemo, useState, useCallback } from 'react';
import noop from 'lodash/noop';
import orderBy from 'lodash/orderBy';

import { FormattedMessage, useIntl } from 'react-intl';
import { IconButton, MultiColumnList } from '@folio/stripes/components';

import { acquisitionPolicyRestrictions } from '../../Form';

const PoliciesTable = ({
  policies,
  allowRemove = false,
  onRemove = noop,
}) => {
  const intl = useIntl();

  // --- 1. Track sorting state ---
  const [sortOrder, setSortOrder] = useState('name');
  const [sortDirection, setSortDirection] = useState('ascending');
  const nonInteractiveHeaders = ['description', 'restrictions', 'remove'];

  // --- 2. Handle header clicks ---
  const handleSort = useCallback((e, meta) => {
    if (meta.name !== sortOrder) {
      setSortOrder(meta.name);
      setSortDirection('ascending');
    } else {
      setSortDirection(prev => (prev === 'ascending' ? 'descending' : 'ascending'));
    }
  }, [sortOrder]);

  // --- 3. Sort the data before rendering ---
  const sortedData = useMemo(() => {
    return orderBy(
      policies,
      [(row) => row.policy[sortOrder]],
      [sortDirection === 'ascending' ? 'asc' : 'desc']
    );
  }, [policies, sortOrder, sortDirection]);

  const visibleColumns = useMemo(() => {
    const cols = ['name', 'description', 'restrictions'];
    if (allowRemove) {
      cols.push('remove');
    }
    return cols;
  }, [allowRemove]);

  const renderRemove = useCallback((rowData) => <IconButton icon="trash" onClick={() => onRemove(rowData)} />, [onRemove]);

  return (
    <MultiColumnList
      columnMapping={{
        name: <FormattedMessage id="stripes-erm-components.accesscontrol.name" />,
        description: <FormattedMessage id="stripes-erm-components.accesscontrol.description" />,
        restrictions: <FormattedMessage id="stripes-erm-components.accesscontrol.restrictions" />,
        remove: <FormattedMessage id="stripes-erm-components.accesscontrol.remove" />,
      }}
      contentData={sortedData}
      formatter={{
        name: (rowData) => rowData.policy.name,
        description: (rowData) => rowData.policy.description,
        restrictions: (rowData) => acquisitionPolicyRestrictions(rowData.policy, intl), // NOTE: This will break if we have any other access controls in future
        // We can do OnPolicyChange because if it's in the table then we're definitely removing it
        remove: renderRemove
      }}
      interactive={false}
      nonInteractiveHeaders={nonInteractiveHeaders}
      onHeaderClick={handleSort}
      sortDirection={sortDirection}
      sortOrder={sortOrder}
      visibleColumns={visibleColumns}
    />
  );
};

export default PoliciesTable;
