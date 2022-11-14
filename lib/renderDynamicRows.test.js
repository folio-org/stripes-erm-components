import { render } from '@testing-library/react';

import { byTestId } from 'testing-library-selector';

import renderDynamicRows from './renderDynamicRows';

const selectors = {
  rows: byTestId(RegExp('^dynamic-render-item-row-')),
  cols: byTestId(RegExp('^dynamic-render-item-col-')),
  row: (ind) => byTestId(`dynamic-render-item-row-${ind}`),
  col: (ind) => byTestId(RegExp(`^dynamic-render-item-col-${ind}`)),
};

const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9'
];

let renderComponent;
describe('renderDynamicRows', () => {
  describe('renderDynamicRows default', () => {
    beforeEach(() => {
      renderComponent = render(
        renderDynamicRows(
          items,
          (item) => item
        )
      );
    });

    test('renders all expected items', () => {
      const { getByText } = renderComponent;
      for (const item of items) {
        expect(getByText(item)).toBeInTheDocument();
      }
    });

    test('renders expected number of cols', () => {
      expect(selectors.cols.getAll().length).toEqual(9);
    });

    test('renders expected number of rows', () => {
      expect(selectors.rows.getAll().length).toEqual(3);
    });

    test('renders the right number of cols within each row', () => {
      // Perform "within" by specifying component within getAll call
      expect(selectors.cols.getAll(selectors.row(0).get()).length).toEqual(4);
      expect(selectors.cols.getAll(selectors.row(1).get()).length).toEqual(4);
      expect(selectors.cols.getAll(selectors.row(2).get()).length).toEqual(1);
    });
  });

  describe('render function works as expected', () => {
    beforeEach(() => {
      renderComponent = render(
        renderDynamicRows(
          items,
          (item) => <>Rendering the thing: {item}</>
        )
      );
    });

    test('renders all expected items correctly', () => {
      const { getByText } = renderComponent;
      for (const item of items) {
        expect(getByText(`Rendering the thing: ${item}`)).toBeInTheDocument();
      }
    });
  });

  describe('static columns false', () => {
    describe('1 item', () => {
      const oneItem = items.slice(0, 1);
      beforeEach(() => {
        renderComponent = render(
          renderDynamicRows(
            oneItem,
            (item) => item,
            false
          )
        );
      });

      test('renders all expected items', () => {
        const { getByText } = renderComponent;
        for (const item of oneItem) {
          expect(getByText(item)).toBeInTheDocument();
        }
      });

      test('renders expected number of cols', () => {
        expect(selectors.cols.getAll().length).toEqual(1);
      });

      test('renders expected number of rows', () => {
        expect(selectors.rows.getAll().length).toEqual(1);
      });

      test('renders the right number of cols within each row', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.cols.getAll(selectors.row(0).get()).length).toEqual(1);
      });

      // This feels like it might be flaky if stripes choose to change how col classes work
      test('renders each col to the correct size', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.col(0).get()).toHaveAttribute('class', expect.stringMatching(/.*xs-12.*/));
      });
    });

    describe('2 items', () => {
      const twoItems = items.slice(0, 2);
      beforeEach(() => {
        renderComponent = render(
          renderDynamicRows(
            twoItems,
            (item) => item,
            false
          )
        );
      });

      test('renders all expected items', () => {
        const { getByText } = renderComponent;
        for (const item of twoItems) {
          expect(getByText(item)).toBeInTheDocument();
        }
      });

      test('renders expected number of cols', () => {
        expect(selectors.cols.getAll().length).toEqual(2);
      });

      test('renders expected number of rows', () => {
        expect(selectors.rows.getAll().length).toEqual(1);
      });

      test('renders the right number of cols within each row', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.cols.getAll(selectors.row(0).get()).length).toEqual(2);
      });

      // This feels like it might be flaky if stripes choose to change how col classes work
      test('renders each col to the correct size', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.col(0).get()).toHaveAttribute('class', expect.stringMatching(/.*xs-6.*/));
      });
    });

    describe('3 items', () => {
      const threeItems = items.slice(0, 3);
      beforeEach(() => {
        renderComponent = render(
          renderDynamicRows(
            threeItems,
            (item) => item,
            false
          )
        );
      });

      test('renders all expected items', () => {
        const { getByText } = renderComponent;
        for (const item of threeItems) {
          expect(getByText(item)).toBeInTheDocument();
        }
      });

      test('renders expected number of cols', () => {
        expect(selectors.cols.getAll().length).toEqual(3);
      });

      test('renders expected number of rows', () => {
        expect(selectors.rows.getAll().length).toEqual(1);
      });

      test('renders the right number of cols within each row', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.cols.getAll(selectors.row(0).get()).length).toEqual(3);
      });

      // This feels like it might be flaky if stripes choose to change how col classes work
      test('renders each col to the correct size', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.col(0).get()).toHaveAttribute('class', expect.stringMatching(/.*xs-4.*/));
      });
    });

    describe('4 items', () => {
      const fourItems = items.slice(0, 4);
      beforeEach(() => {
        renderComponent = render(
          renderDynamicRows(
            fourItems,
            (item) => item,
            false
          )
        );
      });

      test('renders all expected items', () => {
        const { getByText } = renderComponent;
        for (const item of fourItems) {
          expect(getByText(item)).toBeInTheDocument();
        }
      });

      test('renders expected number of cols', () => {
        expect(selectors.cols.getAll().length).toEqual(4);
      });

      test('renders expected number of rows', () => {
        expect(selectors.rows.getAll().length).toEqual(1);
      });

      test('renders the right number of cols within each row', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.cols.getAll(selectors.row(0).get()).length).toEqual(4);
      });

      // This feels like it might be flaky if stripes choose to change how col classes work
      test('renders each col to the correct size', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.col(0).get()).toHaveAttribute('class', expect.stringMatching(/.*xs-3.*/));
      });
    });

    describe('5 items', () => {
      const fiveItems = items.slice(0, 5);
      beforeEach(() => {
        renderComponent = render(
          renderDynamicRows(
            fiveItems,
            (item) => item,
            false
          )
        );
      });

      test('renders all expected items', () => {
        const { getByText } = renderComponent;
        for (const item of fiveItems) {
          expect(getByText(item)).toBeInTheDocument();
        }
      });

      test('renders expected number of cols', () => {
        expect(selectors.cols.getAll().length).toEqual(5);
      });

      test('renders expected number of rows', () => {
        expect(selectors.rows.getAll().length).toEqual(2);
      });

      test('renders the right number of cols within each row', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.cols.getAll(selectors.row(0).get()).length).toEqual(4);
        expect(selectors.cols.getAll(selectors.row(1).get()).length).toEqual(1);
      });

      // This feels like it might be flaky if stripes choose to change how col classes work
      test('renders each col to the correct size', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.col(0).get()).toHaveAttribute('class', expect.stringMatching(/.*xs-3.*/));
        // ALSO check first one on second row to check sizing doesn't shift between rows
        expect(selectors.col(4).get()).toHaveAttribute('class', expect.stringMatching(/.*xs-3.*/));
      });
    });
  });

  describe('static columns true', () => {
    describe('2 items', () => {
      const twoItems = items.slice(0, 2);
      beforeEach(() => {
        renderComponent = render(
          renderDynamicRows(
            twoItems,
            (item) => item
          )
        );
      });

      test('renders all expected items', () => {
        const { getByText } = renderComponent;
        for (const item of twoItems) {
          expect(getByText(item)).toBeInTheDocument();
        }
      });

      test('renders expected number of cols', () => {
        expect(selectors.cols.getAll().length).toEqual(2);
      });

      test('renders expected number of rows', () => {
        expect(selectors.rows.getAll().length).toEqual(1);
      });

      test('renders the right number of cols within each row', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.cols.getAll(selectors.row(0).get()).length).toEqual(2);
      });

      // This feels like it might be flaky if stripes choose to change how col classes work
      test('renders each col to the correct size', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.col(0).get()).toHaveAttribute('class', expect.stringMatching(/.*xs-3.*/));
      });
    });

    describe('5 items', () => {
      const fiveItems = items.slice(0, 5);
      beforeEach(() => {
        renderComponent = render(
          renderDynamicRows(
            fiveItems,
            (item) => item
          )
        );
      });

      test('renders all expected items', () => {
        const { getByText } = renderComponent;
        for (const item of fiveItems) {
          expect(getByText(item)).toBeInTheDocument();
        }
      });

      test('renders expected number of cols', () => {
        expect(selectors.cols.getAll().length).toEqual(5);
      });

      test('renders expected number of rows', () => {
        expect(selectors.rows.getAll().length).toEqual(2);
      });

      test('renders the right number of cols within each row', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.cols.getAll(selectors.row(0).get()).length).toEqual(4);
        expect(selectors.cols.getAll(selectors.row(1).get()).length).toEqual(1);
      });

      // This feels like it might be flaky if stripes choose to change how col classes work
      test('renders each col to the correct size', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.col(0).get()).toHaveAttribute('class', expect.stringMatching(/.*xs-3.*/));
        // ALSO check first one on second row to check sizing doesn't shift between rows
        expect(selectors.col(4).get()).toHaveAttribute('class', expect.stringMatching(/.*xs-3.*/));
      });
    });
  });

  describe('max columns 2', () => {
    describe('1 item', () => {
      const oneItem = items.slice(0, 1);
      beforeEach(() => {
        renderComponent = render(
          renderDynamicRows(
            oneItem,
            (item) => item,
            true,
            2
          )
        );
      });

      test('renders all expected items', () => {
        const { getByText } = renderComponent;
        for (const item of oneItem) {
          expect(getByText(item)).toBeInTheDocument();
        }
      });

      test('renders expected number of cols', () => {
        expect(selectors.cols.getAll().length).toEqual(1);
      });

      test('renders expected number of rows', () => {
        expect(selectors.rows.getAll().length).toEqual(1);
      });

      test('renders the right number of cols within each row', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.cols.getAll(selectors.row(0).get()).length).toEqual(1);
      });

      // This feels like it might be flaky if stripes choose to change how col classes work
      test('renders each col to the correct size', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.col(0).get()).toHaveAttribute('class', expect.stringMatching(/.*xs-6.*/));
      });
    });

    describe('2 items', () => {
      const twoItems = items.slice(0, 2);
      beforeEach(() => {
        renderComponent = render(
          renderDynamicRows(
            twoItems,
            (item) => item,
            true,
            2
          )
        );
      });

      test('renders all expected items', () => {
        const { getByText } = renderComponent;
        for (const item of twoItems) {
          expect(getByText(item)).toBeInTheDocument();
        }
      });

      test('renders expected number of cols', () => {
        expect(selectors.cols.getAll().length).toEqual(2);
      });

      test('renders expected number of rows', () => {
        expect(selectors.rows.getAll().length).toEqual(1);
      });

      test('renders the right number of cols within each row', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.cols.getAll(selectors.row(0).get()).length).toEqual(2);
      });

      // This feels like it might be flaky if stripes choose to change how col classes work
      test('renders each col to the correct size', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.col(0).get()).toHaveAttribute('class', expect.stringMatching(/.*xs-6.*/));
      });
    });

    describe('5 items', () => {
      const fiveItems = items.slice(0, 5);
      beforeEach(() => {
        renderComponent = render(
          renderDynamicRows(
            fiveItems,
            (item) => item,
            true,
            2
          )
        );
      });

      test('renders all expected items', () => {
        const { getByText } = renderComponent;
        for (const item of fiveItems) {
          expect(getByText(item)).toBeInTheDocument();
        }
      });

      test('renders expected number of cols', () => {
        expect(selectors.cols.getAll().length).toEqual(5);
      });

      test('renders expected number of rows', () => {
        expect(selectors.rows.getAll().length).toEqual(3);
      });

      test('renders the right number of cols within each row', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.cols.getAll(selectors.row(0).get()).length).toEqual(2);
        expect(selectors.cols.getAll(selectors.row(1).get()).length).toEqual(2);
        expect(selectors.cols.getAll(selectors.row(2).get()).length).toEqual(1);
      });

      // This feels like it might be flaky if stripes choose to change how col classes work
      test('renders each col to the correct size', () => {
        // Perform "within" by specifying component within getAll call
        expect(selectors.col(0).get()).toHaveAttribute('class', expect.stringMatching(/.*xs-6*/));
      });
    });
  });
});
