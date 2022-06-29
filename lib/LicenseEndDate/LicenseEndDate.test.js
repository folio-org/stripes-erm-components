import React from 'react';
import '../../test/jest/__mock__';
import { StaticRouter as Router } from 'react-router-dom';
import { renderWithIntl } from '../../test/jest/helpers';

import translationsProperties from '../../tests/helpers/translationsProperties';
import { noEndDateProps, endDateProps } from './testResources';
import LicenseEndDate from './LicenseEndDate';


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
