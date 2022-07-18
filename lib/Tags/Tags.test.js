import React from 'react';
import '../../test/jest/__mock__';
import { MemoryRouter } from 'react-router-dom';
import { Pane, PaneHeader } from '@folio/stripes-testing';
import { renderWithIntl } from '../../test/jest/helpers';
import translationsProperties from '../../tests/helpers/translationsProperties';
import Tags from './Tags';

const onToggle = jest.fn();
const onAdd = jest.fn();
const link = 'erm/sas/14c16fc4-f986-4e60-aa59-4e627fcf160b';

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: jest.fn(),
  CalloutContext: jest.fn(),
}));

describe('Tags', () => {
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <Tags
          invalidateLinks={[]}
          link={link}
          onAdd={onAdd}
          onToggle={onToggle}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the expected label', () => {
    const { getByText } = renderComponent;
    expect(getByText('0 Tags')).toBeInTheDocument();
  });

  test('renders expected close item button ', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('button', { name: 'stripes-components.closeItem' })).toBeInTheDocument();
  });

  test('renders expected open menu button ', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('button', { name: 'open menu' })).toBeInTheDocument();
  });

  test('renders tags heading  ', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('heading', { name: 'Tags' })).toBeInTheDocument();
  });

  test('renders expected region with zero tags', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('region', { name: 'Tags 0 Tags' })).toBeInTheDocument();
  });

  test('renders the expected multiSelectDescription', () => {
    const { getByText } = renderComponent;
    expect(getByText('stripes-components.multiSelection.controlDescription')).toBeInTheDocument();
  });

  test('renders the expected label', () => {
    const { getByText } = renderComponent;
    expect(getByText('0 items selected')).toBeInTheDocument();
  });

  test('displays the tags pane', async () => {
    await Pane('Tags').is({ visible: true });
  });

  test('displays the tags pane header', async () => {
    await PaneHeader('Tags').is({ visible: true });
  });
});
