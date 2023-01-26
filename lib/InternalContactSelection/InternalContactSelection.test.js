import { StaticRouter as Router } from 'react-router-dom';
import { renderWithIntl } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import { internalContactSelection } from './testResources';
import InternalContactSelection from './InternalContactSelection';

jest.mock('./InternalContactSelectionDisplay', () => () => <div>InternalContactSelectionDisplay</div>);

// EXAMPLE using internal manual mocks
jest.mock('../hooks');

let renderComponent;
describe('InternalContactSelection', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <Router>
        <InternalContactSelection
          {...internalContactSelection}
        />
      </Router>,
      translationsProperties
    );
  });

  test('renders InternalContactSelectionDisplay component', () => {
    const { getByText } = renderComponent;
    expect(getByText('InternalContactSelectionDisplay')).toBeInTheDocument();
  });
});
