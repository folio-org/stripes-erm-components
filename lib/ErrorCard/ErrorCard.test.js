
import { StaticRouter as Router } from 'react-router-dom';
import { renderWithIntl, Headline } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';
import ErrorCard from './ErrorCard';

const resourceError = { number: 400, message: 'Bad Request' };
const resourceHeaderStart = 'EKB-TITLE: 22-1887786-11234147a';

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
      expect(getByText('EKB-TITLE: 22-1887786-11234147a')).toBeInTheDocument();
    });

    test('renders the expected error number and message', async () => {
      await Headline('Error 400: Bad Request').exists();
    });

    test('renders the expected error text', async () => {
      await Headline('Refresh the page. If the problem persists contact your administrator.').exists();
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


    test('renders the expected common error message', async () => {
      await Headline('Something went wrong.').exists();
    });

    test('renders the expected error text', async () => {
      await Headline('Refresh the page. If the problem persists contact your administrator.').exists();
    });
  });
});
