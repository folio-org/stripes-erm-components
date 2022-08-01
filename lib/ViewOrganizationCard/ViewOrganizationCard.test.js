import React from 'react';
import '../../test/jest/__mock__';
import { Button, KeyValue, Card, MultiColumnList } from '@folio/stripes-testing';
import { StaticRouter as Router } from 'react-router-dom';
import { renderWithIntl, TestForm } from '../../test/jest/helpers';

import { props, emptyFieldProps, interfacesProps } from './testResources';
import { translationsProperties } from '../../test/jest/helpers';
import ViewOrganizationCard from './ViewOrganizationCard';

const onSubmit = jest.fn();

let renderComponent;
describe('ViewOrganizationCard', () => {
  describe('ViewOrganizationCard with linked organization', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Router>
          <TestForm
            onSubmit={onSubmit}
          >
            <ViewOrganizationCard
              {...props}
            />
          </TestForm>,
        </Router>, translationsProperties
      );
    });

    it('renders organization header', () => {
      const { getByText } = renderComponent;
      expect(getByText('Organization')).toBeInTheDocument();
    });

    it('renders replace organization pluggable', () => {
      const { getByText } = renderComponent;
      expect(getByText('Replace organization')).toBeInTheDocument();
    });

    test('renders the expected name value', async () => {
      await KeyValue('Name').has({ value: 'American Chemical Society' });
    });

    test('renders the expected card', async () => {
      await Card('NameAmerican Chemical Society').exists();
    });
  });

  describe('ViewOrganizationCard without organization', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          onSubmit={onSubmit}
        >
          <ViewOrganizationCard
            {...emptyFieldProps}
          />
        </TestForm>, translationsProperties
      );
    });

    it('renders organization header', () => {
      const { getByText } = renderComponent;
      expect(getByText('Organization')).toBeInTheDocument();
    });

    it('renders link organization pluggable', () => {
      const { getByText } = renderComponent;
      expect(getByText('Link organization')).toBeInTheDocument();
    });

    it('renders the expected No organization linked layout', () => {
      const { getByText } = renderComponent;
      expect(getByText('No organization linked')).toBeInTheDocument();
    });

    it('renders the expected Link an organization to get started layout', () => {
      const { getByText } = renderComponent;
      expect(getByText('Link an organization to get started')).toBeInTheDocument();
    });

    test('renders the submit button', async () => {
      await Button('Submit').exists();
    });
  });
  describe('ViewOrganizationCard with interfaces', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm
          onSubmit={onSubmit}
        >
          <ViewOrganizationCard
            {...interfacesProps}
          />
        </TestForm>, translationsProperties
      );
    });

    it('renders organization header', () => {
      const { getByText } = renderComponent;
      expect(getByText('Organization')).toBeInTheDocument();
    });

    it('renders replace organization pluggable', () => {
      const { getByText } = renderComponent;
      expect(getByText('Replace organization')).toBeInTheDocument();
    });

    test('renders the expected roles value', async () => {
      await KeyValue('Roles').has({ value: 'Content provider: test' });
    });

    test('renders the expected note value', async () => {
      await KeyValue('Note').has({ value: 'test' });
    });
    test('renders the submit button', async () => {
      await Button('Submit').exists();
    });

    test('renders the Show credentials button', async () => {
      await Button('Show credentials').exists();
    });

    it('renders stripes-components.endOfList', () => {
      const { getByText } = renderComponent;
      expect(getByText('stripes-components.endOfList')).toBeInTheDocument();
    });

    test('renders the interfaces multiSelect cols by id', () => {
      const { getByTestId } = renderComponent;
      expect(getByTestId('interfaces')).toBeInTheDocument();
    });
    test('renders expected interfaces columns', async () => {
      await MultiColumnList({
        columns: [
          'Interface name',
          'Interface type',
          'Notes',
          'Username',
          'Password',
          ''
        ],
      }).exists();
    });
  });
});

