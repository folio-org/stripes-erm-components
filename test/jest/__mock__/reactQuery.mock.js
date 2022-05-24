jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQuery: jest.fn()
}));
