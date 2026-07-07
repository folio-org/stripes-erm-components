import { useQuery, mockGetQueryReturn } from 'react-query';

import { renderHook } from '@folio/jest-config-stripes/testing-library/react';

// EXAMPLE import just the mockKy jest fn to change implementation and inspect called values
import { mockKy } from '@folio/stripes/core';

import usePolicies from './usePolicies';

describe('usePolicies', () => {
  describe.each([
    {
      usePoliciesProps: {
        resourceEndpoint: '/wibble',
        resourceId: '123',
        doAccessControl: true,
      },
      testTitle: 'basic use',
      expectedKyCall: '/wibble/123/policies',
      expectedQueryNamespace: ['AccessControl', '123', 'policies', '/wibble'],
      expectedQueryOpts: {
        enabled: true,
      }
    },
    {
      usePoliciesProps: {
        resourceEndpoint: '/wibble',
        doAccessControl: true,
      },
      testTitle: 'without resourceId',
      expectedKyCall: undefined,
      expectedQueryNamespace: ['AccessControl', undefined, 'policies', '/wibble'],
      expectedQueryOpts: {
        enabled: false,
      }
    },
    {
      usePoliciesProps: {
        queryNamespaceGenerator: () => ['I', 'am', 'a', 'silly', 'sausage'],
        resourceEndpoint: '/wibble',
        resourceId: '123',
        doAccessControl: true,
      },
      testTitle: 'with queryNamespaceGenerator',
      expectedKyCall: '/wibble/123/policies',
      expectedQueryNamespace: ['I', 'am', 'a', 'silly', 'sausage'],
      expectedQueryOpts: {
        enabled: true,
      }
    },
    {
      usePoliciesProps: {
        resourceEndpoint: '/wibble',
        resourceId: '123',
        queryOptions: {
          retryDelay: 6000,
          refetchInterval: 1000,
        },
        doAccessControl: true,
      },
      testTitle: 'with queryOptions',
      expectedKyCall: '/wibble/123/policies',
      expectedQueryNamespace: ['AccessControl', '123', 'policies', '/wibble'],
      expectedQueryOpts: {
        enabled: true,
        retryDelay: 6000,
        refetchInterval: 1000,
      }
    },
    {
      usePoliciesProps: {
        resourceEndpoint: '/wibble',
        resourceId: '123',
        doAccessControl: false,
      },
      testTitle: 'doAccessControl = false',
      expectedKyCall: undefined,
      expectedQueryNamespace: ['AccessControl', '123', 'policies', '/wibble'],
      expectedQueryOpts: {
        enabled: false,
      }
    },
  ])('$testTitle', ({
    usePoliciesProps,
    expectedKyCall,
    expectedQueryNamespace,
    expectedQueryOpts
  }) => {
    beforeEach(() => {
      useQuery.mockClear();
      mockKy.mockClear();
      mockGetQueryReturn.mockImplementation((queryKey) => {
        if (queryKey?.[0] === 'AccessControl' && queryKey?.[1] === 'enabledEngines') {
          return { data: { ACQ_UNIT: true } };
        }
        return { data: [] };
      });

      renderHook(() => usePolicies(usePoliciesProps));
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
      expect(useQuery).toHaveBeenCalledWith(expect.objectContaining(expectedQueryOpts));
    });
  });
});
