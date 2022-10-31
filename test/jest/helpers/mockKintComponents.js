import { useState } from 'react';

const mockKintComponents = {
  useIntlKeyStore:() => () => null,
  useRefdata: jest.fn().mockReturnValue([]),
  useQIndex: jest.fn(() => {
    return useState();
  }),
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
