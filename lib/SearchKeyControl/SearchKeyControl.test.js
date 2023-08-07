import { useState } from 'react';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { renderWithIntl, Checkbox } from '@folio/stripes-erm-testing';

import SearchKeyControl from './SearchKeyControl';

// We want to do something special with state in this test, so avoid the manual mock
jest.unmock('@k-int/stripes-kint-components');

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

      renderWithIntl(
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
        await waitFor(async () => {
          await Checkbox('Opt 2').click();
        });
      });

      test('all Checkboxes have expected "checked" value', async () => {
        await Checkbox('Opt 1').has({ checked: false });
        await Checkbox('Opt 2').has({ checked: true });
        await Checkbox('Opt 3').has({ checked: false });
      });
    });

    describe('clicking Opt 1 and Opt 2', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Checkbox('Opt 1').click();
          await Checkbox('Opt 2').click();
        });
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

      renderWithIntl(
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
        await waitFor(async () => {
          await Checkbox('Opt 2').click();
        });
      });

      test('all Checkboxes have expected "checked" value', async () => {
        await Checkbox('Opt 1').has({ checked: true });
        await Checkbox('Opt 2').has({ checked: true });
        await Checkbox('Opt 3').has({ checked: true });
      });
    });

    describe('clicking Opt 1 and Opt 2', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Checkbox('Opt 1').click();
          await Checkbox('Opt 2').click();
        });
      });

      test('all Checkboxes have expected "checked" value', async () => {
        await Checkbox('Opt 1').has({ checked: false });
        await Checkbox('Opt 2').has({ checked: true });
        await Checkbox('Opt 3').has({ checked: true });
      });
    });

    describe('clicking Opt 3', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Checkbox('Opt 3').click();
        });
      });

      test('all Checkboxes have expected "checked" value', async () => {
        await Checkbox('Opt 1').has({ checked: true });
        await Checkbox('Opt 2').has({ checked: false });
        await Checkbox('Opt 3').has({ checked: false });
      });
    });
  });
});
