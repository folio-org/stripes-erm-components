const editOrgCardInitialValues = {
  orgs: [{
    'id': '90adb7bb-4e9e-4cae-8e52-97c672ae6ddc',
    'primaryOrg': false,
    'org': {
      'id': 'ac8deee6-bfa8-4b3a-a463-b4970eca2ddd',
      'orgsUuid': '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1',
      'name': 'Alexander Street Press',
      'orgsUuid_object': {
        'id': '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1',
        'name': 'Alexander Street Press',
        'code': 'ALEXS',
        'description': 'AV streaming services',
        'exportToAccounting': false,
        'status': 'Active',
        'organizationTypes': '[]',
        'language': 'en-us',
        'aliases': '[{…}]',
        'addresses': '[{…}]',
        'phoneNumbers': '[{…}]',
        'emails': '[{…}]',
        'urls': '[{…}]',
        'contacts': '["11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1"]',
        'agreements': '[{…}]',
        'erpCode': 'G64758-74828',
        'paymentMethod': 'Physical Check',
        'accessProvider': true,
        'governmental': false,
        'licensor': true,
        'materialSupplier': true,
        'vendorCurrencies': '["USD"]',
        'claimingInterval': 0,
        'discountPercent': 0,
        'expectedActivationInterval': 1,
        'expectedInvoiceInterval': 30,
        'renewalActivationInterval': 365,
        'subscriptionInterval': 365,
        'expectedReceiptInterval': 30,
        'taxId': '',
        'liableForVat': false,
        'taxPercentage': 0,
        'interfaces': '["14e81009-0f98-45a0-b8e6-e25547beb22f"]',
        'accounts': '[{…}]',
        'isVendor': true,
        'sanCode': '1234567',
        'changelogs': '[{…}]',
        'acqUnitIds': '[]',
        'metadata': '{createdDate: "2022-07-03T13:50:54.107+00:00", upda…}'
      }
    },
    'owner': {
      'id': 'b2b22ff4-d68c-4fd8-aa60-04746da274b1'
    },
    'roles': [{
      'id': 'b673e03a-1347-41d3-9731-d8d8676151c2',
      'owner': {
        'id': '90adb7bb-4e9e-4cae-8e52-97c672ae6ddc'
      },
      'role': {
        'id': '2c91809c81c44d340181c4548db50023',
        'value': 'content_provider',
        'label': 'Content provider'
      },
      'note': 'This is note'
    }],
    'note': 'testing organization'
  }]
};

const editOrgCardProps = {
  'id': 'orgs-0',
  'onDelete': jest.fn(),
  'onUpdate': jest.fn(),
  'organization': {
    'id': '90adb7bb-4e9e-4cae-8e52-97c672ae6ddc',
    'primaryOrg': false,
    'org': {
      'id': 'ac8deee6-bfa8-4b3a-a463-b4970eca2ddd',
      'orgsUuid': '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1',
      'name': 'Alexander Street Press',
      'orgsUuid_object': {
        'id': '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1',
        'name': 'Alexander Street Press',
        'code': 'ALEXS',
        'description': 'AV streaming services',
        'exportToAccounting': false,
        'status': 'Active',
        'organizationTypes': '[]',
        'language': 'en-us',
        'aliases': '[{…}]',
        'addresses': '[{…}]',
        'phoneNumbers': '[{…}]',
        'emails': '[{…}]',
        'urls': '[{…}]',
        'contacts': '["11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1"]',
        'agreements': '[{…}]',
        'erpCode': 'G64758-74828',
        'paymentMethod': 'Physical Check',
        'accessProvider': true,
        'governmental': false,
        'licensor': true,
        'materialSupplier': true,
        'vendorCurrencies': '["USD"]',
        'claimingInterval': 0,
        'discountPercent': 0,
        'expectedActivationInterval': 1,
        'expectedInvoiceInterval': 30,
        'renewalActivationInterval': 365,
        'subscriptionInterval': 365,
        'expectedReceiptInterval': 30,
        'taxId': '',
        'liableForVat': false,
        'taxPercentage': 0,
        'interfaces': '["14e81009-0f98-45a0-b8e6-e25547beb22f"]',
        'accounts': '[{…}]',
        'isVendor': true,
        'sanCode': '1234567',
        'changelogs': '[{…}]',
        'acqUnitIds': '[]',
        'metadata': '{createdDate: "2022-07-03T13:50:54.107+00:00", upda…}'
      }
    },
    'owner': {
      'id': 'b2b22ff4-d68c-4fd8-aa60-04746da274b1'
    },
    'roles': [{
      'id': 'b673e03a-1347-41d3-9731-d8d8676151c2',
      'owner': '{id: "90adb7bb-4e9e-4cae-8e52-97c672ae6ddc"}',
      'role': {
        'id': '2c91809c81c44d340181c4548db50023',
        'value': 'content_provider',
        'label': 'Content provider'
      },
      'note': 'This is note'
    }],
    'note': 'testing organization'
  },
  'orgsKey': 'orgs',
  'roleValues': [{
    'value': '2c91809c81c44d340181c4548db50023',
    'label': 'Content provider'
  }]
};

