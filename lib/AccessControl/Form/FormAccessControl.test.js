import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  Button as MockButton,
  List as MockList,
} from '@folio/stripes/components';

import {
  Accordion,
  Badge,
  Button,
  List,
  ListItem,
  renderWithIntl,
  Spinner,
  TestForm
} from '@folio/stripes-erm-testing';

import { useDoAccessControl } from '../hooks';
import FormAccessControl from './FormAccessControl';

import { translationsProperties } from '../../../test/jest/helpers';


jest.mock('../hooks/useDoAccessControl', () => jest.fn(() => ({
  doAccessControl: true,
  enabledEnginesQuery: {
    isLoading: false
  }
})));

// We should no longer need to mock icons -- needed for Spinner check
jest.unmock('@folio/stripes-components');

// Ensure we have the centralised claim policies
jest.mock('../hooks/useClaimPolicies');


// Mock PolicyTypedown, we don't need the full component here
jest.mock('./PolicyTypedown', () => {
  // Mock the PolicyTypedown with the ability to select policies and see if they're selected
  const MockPolicyTypedown = ({ input: { onChange } = {}, isSelected, policies }) => {
    return (
      <>
        <div>
          PolicyTypedown
        </div>
        {policies.map((policy) => {
          return (
            <>
              <MockButton onClick={() => onChange(policy)}>
                {policy.policy.name}
              </MockButton>
              { isSelected(null, policy) &&
                <div>
                  IS SELECTED
                </div>
              }
            </>
          );
        })}
      </>
    );
  };

  return ({
    PolicyTypedown: MockPolicyTypedown
  });
});

jest.mock('../View', () => {
  // Mock the PoliciesTable to return JUST a list of selected policy names
  const MockPoliciesTable = ({ policies }) => {
    return (
      <>
        <div>
          PoliciesTable
        </div>
        <MockList
          itemFormatter={(item) => (<li>{item}</li>)}
          items={policies?.map(p => p.policy.name) ?? []}
        />
      </>
    );
  };

  return ({
    PoliciesTable: MockPoliciesTable
  });
});

const onSubmit = jest.fn();
const onToggle = jest.fn();

// We do a lot of rendering of FormAccessControl with varying props. Let's cut down on repetition
const renderWithProps = (props) => {
  return renderWithIntl(
    <TestForm onSubmit={onSubmit}>
      <FormAccessControl {...props} />
    </TestForm>,
    translationsProperties
  );
};


let renderComponent;
describe('FormAccessControl', () => {
  describe('pre render catches', () => {
    describe('when disabled', () => {
      beforeEach(() => {
        renderWithProps({ disabled: true });
      });

      test('does not render Accordion', async () => {
        await Accordion().absent();
      });
    });

    describe('when doAccessControl is false', () => {
      beforeEach(() => {
        useDoAccessControl.mockImplementationOnce(() => ({
          doAccessControl: false,
          enabledEnginesQuery: {
            isLoading: false
          }
        }));
        renderWithProps();
      });

      test('does not render Accordion', async () => {
        await Accordion().absent();
      });
    });

    describe('when isLoading is true', () => {
      beforeEach(() => {
        renderWithProps({ isLoading: true });
      });

      test('does not render Accordion', async () => {
        await Accordion().absent();
      });

      test('renders Spinner', async () => {
        await Spinner().exists();
      });
    });

    describe('when enabledEngines is loading', () => {
      beforeEach(() => {
        useDoAccessControl.mockImplementationOnce(() => ({
          doAccessControl: true,
          enabledEnginesQuery: {
            isLoading: true
          }
        }));

        renderWithProps();
      });

      test('does not render Accordion', async () => {
        await Accordion().absent();
      });

      test('renders Spinner', async () => {
        await Spinner().exists();
      });
    });
  });

  describe('accordion props', () => {
    describe.each([true, false])('open: %s prop works as expected', (openProp) => {
      beforeEach(() => {
        renderWithProps({ onToggle, open: openProp });
      });

      test(`renders an ${openProp ? 'open' : 'closed'} Accordion`, async () => {
        await Accordion('Acquisition units').has({ open: openProp });
      });

      test('renders a Badge', async () => {
        await Badge().exists();
      });

      describe('clicking the accordion', () => {
        beforeEach(async () => {
          onToggle.mockClear();
          await waitFor(async () => {
            await Accordion().clickHeader();
          });
        });

        test('expect onToggle to have been called', async () => {
          await waitFor(() => {
            expect(onToggle).toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe('functionality', () => {
    beforeEach(() => {
      renderComponent = renderWithProps();
    });

    test('renders the PolicyTypedown', () => {
      const { getByText } = renderComponent;

      expect(getByText('PolicyTypedown')).toBeInTheDocument();
    });

    test('renders the PolicyTable', () => {
      const { getByText } = renderComponent;

      expect(getByText('PoliciesTable')).toBeInTheDocument();
    });

    test('PolicyTable includes no items', async () => {
      await List().has({ count: 0 });
    });

    describe('selecting a policy', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Restrict update (member)').click();
        });
      });

      test('PolicyTable includes one item', async () => {
        await List().has({ count: 1 });
      });

      test('PolicyTable includes the correct item', async () => {
        await ListItem('Restrict update (member)').exists();
      });

      describe('selecting a second policy', () => {
        beforeEach(async () => {
          await waitFor(async () => {
            await Button('Restrict delete (member)').click();
          });
        });

        test('PolicyTable includes two items', async () => {
          await List().has({ count: 2 });
        });

        test('PolicyTable includes the first item', async () => {
          await ListItem('Restrict update (member)').exists();
        });

        test('PolicyTable includes the second item', async () => {
          await ListItem('Restrict delete (member)').exists();
        });

        describe('reselecting the first policy', () => {
          beforeEach(async () => {
            await waitFor(async () => {
              await Button('Restrict update (member)').click();
            });
          });

          test('PolicyTable includes one items', async () => {
            await List().has({ count: 1 });
          });

          test('PolicyTable does not include the first item', async () => {
            await ListItem('Restrict update (member)').absent();
          });

          test('PolicyTable includes the second item', async () => {
            await ListItem('Restrict delete (member)').exists();
          });
        });
      });
    });
  });
  // TODO only thing left to test here is the removal and
  //  reinsertion of policies which have an id.
});
