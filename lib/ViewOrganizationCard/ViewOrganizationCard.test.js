import React from 'react';
import { Button, KeyValue, Card, MultiColumnList } from '@folio/stripes-testing';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import { props, emptyProps, interfacesProps } from './testResources';
import ViewOrganizationCard from './ViewOrganizationCard';

let renderComponent;
/*
 * ViewOrganizationCard can _also_ be used as a form component,
 * but seemingly only to display errors.
 *
 * Test outside of form context for now.
 */
describe('ViewOrganizationCard', () => {
  describe('ViewOrganizationCard with interfaces', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <ViewOrganizationCard
          {...interfacesProps}
        />, translationsProperties
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

    test('renders the Show credentials button', async () => {
      await Button('Show credentials').exists();
    });

    it('renders endOfList', () => {
      const { getByText } = renderComponent;
      expect(getByText('End of list')).toBeInTheDocument();
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

  describe('ViewOrganizationCard with linked organization', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <ViewOrganizationCard
          {...props}
        />, translationsProperties
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

  describe('ViewOrganizationCard without interfaces or organization', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <ViewOrganizationCard
          {...emptyProps}
        />, translationsProperties
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
  });
});

