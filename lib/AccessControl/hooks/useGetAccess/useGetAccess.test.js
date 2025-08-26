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

let returnObj;
describe('useGetAccess', () => {
  beforeEach(() => {
    useCanAccess.mockClear();
    useCanAccess.mockImplementation(mockUseCanAccess);

    returnObj = renderHook(() => useGetAccess({
      queryNamespaceGenerator,
      resourceEndpoint: '/wibble',
      resourceId: '123',
      restrictions: [READ, UPDATE]
    }))?.result;
  });

  test('useCanAccess called the correct number of times', () => {
    expect(useCanAccess).toHaveBeenCalledTimes(5);
  });

  let mockCall;
  describe.each([
    {
      restriction: UPDATE,
      expectedQueryOptions: { enabled: true },
      expectedQueryNamespace: ['update', 'canUpdate'],
      callIndex: 0
    },
    {
      restriction: CREATE,
      expectedQueryOptions: { enabled: false },
      expectedQueryNamespace: ['create', 'canCreate'],
      callIndex: 1
    },
    {
      restriction: APPLY_POLICIES,
      expectedQueryOptions: { enabled: false },
      expectedQueryNamespace: ['apply_policies', 'canApplyPolicies'],
      callIndex: 2
    },
    {
      restriction: READ,
      expectedQueryOptions: { enabled: true },
      expectedQueryNamespace: ['read', 'canRead'],
      callIndex: 3
    },
    {
      restriction: DELETE,
      expectedQueryOptions: { enabled: false },
      expectedQueryNamespace: ['delete', 'canDelete'],
      callIndex: 4
    }
  ])('useGetAccess $restriction', ({
    callIndex,
    expectedQueryNamespace,
    expectedQueryOptions,
  }) => {
    beforeEach(() => {
      mockCall = useCanAccess.mock.calls[callIndex][0];
    });

    test('queryOptions are as expected', () => {
      expect(mockCall).toHaveProperty('queryOptions', expectedQueryOptions);
    });

    test('queryNamespaceGenerator returns expected namespace', () => {
      const queryNamespace = mockCall.queryNamespaceGenerator();
      expect(queryNamespace).toEqual(expectedQueryNamespace);
    });
  });
});
