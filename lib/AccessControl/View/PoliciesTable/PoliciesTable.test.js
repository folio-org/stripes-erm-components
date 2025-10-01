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
      // Match the component's case-insensitive sorting behavior
      const iteratee = (r) => {
        const v = r?.policy?.name;
        return typeof v === 'string' ? v.toLowerCase() : v;
      };

      sortedByNameAsc = orderBy(flattenedPolicies, iteratee, 'asc');
      sortedByNameDesc = orderBy(flattenedPolicies, iteratee, 'desc');

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
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({
        content: sortedByNameAsc[0].policy.name
      });
    });

    test('description renders as expected', async () => {
      await MultiColumnListCell({ row: 0, columnIndex: 1 }).has({
        content: sortedByNameAsc[0].policy.description || ''
      });
    });

    test('access renders as expected', async () => {
      const p = sortedByNameAsc[0].policy;
      const accessText = [
        p.protectUpdate ? 'Edit' : null,
        p.protectCreate ? 'Create' : null,
        p.protectDelete ? 'Delete' : null,
      ].filter(Boolean).join(', ');
      await MultiColumnListCell({ row: 0, columnIndex: 2 }).has({ content: accessText });
    });

    test('initial sort is ascending by name', async () => {
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({
        content: sortedByNameAsc[0].policy.name
      });
    });

    describe('clicking Name header', () => {
      beforeEach(async () => {
        await MultiColumnList().clickHeader('Name');
      });

      test('MCL is sorting by name in reverse order', async () => {
        await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({
          content: sortedByNameDesc[0].policy.name
        });
      });

      describe('clicking Name header again', () => {
        beforeEach(async () => {
          await MultiColumnList().clickHeader('Name');
        });

        test('MCL is sorting by name in ascending order again', async () => {
          await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({
            content: sortedByNameAsc[0].policy.name
          });
        });
      });
    });

    describe('clicking non-interactive headers does not change sort', () => {
      const nonInteractive = ['Description', 'Access', ...(allowRemove ? ['Remove'] : [])];

      test.each(nonInteractive)(
        '%s click leaves first row unchanged',
        async (hdr) => {
          // Attempting to click should fail for non-interactive headers.
          try {
            await MultiColumnList().clickHeader(hdr);
          } catch (e) {
            // Expected for non-interactive headers; continue.
          }
          await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({
            content: sortedByNameAsc[0].policy.name
          });
        }
      );
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
          await MultiColumnListCell({ row: rowIndex, columnIndex: 3 }).find(IconButton()).click();
        });

        test('onRemove got called with the correct data', () => {
          expect(onDoRemove).toHaveBeenCalledWith(getExpected());
        });
      });
    } else {
      test('remove column is not present when allowRemove is false', async () => {
        await MultiColumnListCell({ row: 0, columnIndex: 3 }).absent();
      });
    }
  });

  describe('case-insensitive sort with mixed-case names', () => {
    const mixedPolicies = [
      {
        type: 'ACQ_UNIT',
        policy: {
          id: '1',
          name: 'ABC2',
          description: 'upper',
          isMember: false,
          deleted: false,
          protectCreate: false,
          protectUpdate: false,
          protectDelete: false,
        },
      },
      {
        type: 'ACQ_UNIT',
        policy: {
          id: '2',
          name: 'abc1',
          description: 'lower',
          isMember: false,
          deleted: false,
          protectCreate: true,
          protectUpdate: false,
          protectDelete: false,
        },
      },
    ];

    beforeEach(() => {
      renderWithIntl(
        <PoliciesTable
          allowRemove={false}
          policies={mixedPolicies}
        />,
        translationsProperties
      );
    });

    test('initial sort puts "abc1" before "ABC2"', async () => {
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: 'abc1' });
      await MultiColumnListCell({ row: 1, columnIndex: 0 }).has({ content: 'ABC2' });
    });

    test('toggling sort reverses order', async () => {
      await MultiColumnList().clickHeader('Name');
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: 'ABC2' });
      await MultiColumnList().clickHeader('Name');
      await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: 'abc1' });
    });
  });
});