const filledInitialValues = {
  'orgs': [{
    'id': '61cdd696-1cef-4a16-b2a3-1078302e706b',
    'primaryOrg': false,
    'org': {
      'id': 'e9b29651-90cf-4436-98a2-d485ab9291b5',
      'orgsUuid': '50fb6ae0-cdf1-11e8-a8d5-f2801f1b9fd1',
      'name': 'EBSCO SUBSCRIPTION SERVICES',
      'orgsUuid_object': {
        'id': '50fb6ae0-cdf1-11e8-a8d5-f2801f1b9fd1',
        'name': 'EBSCO SUBSCRIPTION SERVICES',
        'code': 'SREBSCO',
        'description': 'Use for single title subscriptions.',
        'exportToAccounting': false,
        'status': 'Active',
        'organizationTypes': '[]',
        'language': 'en-us',
        'aliases': '[{…}]',
        'addresses': '[{…}]',
        'phoneNumbers': '[{…}]',
        'emails': '[{…}]',
        'urls': '[{…}]',
        'contacts': '["50fb6ae0-cdf1-11e8-a8d5-f2801f1b9fd1"]',
        'agreements': '[{…}]',
        'erpCode': 'G64758-74837',
        'paymentMethod': 'EFT',
        'accessProvider': false,
        'governmental': false,
        'licensor': false,
        'materialSupplier': false,
        'vendorCurrencies': '["USD"]',
        'claimingInterval': 60,
        'discountPercent': 10,
        'expectedActivationInterval': 0,
        'expectedInvoiceInterval': 30,
        'renewalActivationInterval': 0,
        'subscriptionInterval': 0,
        'expectedReceiptInterval': 30,
        'taxId': '',
        'liableForVat': false,
        'taxPercentage': 0,
        'edi': '{ediFtp: {…}, ediJob: {…}, ediNamingConvention: "*.…}',
        'interfaces': '["ddfd8661-896d-4ffc-be57-d0f466cb790b"]',
        'accounts': '[{…}]',
        'isVendor': true,
        'sanCode': '1234567',
        'changelogs': '[{…}]',
        'acqUnitIds': '[]',
        'metadata': '{createdDate: "2022-06-29T13:49:49.330+00:00", upda…}'
      }
    },
    'owner': {
      'id': '19e4240d-1da4-4c3b-8ec6-af3d65b56033'
    },
    'roles': [{
      'id': '8b0b2b9f-6559-4da4-99f1-459aa99ec4f5',
      'owner': '{id: "61cdd696-1cef-4a16-b2a3-1078302e706b"}',
      'role': {
        'id': '2c91809c81afb3270181afba186d001f',
        'value': 'content_provider',
        'label': 'Content provider'
      },
      'note': 'Note for the EBSCO organization.'
    }],
    'note': 'This is a test note.'
  }]
};

const orgFieldArrayProps = {
  'addOrganizationBtnLabel': 'Add organization',
  'isEmptyMessage': '<Memo />',
  'roles': [{
    'id': '2c91809c81afb3270181afba186d001f',
    'value': 'content_provider',
    'label': 'Content provider'
  }],
  'uniqueRole': 'vendor'
};

const emptyOrgFieldArrayProps = {
  'addOrganizationBtnLabel': 'Add organization',
  'isEmptyMessage': 'No organizations for this agreement',
  'roles': [{
    'id': '8b0b2b9f-6559-4da4-99f1-459aa99ec4f5',
    'owner': '{id: "61cdd696-1cef-4a16-b2a3-1078302e706b"}',
    'role': {
      'id': '2c91809c81afb3270181afba186d001f',
      'value': 'content_provider',
      'label': 'Content provider'
    },
    'note': 'Note for the EBSCO organization.'
  }],
  'uniqueRole': 'vendor',
  'items': [],
  'name': 'orgs',
  'onAddField': jest.fn(),
  'onDeleteField': jest.fn(),
  'onMarkForDeletion': jest.fn(),
  'onPrependField': jest.fn(),
  'onReplaceField': jest.fn(),
  'onUpdateField': jest.fn()
};

