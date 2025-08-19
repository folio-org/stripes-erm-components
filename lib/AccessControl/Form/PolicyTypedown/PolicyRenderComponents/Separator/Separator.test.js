import { renderWithIntl } from '@folio/stripes-erm-testing';

import Separator from './Separator';
import { translationsProperties } from '../../../../../../test/jest/helpers';

let renderComponent;
describe('Separator', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(<Separator />, translationsProperties);
  });

  test('renders separator "·"', () => {
    const { getByText } = renderComponent;
    expect(getByText('·')).toBeInTheDocument();
  });
});
