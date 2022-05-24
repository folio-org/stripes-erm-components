jest.mock('@k-int/stripes-kint-components', () => {
  return {
    ...jest.requireActual('@k-int/stripes-kint-components'),
    useRefdata: jest.fn().mockReturnValue([])
  };
}, { virtual: true });
