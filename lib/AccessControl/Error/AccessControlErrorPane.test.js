import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { Pane, renderWithIntl } from '@folio/stripes-erm-testing';

import AccessControlErrorPane from './AccessControlErrorPane';
import { translationsProperties } from '../../../test/jest/helpers';

let renderComponent;
describe('AccessControlErrorPane', () => {
  describe.each([undefined, 'This is a test title'])('with passthrough title %s', (passthroughTitle) => {
    beforeEach(() => {
      const theProps = {};
      if (passthroughTitle) {
        theProps.paneTitle = passthroughTitle;
      }

      renderComponent = renderWithIntl(<AccessControlErrorPane {...theProps} />, translationsProperties);
    });

    test('renders Pane', async () => {
      await waitFor(async () => {
        await Pane({ titleLabel: passthroughTitle ?? 'Access control error' }).exists();
      });
    });

    test('renders error message', async () => {
      const { getByText } = renderComponent;
      await waitFor(() => {
        expect(getByText('Access to this resource is restricted, please speak to your system administrator')).toBeInTheDocument();
      });
    });
  });
});
