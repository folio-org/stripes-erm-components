import { MultiColumnList as StripesMultiColumnList } from '@folio/stripes/components';

import {
  MultiColumnList,
  MultiColumnListCell,
  renderWithIntl
} from '@folio/stripes-erm-testing';

import { useMCLMemorySort } from '../index';

const testData = [
  {
    id: 3,
    test: 'leopard',
    deep: {
      var: 'a'
    }
  },
  {
    id: 1,
    test: 'wibble',
    deep: {
      var: 'd'
    }
  },
  {
    id: 2,
    test: 'abc',
    deep: {
      var: 'e'
    }
  },
  {
    id: 4,
    test: 'button1',
    deep: {
      var: 'c'
    }
  },
  {
    id: 5,
    test: 'Button2',
    deep: {
      var: 'b'
    }
  }
];

const TestMCLComponent = ({
  useMclMemorySortProps,
  mclProps = {}
}) => {
  const {
    handleSort,
    sortedData,
    sortDirection,
    sortOrder
  } = useMCLMemorySort(useMclMemorySortProps);

  return (
    <StripesMultiColumnList
      columnMapping={{
        id: 'ID',
        test: 'TEST',
        deep: 'DEEP'
      }}
      contentData={sortedData}
      formatter={{
        deep: row => row.deep.var
      }}
      interactive={false}
      onHeaderClick={handleSort}
      sortDirection={sortDirection}
      sortOrder={sortOrder}
      visibleColumns={['id', 'test', 'deep']}
      {...mclProps}
    />
  );
};

const doRowChecking = (
  accessColumn,
  expectedOutcomeArray,
  label
) => {
  return describe(label, () => {
    let testIndex = 0;
    test.each(expectedOutcomeArray)(`Row %# has ${accessColumn} %s`, async (rowValue) => {
      try {
        await MultiColumnListCell({ row: testIndex, column: accessColumn }).has({ content: rowValue });
      } finally {
        testIndex += 1; // Ensure this ticks up even if the test fails, so we can analyse output properly
      }
    });
  });
};

describe('useMCLMemorySort', () => {
  describe.each([
    {
      testLabel: 'basic case',
      useMclMemorySortProps: {
        accessors: {
          deep: (row) => row.deep.var
        },
        data: testData
      },
      initialSortIds: ['3', '1', '2', '4', '5']
    },
    {
      testLabel: 'sorted by id',
      useMclMemorySortProps: {
        accessors: {
          deep: (row) => row.deep.var
        },
        data: testData,
        initialSort: 'id'
      },
      initialSortIds: ['1', '2', '3', '4', '5'],
      expectedIdSort: ['5', '4', '3', '2', '1']
    },
    {
      testLabel: 'sorted by id, initial sortDirection reversed',
      useMclMemorySortProps: {
        accessors: {
          deep: (row) => row.deep.var
        },
        data: testData,
        initialSort: 'id',
        initialSortDirection: 'descending',
      },
      initialSortIds: ['5', '4', '3', '2', '1']
    },
    {
      testLabel: 'sorted by test property',
      useMclMemorySortProps: {
        accessors: {
          deep: (row) => row.deep.var
        },
        data: testData,
        initialSort: 'test'
      },
      initialSortIds: ['2', '4', '5', '3', '1']
    },
    {
      testLabel: 'sorted by test property (case sensitive)',
      useMclMemorySortProps: {
        accessors: {
          deep: (row) => row.deep.var
        },
        data: testData,
        ignoreCase: false,
        initialSort: 'test'
      },
      initialSortIds: ['5', '2', '4', '3', '1'],
      expectedTestSort: ['5', '2', '4', '3', '1']
    },
    {
      testLabel: 'sorted by deep property',
      useMclMemorySortProps: {
        accessors: {
          deep: (row) => row.deep.var
        },
        data: testData,
        initialSort: 'deep'
      },
      initialSortIds: ['3', '5', '4', '1', '2']
    }
  ])('$testLabel', ({
    expectedIdSort = ['1', '2', '3', '4', '5'],
    expectedTestSort = ['2', '4', '5', '3', '1'],
    initialSortIds,
    useMclMemorySortProps,
    mclProps
  }) => {
    beforeEach(() => {
      renderWithIntl(
        <TestMCLComponent
          mclProps={mclProps}
          useMclMemorySortProps={useMclMemorySortProps}
        />
      );
    });

    test('renders the MCL', async () => {
      await MultiColumnList({ rowCount: 5 }).exists();
    });

    doRowChecking('ID', initialSortIds, 'initial sort order is as expected');

    describe('clicking id header', () => {
      beforeEach(async () => {
        await MultiColumnList().clickHeader('ID');
      });

      doRowChecking('ID', expectedIdSort, 'id sort order is as expected');

      describe('clicking id header again', () => {
        beforeEach(async () => {
          await MultiColumnList().clickHeader('ID');
        });

        doRowChecking('ID', expectedIdSort.reverse(), 'id sort order has reversed');

        describe('clicking test header', () => {
          beforeEach(async () => {
            await MultiColumnList().clickHeader('TEST');
          });

          doRowChecking('ID', expectedTestSort, 'test sort order is as expected');
        });
      });
    });
  });
});
