import React from 'react';

import { Button } from '@folio/stripes-testing';

import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import SerialCoverage from './SerialCoverage';


const onSubmit = jest.fn();
const statements = [{
  id: 'db64caf8-ba14-498c-8179-13d93ed55246',
  startDate: '2022-07-02',
  endDate: '2022-08-30',
  startVolume: '24',
  startIssue: '80',
  summary: 'v24/i80/2022-07-02 - v44/i337/2022-07-22'
}];

let renderComponent;
describe('SerialCoverage', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm
        onSubmit={onSubmit}
      >
        <SerialCoverage
          statements={statements}
        />
      </TestForm>, translationsProperties
    );
  });

  it('renders expected serial coverage start date', () => {
    const { getByText } = renderComponent;
    expect(getByText('7/2/2022')).toBeInTheDocument();
  });

  it('renders expected serial coverage end date', () => {
    const { getByText } = renderComponent;
    expect(getByText('8/30/2022')).toBeInTheDocument();
  });

  test('renders the submit button', async () => {
    await Button('Submit').exists();
  });
});
