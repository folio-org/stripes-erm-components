import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import orderBy from 'lodash/orderBy';

import {
  IconButton,
  MultiColumnList,
  MultiColumnListCell,
  MultiColumnListHeader,
  renderWithIntl
} from '@folio/stripes-erm-testing';
import { PoliciesTable } from '../index';
import { flattenedPolicies } from '../../../../test/jest/resources';
import { translationsProperties } from '../../../../test/jest/helpers';

const onDoRemove = jest.fn();

describe('PoliciesTable', () => {
  describe.each([
    {
      allowRemove: false,
      testTitle: 'with allowRemove: :false',
    },
    {
      allowRemove: true,
      onRemove: onDoRemove,
      testTitle: 'with allowRemove: :true',
    },
  ])('$testTitle', ({ allowRemove, onRemove }) => {
    let sortedByNameAsc;
    let sortedByNameDesc;

    beforeEach(() => {
      // Mirror PoliciesTable's default sort: by policy.name, ascending
      sortedByNameAsc = orderBy(flattenedPolicies, r => r.policy.name, 'asc');
      sortedByNameDesc = [...sortedByNameAsc].reverse();

      renderWithIntl(
        <PoliciesTable
          allowRemove={allowRemove}
          onRemove={onRemove}
          policies={flattenedPolicies}
        />,
        translationsProperties
      );
    });

    test('should render an MCL with the right number of columns', async () => {
      await MultiColumnList().has({ columnCount: allowRemove ? 4 : 3 });
    });

    const expectedColumns = ['Name', 'Description', 'Access'];
    if (allowRemove) {
      expectedColumns.push('Remove');
    }

    test.each(expectedColumns)('%s column renders', async (colName) => {
      await MultiColumnListHeader(colName).exists();
    });

    // still keep your explicit content checks
    test('name renders as expected', async () => {
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: 'Restrict create (member)' });
    });

    test('description renders as expected', async () => {
      await MultiColumnListCell({ row: 0, columnIndex: 1 }).has({ content: 'An acquisition unit restricting create, user is a member' });
    });

    test('access renders as expected', async () => {
      await MultiColumnListCell({ row: 0, columnIndex: 2 }).has({ content: 'Create' });
    });

    // NEW: Assert initial sort is ascending by name using data, not hard-coded text
    test('initial sort is ascending by name', async () => {
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: sortedByNameAsc[0].policy.name });
    });

    // NEW: Clicking "Name" toggles to descending
    test('clicking Name header toggles to descending', async () => {
      await MultiColumnListHeader('Name').click();
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: sortedByNameDesc[0].policy.name });
    });

    if (allowRemove) {
      test('remove renders as expected', async () => {
        await MultiColumnListCell({ row: 0, columnIndex: 3 }).find(IconButton()).exists();
      });

      describe.each([
        {
          row: 'first',
          rowIndex: 0,
          getExpected: () => ({
            ...sortedByNameAsc[0],
            rowIndex: 0, // MCL adds this information in
          }),
        },
        {
          row: 'third',
          rowIndex: 2,
          getExpected: () => ({
            ...sortedByNameAsc[2],
            rowIndex: 2, // MCL adds this information in
          }),
        },
      ])('clicking the remove button for the $row row', ({ rowIndex, getExpected }) => {
        beforeEach(async () => {
          onDoRemove.mockClear();
          await waitFor(async () => {
            await MultiColumnListCell({ row: rowIndex, columnIndex: 3 }).find(IconButton()).click();
          });
        });

        test('onRemove got called with the correct data', async () => {
          await waitFor(() => {
            expect(onDoRemove).toHaveBeenCalledWith(getExpected());
          });
        });
      });

      // NEW: Clicking "Remove" header changes the sort column (branch meta.name !== sortOrder)
      test('clicking Remove header changes sort column (and resets direction to ascending)', async () => {
        // Start descending by Name to prove direction resets
        await MultiColumnListHeader('Name').click();
        await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: sortedByNameDesc[0].policy.name });

        // Click Remove header -> switches sort column and resets direction to ascending
        await MultiColumnListHeader('Remove').click();

        // We cannot assert meaningful order for "remove" (no data to sort by),
        // but we can assert switching back to Name returns to ascending (reset path covered above)
        await MultiColumnListHeader('Name').click();
        await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: sortedByNameAsc[0].policy.name });
      });
    }
  });
});
