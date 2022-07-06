import React from 'react';
import '../../test/jest/__mock__';
import { StaticRouter as Router } from 'react-router-dom';
import { renderWithIntl } from '../../test/jest/helpers';

import translationsProperties from '../../tests/helpers/translationsProperties';
import LicenseEndDate from './LicenseEndDate';

const noEndDateProps = {
  license: {
    id: '552a5fc5-9c9f-4acd-b7d8-fac9ca2f4a46',
    supplementaryDocs: '[]',
    description: 'Licenses test description.',
    startDate: '2022-06-01'
  }
};

const endDateProps = {
  license: {
    id: '552a5fc5-9c9f-4acd-b7d8-fac9ca2f4a46',
    supplementaryDocs: '[]',
    description: 'Licenses test description.',
    startDate: '2022-06-01',
    endDate: '2022-06-30'
  }
};

let renderComponent;
describe('LicenseEndDate', () => {
  describe('LicenseEndDate with empty end date', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Router>
          <LicenseEndDate
            {...noEndDateProps}
          />
        </Router>,
        translationsProperties
      );
    });

    it('renders NoValue', () => {
      const { getByText } = renderComponent;
      expect(getByText('stripes-components.noValue.noValueSet')).toBeInTheDocument();
    });
  });
  describe('LicenseEndDate with value', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Router>
          <LicenseEndDate
            {...endDateProps}
          />
        </Router>,
        translationsProperties
      );
    });

    it('renders expected end date', () => {
      const { getByText } = renderComponent;
      expect(getByText('6/30/2022')).toBeInTheDocument();
    });
  });
});