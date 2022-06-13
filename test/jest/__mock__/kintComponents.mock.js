jest.mock('@k-int/stripes-kint-components', () => {
  return {
    ...jest.requireActual('@k-int/stripes-kint-components'),
    useRefdata: jest.fn().mockReturnValue([]),
    useCustomProperties: jest.fn(({
      returnQueryObject = false
    }) => {
      let returnShape = [];
      if (returnQueryObject) {
        returnShape = {};
      }

      return ({ data: returnShape, isLoading: false });
    }),
    CustomPropertiesView: jest.fn(() => (<div>CustomPropertiesView</div>)),
    CustomPropertiesFilter: jest.fn(() => (<div>CustomPropertiesFilter</div>)),
    CustomPropertiesEdit: jest.fn(() => (<div>CustomPropertiesEdit</div>)),
    CustomPropertiesConfig: jest.fn(() => (<div>CustomPropertiesConfig</div>)),
    CustomPropertyCard: jest.fn(() => (<div>CustomPropertyCard</div>)),
  };
}, { virtual: true });
