import { useState } from 'react';

import { Checkbox } from '@folio/stripes-testing';
import { render } from '@testing-library/react';

import SearchKeyControl from './SearchKeyControl';

// FIXME Add this to mocks
const mockUseQIndex = jest.fn();

jest.mock('@k-int/stripes-kint-components', () => ({
  ...jest.requireActual('@k-int/stripes-kint-components'),
  useQIndex: () => mockUseQIndex()
}));


describe('SearchKeyControl', () => {
  describe('without initial qIndex', () => {
    beforeEach(() => {
      mockUseQIndex.mockImplementation(() => {
        return useState();
      });

      render(
        <SearchKeyControl
          options={[
            {
              label: 'Opt 1',
              key: 'opt1'
            },
            {
              label: 'Opt 2',
              key: 'opt2'
            },
            {
              label: 'Opt 3',
              key: 'opt3'
            }
          ]}
        />
      );
    });

    test('renders all Checkboxes', async () => {
      await Checkbox('Opt 1').exists();
      await Checkbox('Opt 2').exists();
      await Checkbox('Opt 3').exists();
    });

    test('all Checkboxes have expected initial "checked" value', async () => {
      await Checkbox('Opt 1').has({ checked: false });
      await Checkbox('Opt 2').has({ checked: false });
      await Checkbox('Opt 3').has({ checked: false });
    });

    describe('clicking Opt 2', () => {
      beforeEach(async () => {
        await Checkbox('Opt 2').click();
      });

      test('all Checkboxes have expected "checked" value', async () => {
        await Checkbox('Opt 1').has({ checked: false });
        await Checkbox('Opt 2').has({ checked: true });
        await Checkbox('Opt 3').has({ checked: false });
      });
    });

    describe('clicking Opt 1 and Opt 2', () => {
      beforeEach(async () => {
        await Checkbox('Opt 1').click();
        await Checkbox('Opt 2').click();
      });

      test('all Checkboxes have expected "checked" value', async () => {
        await Checkbox('Opt 1').has({ checked: true });
        await Checkbox('Opt 2').has({ checked: true });
        await Checkbox('Opt 3').has({ checked: false });
      });
    });
  });

  describe('with initial qIndex', () => {
    beforeEach(() => {
      mockUseQIndex.mockImplementation(() => {
        return useState('opt1,opt3');
      });

      render(
        <SearchKeyControl
          options={[
            {
              label: 'Opt 1',
              key: 'opt1'
            },
            {
              label: 'Opt 2',
              key: 'opt2'
            },
            {
              label: 'Opt 3',
              key: 'opt3'
            }
          ]}
        />
      );
    });

    test('renders all Checkboxes', async () => {
      await Checkbox('Opt 1').exists();
      await Checkbox('Opt 2').exists();
      await Checkbox('Opt 3').exists();
    });

    test('all Checkboxes have expected initial "checked" value', async () => {
      await Checkbox('Opt 1').has({ checked: true });
      await Checkbox('Opt 2').has({ checked: false });
      await Checkbox('Opt 3').has({ checked: true });
    });

    describe('clicking Opt 2', () => {
      beforeEach(async () => {
        await Checkbox('Opt 2').click();
      });

      test('all Checkboxes have expected "checked" value', async () => {
        await Checkbox('Opt 1').has({ checked: true });
        await Checkbox('Opt 2').has({ checked: true });
        await Checkbox('Opt 3').has({ checked: true });
      });
    });

    describe('clicking Opt 1 and Opt 2', () => {
      beforeEach(async () => {
        await Checkbox('Opt 1').click();
        await Checkbox('Opt 2').click();
      });

      test('all Checkboxes have expected "checked" value', async () => {
        await Checkbox('Opt 1').has({ checked: false });
        await Checkbox('Opt 2').has({ checked: true });
        await Checkbox('Opt 3').has({ checked: true });
      });
    });

    describe('clicking Opt 3', () => {
      beforeEach(async () => {
        await Checkbox('Opt 3').click();
      });

      test('all Checkboxes have expected "checked" value', async () => {
        await Checkbox('Opt 1').has({ checked: true });
        await Checkbox('Opt 2').has({ checked: false });
        await Checkbox('Opt 3').has({ checked: false });
      });
    });
  });
});
