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
      testTitle: 'with allowRemove: :false',
    },
  ])('$testTitle', ({ allowRemove, onRemove }) => {
    let sortedByName;

    beforeEach(() => {
      // Mirror PoliciesTable's default sort: by policy[sortOrder] = policy.name, ascending
      sortedByName = orderBy(flattenedPolicies, r => r.policy.name, 'asc');

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

    test('name renders as expected', async () => {
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: 'Restrict create (member)' });
    });

    test('description renders as expected', async () => {
      await MultiColumnListCell({ row: 0, columnIndex: 1 }).has({ content: 'An acquisition unit restricting create, user is a member' });
    });

    test('access renders as expected', async () => {
      await MultiColumnListCell({ row: 0, columnIndex: 2 }).has({ content: 'Create' });
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
            ...sortedByName[0],
            rowIndex: 0, // MCL adds this information in
          }),
        },
        {
          row: 'third',
          rowIndex: 2,
          getExpected: () => ({
            ...sortedByName[2],
            rowIndex: 2, // MCL adds this information in
          }),
        },
      ])('clicking the remove button for the $row row', ({ rowIndex, getExpected }) => {
        beforeEach(async () => {
          onRemove.mockClear();
          await waitFor(async () => {
            await MultiColumnListCell({ row: rowIndex, columnIndex: 3 }).find(IconButton()).click();
          });
        });

        test('onRemove got called with the correct data', async () => {
          await waitFor(() => {
            expect(onRemove).toHaveBeenCalledWith(getExpected());
          });
        });
      });
    }
  });
});
