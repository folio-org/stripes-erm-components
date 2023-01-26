// Make sure that all the mocked hooks other modules get to use from stripes-erm-components
// are utilised internally for tests too
import { mockErmComponents } from '@folio/stripes-erm-testing/jest/mocks';

// EXAMPLE mocking the hooks internally (Using the same mocks from the centralised repo)
const {
  useAsyncValidation,
  useBatchedFetch,
  useChunkedCQLFetch: mockUseChunkedCQLFetch, // Have to rename to satisfy jest rules about mocks starting with 'mock'
  useFileHandlers,
  useHandleSubmitSearch,
  useInfiniteFetch,
  useTags
} = mockErmComponents;

// EXAMPLE using a mock for other mocks
// Make sure any hooks we're not mocking, such as useChunkedUsers, have access to the mocked useChunkedCQLFetch
jest.mock('../useChunkedCQLFetch', () => mockUseChunkedCQLFetch);

module.exports = {
  // Make sure any non mocked hooks are used as is for now
  // (For example useChunkedUsers will end up with a mocked useChunkedCQL,
  // so does not need specific mocking)
  ...jest.requireActual('../'),
  useAsyncValidation,
  useBatchedFetch,
  useChunkedCQLFetch: mockUseChunkedCQLFetch,
  useFileHandlers,
  useHandleSubmitSearch,
  useInfiniteFetch,
  useTags
};
