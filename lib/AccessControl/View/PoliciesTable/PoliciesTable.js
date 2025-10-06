import { useMemo, useCallback } from 'react';
import noop from 'lodash/noop';

import { FormattedMessage, useIntl } from 'react-intl';

import { IconButton, MultiColumnList, Tooltip } from '@folio/stripes/components';

import { acquisitionPolicyRestrictions } from '../../Form';
import { useMCLMemorySort } from '../../../hooks';

const PoliciesTable = ({
  policies,
  allowRemove = false,
  onRemove = noop,
}) => {
  const intl = useIntl();

  const nonInteractiveHeaders = ['description', 'restrictions', 'remove'];
  const {
    handleSort,
    sortedData,
    sortDirection,
    sortOrder
  } = useMCLMemorySort({
    accessors: {
      name: (row) => row.policy.name?.toLowerCase()
    },
    data: policies,
    initialSort: 'name',
  });

  const visibleColumns = useMemo(() => {
    const cols = ['name', 'description', 'restrictions'];
    if (allowRemove) {
      cols.push('remove');
    }
    return cols;
  }, [allowRemove]);

  const renderRemove = useCallback((rowData) => {
    const acqUnitName = rowData.policy.name;
    return (
      <Tooltip
        id={`remove-acq-unit-tooltip-${rowData.policy.id}`}
        text={
          <FormattedMessage
            id="stripes-erm-components.accesscontrol.removeAcqUnit"
            values={{ acqUnitName }}
          />
        }
      >
        {({ ref, ariaIds }) => (
          <IconButton
            ref={ref}
            aria-labelledby={ariaIds.text}
            icon="trash"
            onClick={() => onRemove(rowData)}
          />
        )}
      </Tooltip>
    );
  }, [onRemove]);

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
        remove: renderRemove,
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
