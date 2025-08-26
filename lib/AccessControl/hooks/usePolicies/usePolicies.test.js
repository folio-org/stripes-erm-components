import { useQuery } from 'react-query';

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
      },
      testTitle: 'without resourceId',
      expectedKyCall: '/wibble/undefined/policies',
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
        }
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
  ])('$testTitle', ({
    usePoliciesProps,
    expectedKyCall,
    expectedQueryNamespace,
    expectedQueryOpts
  }) => {
    beforeEach(() => {
      useQuery.mockClear();
      renderHook(() => usePolicies(usePoliciesProps));
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
  });
});
