import { waitFor } from '@folio/jest-config-stripes/testing-library/react';


import { Accordion, Badge, renderWithIntl } from '@folio/stripes-erm-testing';
import AccessControl from './AccessControl';
import { translationsProperties } from '../../../../test/jest/helpers';

jest.mock('../PoliciesTable', () => () => <div>PoliciesTable</div>);

const onToggle = jest.fn();
let renderComponent;

describe('AccessControl', () => {
  describe('accordion props', () => {
    describe.each([true, false])('open: %s prop works as expected', (openProp) => {
      beforeEach(() => {
        renderComponent = renderWithIntl(<AccessControl {...{ onToggle, open: openProp }} />, translationsProperties);
      });

      test(`renders an ${openProp ? 'open' : 'closed'} Accordion`, async () => {
        await Accordion('Acquisition units').has({ open: openProp });
      });

      test('renders a Badge', async () => {
        await Badge().exists();
      });

      test('renders the PoliciesTable', () => {
        const { getByText } = renderComponent;
        expect(getByText('PoliciesTable')).toBeInTheDocument(); // Hidden in an accordion is still in the document
      });

      describe('clicking the accordion', () => {
        beforeEach(async () => {
          onToggle.mockClear();
          await waitFor(async () => {
            await Accordion().clickHeader();
          });
        });

        test('expect onToggle to have been called', async () => {
          await waitFor(() => {
            expect(onToggle).toHaveBeenCalled();
          });
        });
      });
    });
  });
});
