import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { renderWithIntl } from '@folio/stripes-erm-testing';

import SearchKeyControl from './SearchKeyControl';

jest.mock('@k-int/stripes-kint-components', () => ({
  SearchKeyControl: () => <div>SearchKeyControl</div>
}));

let renderComponent;

describe('SearchKeyControl', () => {
  describe('renders SearchKeyControl from kint-components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <SearchKeyControl />
      );
    });

    test('renders all Checkboxes', async () => {
      const { getByText } = renderComponent;
      await waitFor(() => {
        expect(getByText('SearchKeyControl')).toBeInTheDocument();
      });
    });
  });
});