const uncheckedFieldPrimaryOrgProps = {
  'fieldIndex': 0,
  'fieldPrefix': 'orgs[0]',
  'fields': {
    'name': 'orgs',
    'forEach': jest.fn(),
    'length': 1,
    'map': jest.fn(),
    'setFieldData': jest.fn(),
    'insert': jest.fn(),
    'concat': jest.fn(),
    'move': jest.fn(),
    'pop': jest.fn(),
    'push': jest.fn(),
    'remove': jest.fn(),
    'removeBatch': jest.fn(),
    'shift': jest.fn(),
    'swap': jest.fn(),
    'unshift': jest.fn(),
    'update': jest.fn(),
    'value': [{
      'id': '90adb7bb-4e9e-4cae-8e52-97c672ae6ddc',
      'primaryOrg': false,
      'org': {
        'id': 'ac8deee6-bfa8-4b3a-a463-b4970eca2ddd',
        'orgsUuid': '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1',
        'name': 'Alexander Street Press',
        'orgsUuid_object': {
          'id': '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1',
          'name': 'Alexander Street Press',
          'code': 'ALEXS',
          'description': 'AV streaming services',
          'exportToAccounting': false,
          'status': 'Active',
          'organizationTypes': '[]',
          'language': 'en-us',
          'aliases': '[{…}]',
          'addresses': '[{…}]',
          'phoneNumbers': '[{…}]',
          'emails': '[{…}]',
          'urls': '[{…}]',
          'contacts': '["11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1"]',
          'agreements': '[{…}]',
          'erpCode': 'G64758-74828',
          'paymentMethod': 'Physical Check',
          'accessProvider': true,
          'governmental': false,
          'licensor': true,
          'materialSupplier': true,
          'vendorCurrencies': '["USD"]',
          'claimingInterval': 0,
          'discountPercent': 0,
          'expectedActivationInterval': 1,
          'expectedInvoiceInterval': 30,
          'renewalActivationInterval': 365,
          'subscriptionInterval': 365,
          'expectedReceiptInterval': 30,
          'taxId': '',
          'liableForVat': false,
          'taxPercentage': 0,
          'interfaces': '["14e81009-0f98-45a0-b8e6-e25547beb22f"]',
          'accounts': '[{…}]',
          'isVendor': true,
          'sanCode': '1234567',
          'changelogs': '[{…}]',
          'acqUnitIds': '[]',
          'metadata': '{createdDate: "2022-07-03T13:50:54.107+00:00", upda…}'
        }
      },
      'owner': {
        'id': 'b2b22ff4-d68c-4fd8-aa60-04746da274b1'
      },
      'roles': [{
        'id': 'b673e03a-1347-41d3-9731-d8d8676151c2',
        'owner': '{id: "90adb7bb-4e9e-4cae-8e52-97c672ae6ddc"}',
        'role': '{id: "2c91809c81c44d340181c4548db50023", label: "Co…}',
        'note': 'This is note'
      }],
      'note': 'testing organization'
    }]
  },
  'input': {
    'name': 'orgs[0]',
    'value': {
      'id': '90adb7bb-4e9e-4cae-8e52-97c672ae6ddc',
      'primaryOrg': false,
      'org': {
        'id': 'ac8deee6-bfa8-4b3a-a463-b4970eca2ddd',
        'orgsUuid': '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1',
        'name': 'Alexander Street Press',
        'orgsUuid_object': '{accessProvider: true, accounts: Array(1), acqUnitI…}'
      },
      'owner': {
        'id': 'b2b22ff4-d68c-4fd8-aa60-04746da274b1'
      },
      'roles': [
        '{id: "b673e03a-1347-41d3-9731-d8d8676151c2", note: …}'
      ],
      'note': 'testing organization'
    },
    'onBlur': jest.fn(),
    'onChange': jest.fn(),
    'onFocus': jest.fn()
  },
  'labelClass': 'labelClass---zpBYt',
  'labelId': 'stripes-erm-components.organizations.setAsPrimary'
};

