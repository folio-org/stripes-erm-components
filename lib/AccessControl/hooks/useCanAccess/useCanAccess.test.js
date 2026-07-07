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
        restriction: READ,
        doAccessControl: true
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
        restriction: CREATE,
        doAccessControl: true
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
        restriction: UPDATE,
        doAccessControl: true
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
        queryNamespaceGenerator: () => ['I', 'am', 'a', 'silly', 'sausage'],
        doAccessControl: true
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
        },
        doAccessControl: true
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
    {
      testTitle: 'doAccessControl = false',
      useCanAccessProps: {
        resourceEndpoint: '/wibble',
        resourceId: '1234',
        restriction: READ,
        doAccessControl: false
      },
      canAccessReturn: {},
      expectedKyCall: undefined,
      expectedReturn: {
        canAccess: true,
        canAccessObj: {
          canRead: true,
          canCreate: true,
          canUpdate: true,
          canDelete: true,
          canApplyPolicies: true,
          canAll: true,
        }
      },
      expectedQueryNamespace: ['AccessControl', 'canAccess', 'read', '1234', '/wibble'],
      expectedQueryOpts: {},
      expectedEnabled: false
    },
  ])('$testTitle', ({
    canAccessReturn,
    useCanAccessProps,
    expectedKyCall,
    expectedQueryNamespace,
    expectedQueryOpts,
    expectedReturn,
    expectedEnabled = true
  }) => {
    beforeEach(() => {
      useQuery.mockClear();
      mockKy.mockClear();
      mockGetQueryReturn.mockImplementation((queryKey) => {
        if (queryKey?.[0] === 'AccessControl' && queryKey?.[1] === 'enabledEngines') {
          return { data: { ACQ_UNIT: true }, isLoading: false, isSuccess: true };
        }
        return { data: canAccessReturn, isLoading: false, isSuccess: true };
      });

      returnObj = renderHook(() => useCanAccess(useCanAccessProps))?.result;
    });

    test('made expected call', () => {
      if (expectedKyCall) {
        expect(mockKy).toHaveBeenCalledWith(expectedKyCall);
      } else {
        expect(mockKy).not.toHaveBeenCalled();
      }
    });

    test('has expected queryNamespace', () => {
      expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
        queryKey: expectedQueryNamespace
      }));
    });

    test('useQuery was called with the expected queryOptions', () => {
      expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
        ...expectedQueryOpts,
        enabled: expectedEnabled
      }));
    });

    test('return "canAccess" was as expected', () => {
      expect(returnObj.current).toEqual({
        ...expectedReturn,
        isLoading: false,
        isSuccess: true
      });
    });
  });
});
