const DecimalCustProp = {
  'id': '2c9180b070a32ba60170a6d39405003f',
  'name': 'decCustProp',
  'primary': false,
  'defaultInternal': true,
  'label': 'Decimal CustProp',
  'description': 'A decimal custProp!',
  'weight': 0,
  'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyDecimal'
};

const IntegerCustProp = {
  'id': '1883e41b7077c0ea017077c526880029',
  'name': 'intCustProp',
  'primary': true,
  'defaultInternal': true,
  'label': 'Integer CustProp',
  'description': 'The number of concurrent users allowed by the resource',
  'weight': 0,
  'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger'
};

const RefDataCustProp = {
  'id': '1883e41b7077c0ea017077c526e3002c',
  'name': 'refdataCustProp',
  'primary': true,
  'category': {
    'id': '1883e41b7077c0ea017077c5258f001d',
    'desc': 'Yes/No/Other',
    'values': [{
      'id': '1883e41b7077c0ea017077c525bc0020',
      'value': 'other_(see_notes)',
      'label': 'Other (see notes)'
    }, {
      'id': '1883e41b7077c0ea017077c5259b001e',
      'value': 'yes',
      'label': 'Yes'
    }, {
      'id': '1883e41b7077c0ea017077c525aa001f',
      'value': 'no',
      'label': 'No'
    }]
  },
  'defaultInternal': true,
  'label': 'RefData CustProp',
  'description': 'Can access to the resource be provided from outside the library or institutional location / network',
  'weight': 0,
  'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
};

const TextCustProp = {
  'id': '1883e41b7077c0ea017077c5269e002a',
  'name': 'textCustProp',
  'primary': true,
  'defaultInternal': true,
  'label': 'Text CustProp',
  'description': 'The definition of an authorised user for a resource',
  'weight': -1,
  'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
};

export {
  DecimalCustProp,
  IntegerCustProp,
  RefDataCustProp,
  TextCustProp,
};
