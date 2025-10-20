import { within } from '@folio/jest-config-stripes/testing-library/react';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import AcquisitionUnitPolicy from './AcquisitionUnitPolicy';
import { translationsProperties } from '../../../../../../test/jest/helpers';
import { useClaimPolicies } from '../../../../hooks';

// I'm not super happy I have to do this manually here... I wanted to have it so that "useClaimPolicies"
// could be manually mocked once in __mocks__ and we could profit off that everywhere
// But it's not currently working :(
// TODO figure out manual mocking of a single hook like this
jest.mock('../../../../hooks', () => {
  const actualHooks = jest.requireActual('../../../../hooks');

  const { claimPolicies } = jest.requireActual('../../../../../../test/jest/resources');
  const { policiesFlattener } = actualHooks;
  const mockUseClaimPolicies = jest.fn(() => ({
    flattenedPolicies: policiesFlattener(claimPolicies.claimPolicies),
    policies: claimPolicies
  }));

  return ({
    ...actualHooks,
    useClaimPolicies: mockUseClaimPolicies,
  });
});

const TestComponent = ({ typed, isSelected }) => {
  const { flattenedPolicies } = useClaimPolicies({});

  return (
    <AcquisitionUnitPolicy
      isSelected={isSelected}
      policy={flattenedPolicies[0]} // Just use the first of these for this test
      typed={typed}
    />
  );
};

let renderComponent;
describe('AcquisitionUnitPolicy', () => {
  describe.each([
    {
      typed: '',
      highlightsName: false,
      highlightsDescription: false,
    },
    {
      typed: 'nonsense',
      highlightsName: false,
      highlightsDescription: false,
    },
    {
      typed: '(member)',
      highlightsName: true,
      highlightsDescription: false,
    },
    {
      typed: 'create',
      highlightsName: true,
      highlightsDescription: true,
    },
    {
      typed: 'user',
      highlightsName: false,
      highlightsDescription: true,
    },
  ])('with "typed"=$typed', ({ typed, highlightsName, highlightsDescription }) => {
    beforeEach(() => {
      renderComponent = renderWithIntl(<TestComponent typed={typed} />, translationsProperties);
    });

    describe('containers', () => {
      let topContainer;
      beforeEach(() => {
        const { getByTestId } = renderComponent;
        topContainer = getByTestId('acquisition-unit-policy-container');
      });

      test('renders top container', () => {
        expect(topContainer).toBeInTheDocument();
      });

      describe.each(['name', 'description', 'restrictions'])('%s container', (containerName) => {
        let container;
        beforeEach(() => {
          container = within(topContainer).getByTestId(`acquisition-unit-policy-${containerName}`);
        });

        test(`renders ${containerName} container`, () => {
          expect(container).toBeInTheDocument();
        });
      });
    });

    test('renders name as expected', () => {
      const { getByTestId } = renderComponent;
      const container = getByTestId('acquisition-unit-policy-name');

      if (!highlightsName) {
        expect(within(container).getByText('Restrict create (member)')).toBeInTheDocument();
      } else if (typed === '(member)') {
        // Broken up into components
        // TODO I'd like to use the getByRole('mark') but it doesn't seem to work
        expect(within(container).getByText('Restrict create')).toBeInTheDocument();
        expect(within(container).getByText('(member)')).toBeInTheDocument();
      } else {
        expect(within(container).getByText('Restrict')).toBeInTheDocument();
        expect(within(container).getByText('create')).toBeInTheDocument();
        expect(within(container).getByText('(member)')).toBeInTheDocument();
      }
    });

    test('renders description as expected', () => {
      const { getByTestId } = renderComponent;
      const container = getByTestId('acquisition-unit-policy-description');

      if (!highlightsDescription) {
        expect(within(container).getByText('An acquisition unit restricting create, user is a member')).toBeInTheDocument();
      } else if (typed === 'create') {
        // Broken up into components
        expect(within(container).getByText('An acquisition unit restricting')).toBeInTheDocument();
        expect(within(container).getByText('create')).toBeInTheDocument();
        expect(within(container).getByText(', user is a member')).toBeInTheDocument();
      } else {
        expect(within(container).getByText('An acquisition unit restricting create,')).toBeInTheDocument();
        expect(within(container).getByText('user')).toBeInTheDocument();
        expect(within(container).getByText('is a member')).toBeInTheDocument();
      }
    });

    test('renders restrictions as expected', () => {
      const { getByTestId } = renderComponent;
      const container = getByTestId('acquisition-unit-policy-restrictions');

      expect(within(container).getByText('Create')).toBeInTheDocument();
    });
  });
});
