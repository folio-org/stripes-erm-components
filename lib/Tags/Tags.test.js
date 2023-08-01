import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import {
  renderWithIntl,
  IconButton as IconButtonInteractor,
  Pane,
  PaneHeader
} from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../test/jest/helpers';

import Tags from './Tags';

const onToggle = jest.fn();
const onAdd = jest.fn();
const link = 'erm/sas/14c16fc4-f986-4e60-aa59-4e627fcf160b';

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

  test('renders expected pane dismiss button ', async () => {
    await IconButtonInteractor('Close ').exists();
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
    expect(getByText('Contains a list of any selected values, followed by an autocomplete textfield for selecting additional values.')).toBeInTheDocument();
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
