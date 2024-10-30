const documentFilterParsing = [
  {
    name: 'complex',
    parsed: [
      {
        rules: [
          {
            comparator: '==',
            path: 'docs.name',
            value: 'testing'
          },
          {
            comparator: '!~',
            path: 'docs.note',
            value: 'wibble'
          }
        ]
      },
      {
        rules: [
          {
            comparator: '!=',
            path: 'docs.atType.value',
            value: 'license'
          }
        ]
      }
    ],
    deparsed: { docs: ['(docs.name==testing&&docs.note!~wibble)||(docs.atType.value!=license)'] }
  },
  {
    name: 'simple',
    parsed: [
      {
        rules: [
          {
            comparator: '==',
            path: 'docs.name',
            value: 'testing'
          }
        ]
      }
    ],
    deparsed: { docs: ['(docs.name==testing)'] }
  }
];

export {
  documentFilterParsing
};
