
import { StaticRouter as Router } from 'react-router-dom';
import { renderWithIntl, KeyValue } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';
import ErrorCard from './ErrorCard';

const resourceError = { number: 400, message: 'Bad Request' };
const resourceHeaderStart = '22-1887786-11234147a - EKB-TITLE';

const commonError = {};

const headerEnd = null;

let renderComponent;
describe('ErrorCard', () => {
  describe('resource error', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Router>
          <ErrorCard
            error={resourceError}
            headerEnd={headerEnd}
            headerStart={resourceHeaderStart}
          />
        </Router>,
        translationsProperties
      );
    });
    test('renders ErrorCard component', () => {
      const { getByTestId } = renderComponent;
      expect(getByTestId('errorCard')).toBeInTheDocument();
    });

    test('renders correct card header', () => {
      const { getByText } = renderComponent;
      expect(getByText('22-1887786-11234147a - EKB-TITLE')).toBeInTheDocument();
    });

    test('renders the expected error number', async () => {
      await KeyValue('Error number').has({ value: '400' });
    });

    test('renders the expected error message', async () => {
      await KeyValue('Error message').has({ value: 'Bad Request' });
    });
  });

  describe('common error', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Router>
          <ErrorCard
            error={commonError}
          />
        </Router>,
        translationsProperties
      );
    });
    test('renders ErrorCard component', () => {
      const { getByTestId } = renderComponent;
      expect(getByTestId('errorCard')).toBeInTheDocument();
    });

    test('renders correct card header', () => {
      const { getByText } = renderComponent;
      expect(getByText('Error')).toBeInTheDocument();
    });

    test('renders the expected error number', async () => {
      await KeyValue('Error number').has({ value: 'No value set-' });
    });

    test('renders the expected error message', async () => {
      await KeyValue('Error message').has({ value: 'No value set-' });
    });
  });
});
