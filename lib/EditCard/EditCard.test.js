import React from 'react';
import '../../test/jest/__mock__';
import { StaticRouter as Router } from 'react-router-dom';
import { renderWithIntl, translationsProperties } from '../../test/jest/helpers';

import EditCard from './EditCard';

jest.mock('@folio/stripes/components', () => ({
  ...jest.requireActual('@folio/stripes/components'),
  Card: () => <div>Card</div>,
}));

const onDelete = jest.fn();

const props = {
  children: 'children',
  deleteButtonTooltipText: 'remove element',
  header: 'edit card header',
  onDelete
};

let renderComponent;
describe('EditCard', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <Router>
        <EditCard
          {...props}
        />
      </Router>,
      translationsProperties
    );
  });

  test('renders the Card component', () => {
    const { getByText } = renderComponent;
    expect(getByText('Card')).toBeInTheDocument();
  });
});
