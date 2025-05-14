import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  Button as MockButton,
  KeyValue as MockKeyValue
} from '@folio/stripes/components';

import {
  Badge,
  Button,
  IconButton,
  KeyValue,
  renderWithIntl
} from '@folio/stripes-erm-testing';

import { useTagsEnabled } from '@k-int/stripes-kint-components';

import { translationsProperties } from '../../../test/jest/helpers';

import useErmHelperApp from './useErmHelperApp';

const mockToggleTags = jest.fn();
const mockIsOpen = jest.fn();

jest.unmock('@k-int/stripes-kint-components');
// EXAMPLE one off mocking of just these two components
jest.mock('@k-int/stripes-kint-components', () => ({
  useHelperApp: jest.fn(() => ({
    HelperComponent: () => <div>HelperComponent</div>,
    helperToggleFunctions: { tags: mockToggleTags },
    isOpen: mockIsOpen
  })),
  useTagsEnabled: jest.fn(() => true)
}));

const mockOnClick = jest.fn();


const TestComponent = ({
  entity = {
    tags: [
      { id: 1, normValue: 'one', value: 'One' },
      { id: 2, normValue: 'two', value: 'Two' },
    ]
  },
  onClick = mockOnClick
}) => {
  const { handleToggleTags, HelperComponent, TagButton, isOpen } = useErmHelperApp();

  return (
    <>
      <MockKeyValue label="isOpen" value={isOpen().toString()} />
      <HelperComponent />
      <TagButton entity={entity} onClick={onClick} />
      <MockButton onClick={handleToggleTags}>Toggle tags</MockButton>
    </>
  );
};

let renderComponent;
describe('useErmHelperApp', () => {
  describe.each([
    {
      isOpen: false,
    },
    {
      isOpen: true,
    }
  ])('isOpen: $isOpen', ({ isOpen }) => {
    describe.each([
      {
        tagsEnabled: false
      },
      {
        tagsEnabled: true
      }
    ])('useTagsEnabled: $tagsEnabled', ({ tagsEnabled }) => {
      beforeEach(() => {
        // Deal with all the mocks for each case
        mockIsOpen.mockImplementation(() => isOpen);
        useTagsEnabled.mockImplementation(() => tagsEnabled);

        // This is handled below
        // mockToggleTags.mockClear();

        renderComponent = renderWithIntl(
          <TestComponent />,
          translationsProperties
        );
      });

      test(`should start with isOpen=${isOpen}`, async () => {
        await waitFor(async () => {
          await KeyValue('isOpen').has({ value: isOpen.toString() });
        });
      });

      test('should render HelperComponent from kint-components', async () => {
        const { getByText } = renderComponent;
        await waitFor(() => {
          expect(getByText('HelperComponent')).toBeInTheDocument();
        });
      });

      test(`should ${tagsEnabled ? '' : 'not'} render TagButton`, async () => {
        // This only works because there's only one IconButton.
        await waitFor(async () => {
          if (tagsEnabled) {
            await IconButton().exists();
          } else {
            await IconButton().absent();
          }
        });
      });

      test(`should ${tagsEnabled ? 'render expected' : 'not render a'} tag count`, async () => {
        // This only works because there's only one IconButton.
        await waitFor(async () => {
          if (tagsEnabled) {
            await Badge().has({ value: '2' });
          } else {
            await Badge().absent();
          }
        });
      });

      if (tagsEnabled) {
        describe('clicking TagButton', () => {
          beforeEach(async () => {
            // Clear mockToggleTags so we can verify if it was called here or not
            mockToggleTags.mockClear();
            mockOnClick.mockClear();

            await waitFor(async () => {
              await IconButton().click();
            });
          });

          test('handleToggleTags was called', async () => {
            await waitFor(() => {
              expect(mockToggleTags).toHaveBeenCalled();
            });
          });

          test('TagButton onClick was called with expected value', async () => {
            await waitFor(() => {
              expect(mockOnClick).toHaveBeenCalledWith({ open: isOpen });
            });
          });
        });
      }

      test('should render handleToggleTagsButton', async () => {
        await waitFor(async () => {
          await Button('Toggle tags').exists();
        });
      });

      describe('clicking handleToggleTags button', () => {
        beforeEach(async () => {
          // Clear mockToggleTags so we can verify if it was called here or not
          mockToggleTags.mockClear();

          await waitFor(async () => {
            await Button('Toggle tags').click();
          });
        });

        test(`handleToggleTags was ${tagsEnabled ? '' : 'not'} called`, async () => {
          await waitFor(() => {
            if (tagsEnabled) {
              expect(mockToggleTags).toHaveBeenCalled();
            } else {
              expect(mockToggleTags).not.toHaveBeenCalled();
            }
          });
        });
      });
    });
  });

  describe('Special cases for coverage', () => {
    beforeEach(() => {
      // Ensure we're back to tags enabled
      useTagsEnabled.mockImplementation(() => true);
    });

    describe('rendering with no tag array', () => {
      beforeEach(() => {
        renderComponent = renderWithIntl(
          <TestComponent entity={null} />,
          translationsProperties
        );
      });

      test('badge renders 0 tags', async () => {
        await waitFor(async () => {
          await Badge().has({ value: '0' });
        });
      });
    });

    describe('rendering with no onClick in tagsButton', () => {
      beforeEach(() => {
        renderComponent = renderWithIntl(
          <TestComponent onClick={undefined} />,
          translationsProperties
        );
      });

      describe('clicking the TagsButton', () => {
        beforeEach(async () => {
          await waitFor(async () => {
            await IconButton().click();
          });
        });

        test('component does not error thanks to fallback', async () => {
          await waitFor(async () => {
            await IconButton().exists(); // Not convinced this properly tests the case but it'll do
          });
        });
      });
    });
  });
});
