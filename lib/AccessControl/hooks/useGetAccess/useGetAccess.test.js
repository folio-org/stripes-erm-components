import { renderHook } from '@folio/jest-config-stripes/testing-library/react';

import useCanAccess from '../useCanAccess';
import useGetAccess from './useGetAccess';
import { APPLY_POLICIES, CREATE, DELETE, READ, UPDATE } from '../../constants';


jest.mock('../useCanAccess', () => jest.fn());

const queryNamespaceGenerator = (rest, access) => [rest, access];

const mockUseCanAccess = jest.fn((incomingProps) => {
  return ({
    canAccess: true,
    isLoading: false,
    ...incomingProps
  });
});

describe('useGetAccess', () => {
  beforeEach(() => {
    useCanAccess.mockClear();
    useCanAccess.mockImplementation(mockUseCanAccess);

    renderHook(() => useGetAccess({
      queryNamespaceGenerator,
      resourceEndpoint: '/wibble',
      resourceId: '123',
    }))?.result;
  });

  test('useCanAccess called the correct number of times', () => {
    expect(useCanAccess).toHaveBeenCalledTimes(1);
  });

  let mockCall;
  describe.each([
    {
      restriction: UPDATE,
    },
    {
      restriction: CREATE,
    },
    {
      restriction: APPLY_POLICIES,
    },
    {
      restriction: READ,
    },
    {
      restriction: DELETE,
    }
  ])('useGetAccess $restriction', () => {
    beforeEach(() => {
      mockCall = useCanAccess.mock.calls[0][0];
    });

    test('queryNamespaceGenerator returns expected namespace', () => {
      const queryNamespace = mockCall.queryNamespaceGenerator();
      expect(queryNamespace).toEqual(['ALL', 'canAll']);
    });
  });
});
