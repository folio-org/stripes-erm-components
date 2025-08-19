// import { screen, waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  Accordion, Badge,
  renderWithIntl,
  Spinner,
  TestForm
} from '@folio/stripes-erm-testing';

import { useDoAccessControl } from '../hooks';
import FormAccessControl from './FormAccessControl';
import { translationsProperties } from '../../../test/jest/helpers';

jest.mock('../hooks/useDoAccessControl', () => jest.fn(() => ({
  doAccessControl: true,
  enabledEnginesQuery: {
    isLoading: false
  }
})));

// We should no longer need to mock icons -- needed for Spinner check
jest.unmock('@folio/stripes-components');

const onSubmit = jest.fn();

// We do a lot of rendering of FormAccessControl with varying props. Let's cut down on repetition
const renderWithProps = (props) => {
  renderWithIntl(
    <TestForm onSubmit={onSubmit}>
      <FormAccessControl {...props} />
    </TestForm>,
    translationsProperties
  );
};

describe('FormAccessControl', () => {
  describe('pre render catches', () => {
    describe('when disabled', () => {
      beforeEach(() => {
        renderWithProps({ disabled: true });
      });

      test('does not render Accordion', async () => {
        await Accordion().absent();
      });
    });

    describe('when doAccessControl is false', () => {
      beforeEach(() => {
        useDoAccessControl.mockImplementationOnce(() => ({
          doAccessControl: false,
          enabledEnginesQuery: {
            isLoading: false
          }
        }));
        renderWithProps();
      });

      test('does not render Accordion', async () => {
        await Accordion().absent();
      });
    });

    describe('when isLoading is true', () => {
      beforeEach(() => {
        renderWithProps({ isLoading: true });
      });

      test('does not render Accordion', async () => {
        await Accordion().absent();
      });

      test('renders Spinner', async () => {
        await Spinner().exists();
      });
    });

    describe('when enabledEngines is loading', () => {
      beforeEach(() => {
        useDoAccessControl.mockImplementationOnce(() => ({
          doAccessControl: true,
          enabledEnginesQuery: {
            isLoading: true
          }
        }));

        renderWithProps();
      });

      test('does not render Accordion', async () => {
        await Accordion().absent();
      });

      test('renders Spinner', async () => {
        await Spinner().exists();
      });
    });
  });

  describe('accordion props', () => {
    describe.each([true, false])('open: %s prop works as expected', (openProp) => {
      beforeEach(() => {
        renderWithProps({ open: openProp });
      });

      test(`renders an ${openProp ? 'open' : 'closed'} Accordion`, async () => {
        await Accordion('Acquisition units').has({ open: openProp });
      });

      test('renders a Badge', async () => {
        await Badge().exists();
      });
    });
  });
});
