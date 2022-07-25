const mockKintComponents = {
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
};

export default mockKintComponents;
