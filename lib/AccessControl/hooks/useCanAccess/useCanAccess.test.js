// EXAMPLE importing mockGetQueryReturn to allow for usual useQuery mock while tweaking data return
import { useQuery, mockGetQueryReturn } from 'react-query';
import { renderHook } from '@folio/jest-config-stripes/testing-library/react';

// EXAMPLE import just the mockKy jest fn to change implementation and inspect called values
import { mockKy } from '@folio/stripes/core';

import { CREATE, READ, UPDATE } from '../../constants';
import useCanAccess from './useCanAccess';

let returnObj;
describe('useCanAccess', () => {
  describe.each([
    {
      testTitle: 'basic use',
      useCanAccessProps: {
        resourceEndpoint: '/wibble',
        resourceId: '1234',
        restriction: READ
      },
      canAccessReturn: { canRead: true },
      expectedKyCall: '/wibble/1234/canRead',
      expectedReturn: { canAccess: true, canAccessObj: { canRead: true } },
      expectedQueryNamespace: ['AccessControl', 'canAccess', 'read', '1234', '/wibble'],
      expectedQueryOpts: {}
    },
    {
      testTitle: 'restriction CREATE',
      useCanAccessProps: {
        resourceEndpoint: '/wibble',
        restriction: CREATE
      },
      canAccessReturn: { canCreate: true },
      expectedKyCall: '/wibble/canCreate',
      expectedReturn: { canAccess: true, canAccessObj: { canCreate: true } },
      expectedQueryNamespace: ['AccessControl', 'canAccess', 'create', undefined, '/wibble'],
      expectedQueryOpts: {}
    },
    {
      testTitle: 'restriction cannot update',
      useCanAccessProps: {
        resourceEndpoint: '/wibble',
        resourceId: '1234',
        restriction: UPDATE
      },
      canAccessReturn: { canUpdate: false },
      expectedKyCall: '/wibble/1234/canUpdate',
      expectedReturn: { canAccess: false, canAccessObj: { canUpdate: false } },
      expectedQueryNamespace: ['AccessControl', 'canAccess', 'update', '1234', '/wibble'],
      expectedQueryOpts: {}
    },
    {
      testTitle: 'with queryNamespaceGenerator',
      useCanAccessProps: {
        resourceEndpoint: '/wibble',
        resourceId: '1234',
        restriction: READ,
        queryNamespaceGenerator: () => ['I', 'am', 'a', 'silly', 'sausage']
      },
      canAccessReturn: { canRead: true },
      expectedKyCall: '/wibble/1234/canRead',
      expectedReturn: { canAccess: true, canAccessObj: { canRead: true } },
      expectedQueryNamespace: ['I', 'am', 'a', 'silly', 'sausage'],
      expectedQueryOpts: {}
    },
    {
      testTitle: 'with queryOptions',
      useCanAccessProps: {
        resourceEndpoint: '/wibble',
        resourceId: '1234',
        restriction: READ,
        queryOptions: {
          retryDelay: 6000,
          refetchInterval: 1000,
        }
      },
      canAccessReturn: { canRead: true },
      expectedKyCall: '/wibble/1234/canRead',
      expectedReturn: { canAccess: true, canAccessObj: { canRead: true } },
      expectedQueryNamespace: ['AccessControl', 'canAccess', 'read', '1234', '/wibble'],
      expectedQueryOpts: {
        retryDelay: 6000,
        refetchInterval: 1000,
      }
    },
  ])('$testTitle', ({
    canAccessReturn,
    useCanAccessProps,
    expectedKyCall,
    expectedQueryNamespace,
    expectedQueryOpts,
    expectedReturn
  }) => {
    beforeEach(() => {
      useQuery.mockClear();
      mockKy.mockClear();
      mockGetQueryReturn.mockClear();
      mockGetQueryReturn.mockImplementation(() => ({ data: canAccessReturn }));

      returnObj = renderHook(() => useCanAccess(useCanAccessProps))?.result;
    });

    test('made expected call', () => {
      expect(mockKy).toHaveBeenCalledWith(expectedKyCall);
    });

    test('has expected queryNamespace', () => {
      expect(useQuery.mock.calls[0][0]).toEqual(expectedQueryNamespace);
    });

    test('useQuery was called with the expected queryOptions', () => {
      expect(useQuery.mock.calls[0][2]).toEqual(expectedQueryOpts);
    });

    test('useQuery was called with the expected queryOptions', () => {
      expect(useQuery.mock.calls[0][2]).toEqual(expectedQueryOpts);
    });

    test('return "canAccess" was as expected', () => {
      expect(returnObj.current).toEqual(expectedReturn);
    });
  });
});