const checkedFieldPrimaryOrgProps = {
  'fieldIndex': 0,
  'fieldPrefix': 'orgs[0]',
  'fields': {
    'name': 'orgs',
    'forEach': jest.fn(),
    'length': 1,
    'map': jest.fn(),
    'setFieldData': jest.fn(),
    'insert': jest.fn(),
    'concat': jest.fn(),
    'move': jest.fn(),
    'pop': jest.fn(),
    'push': jest.fn(),
    'remove': jest.fn(),
    'removeBatch': jest.fn(),
    'shift': jest.fn(),
    'swap': jest.fn(),
    'unshift': jest.fn(),
    'update': jest.fn(),
    'value': [{
      'id': '90adb7bb-4e9e-4cae-8e52-97c672ae6ddc',
      'primaryOrg': true,
      'org': {
        'id': 'ac8deee6-bfa8-4b3a-a463-b4970eca2ddd',
        'orgsUuid': '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1',
        'name': 'Alexander Street Press',
        'orgsUuid_object': {
          'id': '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1',
          'name': 'Alexander Street Press',
          'code': 'ALEXS',
          'description': 'AV streaming services',
          'exportToAccounting': false,
          'status': 'Active',
          'organizationTypes': '[]',
          'language': 'en-us',
          'aliases': '[{…}]',
          'addresses': '[{…}]',
          'phoneNumbers': '[{…}]',
          'emails': '[{…}]',
          'urls': '[{…}]',
          'contacts': '["11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1"]',
          'agreements': '[{…}]',
          'erpCode': 'G64758-74828',
          'paymentMethod': 'Physical Check',
          'accessProvider': true,
          'governmental': false,
          'licensor': true,
          'materialSupplier': true,
          'vendorCurrencies': '["USD"]',
          'claimingInterval': 0,
          'discountPercent': 0,
          'expectedActivationInterval': 1,
          'expectedInvoiceInterval': 30,
          'renewalActivationInterval': 365,
          'subscriptionInterval': 365,
          'expectedReceiptInterval': 30,
          'taxId': '',
          'liableForVat': false,
          'taxPercentage': 0,
          'interfaces': '["14e81009-0f98-45a0-b8e6-e25547beb22f"]',
          'accounts': '[{…}]',
          'isVendor': true,
          'sanCode': '1234567',
          'changelogs': '[{…}]',
          'acqUnitIds': '[]',
          'metadata': '{createdDate: "2022-07-03T13:50:54.107+00:00", upda…}'
        }
      },
      'owner': {
        'id': 'b2b22ff4-d68c-4fd8-aa60-04746da274b1'
      },
      'roles': [{
        'id': 'b673e03a-1347-41d3-9731-d8d8676151c2',
        'owner': '{id: "90adb7bb-4e9e-4cae-8e52-97c672ae6ddc"}',
        'role': '{id: "2c91809c81c44d340181c4548db50023", label: "Co…}',
        'note': 'This is note'
      }],
      'note': 'testing organization'
    }]
  },
  'input': {
    'name': 'orgs[0]',
    'value': {
      'id': '90adb7bb-4e9e-4cae-8e52-97c672ae6ddc',
      'primaryOrg': true,
      'org': {
        'id': 'ac8deee6-bfa8-4b3a-a463-b4970eca2ddd',
        'orgsUuid': '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1',
        'name': 'Alexander Street Press',
        'orgsUuid_object': '{accessProvider: true, accounts: Array(1), acqUnitI…}'
      },
      'owner': {
        'id': 'b2b22ff4-d68c-4fd8-aa60-04746da274b1'
      },
      'roles': [
        '{id: "b673e03a-1347-41d3-9731-d8d8676151c2", note: …}'
      ],
      'note': 'testing organization'
    },
    'onBlur': jest.fn(),
    'onChange': jest.fn(),
    'onFocus': jest.fn()
  },
  'labelClass': 'labelClass---zpBYt',
  'labelId': 'stripes-erm-components.organizations.setAsPrimary'
};

const filledInitialRoleValues = [{
  'id': 'c78a7ae1-df96-4022-b512-77c4899e12c0',
  'owner': {
    'id': 'a6574b84-5e43-4941-964e-6722c3ce604e'
  },
  'role': {
    'id': '2c91809c81c972dd0181c979cb2b004f',
    'value': 'content_provider',
    'label': 'Content provider'
  },
  'note': 'This is a note for the American Chemical Society organization.'
}];

const rolesFieldArrayProps = {
  'data-test-org-roles': true,
  'id': 'orgs-0',
  'orgIndex': 0,
  'roleValues': [{
    'value': '2c91809c81c972dd0181c979cb2b004f',
    'label': 'Content provider'
  }],
  'name': 'orgs[0].roles',
};

export {
  emptyOrgFieldArrayProps,
  orgFieldArrayProps,
  editOrgCardInitialValues,
  editOrgCardProps,
  filledInitialValues,
  filledInitialRoleValues,
  uncheckedFieldPrimaryOrgProps,
  checkedFieldPrimaryOrgProps,
  rolesFieldArrayProps
};
