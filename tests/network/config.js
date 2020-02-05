export default function config() {
  this.get('/licenses/org', ({ organizations }, request) => {
    if (request.queryParams.term) {
      const { term } = request.queryParams;
      return organizations.where(org => org.name.toLowerCase().includes(term.toLowerCase()));
    } else {
      return organizations.all();
    }
  });

  this.get('/erm/org', ({ organizations }, request) => {
    const { term } = request.queryParams;
    return organizations.where(org => org.name.toLowerCase().includes(term.toLowerCase()));
  });

  this.post('/erm/org', (_, request) => {
    const body = JSON.parse(request.requestBody);
    return this.create('organization', body);
  });

  this.get('/erm/contacts', ({ contacts }) => {
    return contacts.all();
  });

  this.get('/users', ({ users }) => {
    return users.all();
  });

  this.get('/license/custProps', (_, request) => {
    console.log('here', request);
    return [
      {
        'id': '2c9180af7012f9b7017012fa2b11002a',
        'name': 'authorisedUsers',
        'primary': true,
        'defaultInternal': true,
        'label': 'Definition of authorised user',
        'description': 'The definition of an authorised user for a resource',
        'weight': -1,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
      },
      {
        'id': '2c9180af7012f9b7017012fa2b41002c',
        'name': 'remoteAccess',
        'primary': true,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a3b001d',
          'desc': 'Yes/No/Other',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a45001f',
              'value': 'no',
              'label': 'No'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a4b0020',
              'value': 'other_(see_notes)',
              'label': 'Other (see notes)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a40001e',
              'value': 'yes',
              'label': 'Yes'
            }
          ]
        },
        'defaultInternal': true,
        'label': 'Access restricted to on-campus/campus network?',
        'description': 'Can access to the resource be provided from outside the library or institutional location / network',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      },
      {
        'id': '2c9180af7012f9b7017012fa2b4d002d',
        'name': 'illElectronic',
        'primary': true,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a510021',
          'desc': 'Permitted/Prohibited',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a5a0023',
              'value': 'permitted_(explicit)_under_conditions',
              'label': 'Permitted (explicit) under conditions'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6f0027',
              'value': 'unmentioned',
              'label': 'Unmentioned'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a720028',
              'value': 'not_applicable',
              'label': 'Not applicable'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a670025',
              'value': 'prohibited_(explicit)',
              'label': 'Prohibited (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a550022',
              'value': 'permitted_(explicit)',
              'label': 'Permitted (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a630024',
              'value': 'permitted_(interpreted)',
              'label': 'Permitted (interpreted)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6b0026',
              'value': 'prohibited_(interpreted)',
              'label': 'Prohibited (interpreted)'
            }
          ]
        },
        'defaultInternal': true,
        'label': 'Electronic ILL',
        'description': 'The right to provide the licensed materials via interlibrary loan by way of electronic copies',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      },
      {
        'id': '2c9180af7012f9b7017012fa2b860033',
        'name': 'copyDigital',
        'primary': true,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a510021',
          'desc': 'Permitted/Prohibited',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a5a0023',
              'value': 'permitted_(explicit)_under_conditions',
              'label': 'Permitted (explicit) under conditions'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6f0027',
              'value': 'unmentioned',
              'label': 'Unmentioned'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a720028',
              'value': 'not_applicable',
              'label': 'Not applicable'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a670025',
              'value': 'prohibited_(explicit)',
              'label': 'Prohibited (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a550022',
              'value': 'permitted_(explicit)',
              'label': 'Permitted (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a630024',
              'value': 'permitted_(interpreted)',
              'label': 'Permitted (interpreted)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6b0026',
              'value': 'prohibited_(interpreted)',
              'label': 'Prohibited (interpreted)'
            }
          ]
        },
        'defaultInternal': true,
        'label': 'Making digital copies',
        'description': 'The right of the licensee and authorized users to download and digitally copy a reasonable portion of the licensed materials',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      },
      {
        'id': '2c9180af7012f9b7017012fa2b8d0034',
        'name': 'copyPrint',
        'primary': true,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a510021',
          'desc': 'Permitted/Prohibited',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a5a0023',
              'value': 'permitted_(explicit)_under_conditions',
              'label': 'Permitted (explicit) under conditions'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6f0027',
              'value': 'unmentioned',
              'label': 'Unmentioned'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a720028',
              'value': 'not_applicable',
              'label': 'Not applicable'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a670025',
              'value': 'prohibited_(explicit)',
              'label': 'Prohibited (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a550022',
              'value': 'permitted_(explicit)',
              'label': 'Permitted (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a630024',
              'value': 'permitted_(interpreted)',
              'label': 'Permitted (interpreted)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6b0026',
              'value': 'prohibited_(interpreted)',
              'label': 'Prohibited (interpreted)'
            }
          ]
        },
        'defaultInternal': true,
        'label': 'Making print copies',
        'description': 'The right of the licensee and authorized users to print a reasonable portion of the licensed materials',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      },
      {
        'id': '2c9180af7012f9b7017012fa2b080029',
        'name': 'concurrentAccess',
        'primary': true,
        'defaultInternal': true,
        'label': 'Number of concurrent users allowed',
        'description': 'The number of concurrent users allowed by the resource',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger'
      },
      {
        'id': '2c9180af7012f9b7017012fa2b64002f',
        'name': 'illPrint',
        'primary': true,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a510021',
          'desc': 'Permitted/Prohibited',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a5a0023',
              'value': 'permitted_(explicit)_under_conditions',
              'label': 'Permitted (explicit) under conditions'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6f0027',
              'value': 'unmentioned',
              'label': 'Unmentioned'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a720028',
              'value': 'not_applicable',
              'label': 'Not applicable'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a670025',
              'value': 'prohibited_(explicit)',
              'label': 'Prohibited (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a550022',
              'value': 'permitted_(explicit)',
              'label': 'Permitted (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a630024',
              'value': 'permitted_(interpreted)',
              'label': 'Permitted (interpreted)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6b0026',
              'value': 'prohibited_(interpreted)',
              'label': 'Prohibited (interpreted)'
            }
          ]
        },
        'defaultInternal': true,
        'label': 'Print ILL',
        'description': 'The right to provide the licensed materials via interlibrary loan by way of print copies or facsimile transmission',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      },
      {
        'id': '2c9180af7012f9b7017012fa2b5d002e',
        'name': 'illSecureElectronic',
        'primary': true,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a510021',
          'desc': 'Permitted/Prohibited',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a5a0023',
              'value': 'permitted_(explicit)_under_conditions',
              'label': 'Permitted (explicit) under conditions'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6f0027',
              'value': 'unmentioned',
              'label': 'Unmentioned'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a720028',
              'value': 'not_applicable',
              'label': 'Not applicable'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a670025',
              'value': 'prohibited_(explicit)',
              'label': 'Prohibited (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a550022',
              'value': 'permitted_(explicit)',
              'label': 'Permitted (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a630024',
              'value': 'permitted_(interpreted)',
              'label': 'Permitted (interpreted)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6b0026',
              'value': 'prohibited_(interpreted)',
              'label': 'Prohibited (interpreted)'
            }
          ]
        },
        'defaultInternal': true,
        'label': 'Secure Electronic ILL',
        'description': 'The right to provide the licensed materials via interlibrary loan by way of secure electronic transmission',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      },
      {
        'id': '2c9180af7012f9b7017012fa2b6c0030',
        'name': 'reservesElectronic',
        'primary': true,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a510021',
          'desc': 'Permitted/Prohibited',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a5a0023',
              'value': 'permitted_(explicit)_under_conditions',
              'label': 'Permitted (explicit) under conditions'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6f0027',
              'value': 'unmentioned',
              'label': 'Unmentioned'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a720028',
              'value': 'not_applicable',
              'label': 'Not applicable'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a670025',
              'value': 'prohibited_(explicit)',
              'label': 'Prohibited (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a550022',
              'value': 'permitted_(explicit)',
              'label': 'Permitted (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a630024',
              'value': 'permitted_(interpreted)',
              'label': 'Permitted (interpreted)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6b0026',
              'value': 'prohibited_(interpreted)',
              'label': 'Prohibited (interpreted)'
            }
          ]
        },
        'defaultInternal': true,
        'label': 'Storage of electronic copies on secure network',
        'description': 'The right to make electronic copies of the licensed materials and store them on a secure network',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      },
      {
        'id': '2c9180af7012f9b7017012fa2b750031',
        'name': 'coursePackElectronic',
        'primary': true,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a510021',
          'desc': 'Permitted/Prohibited',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a5a0023',
              'value': 'permitted_(explicit)_under_conditions',
              'label': 'Permitted (explicit) under conditions'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6f0027',
              'value': 'unmentioned',
              'label': 'Unmentioned'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a720028',
              'value': 'not_applicable',
              'label': 'Not applicable'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a670025',
              'value': 'prohibited_(explicit)',
              'label': 'Prohibited (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a550022',
              'value': 'permitted_(explicit)',
              'label': 'Permitted (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a630024',
              'value': 'permitted_(interpreted)',
              'label': 'Permitted (interpreted)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6b0026',
              'value': 'prohibited_(interpreted)',
              'label': 'Prohibited (interpreted)'
            }
          ]
        },
        'defaultInternal': false,
        'label': 'Use in electronic coursepacks',
        'description': 'The right to use licensed materials in collections or compilations of materials assembled in an electronic format by faculty members for use by students in a class for purposes of instruction',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      },
      {
        'id': '2c9180af7012f9b7017012fa2b7c0032',
        'name': 'coursePackPrint',
        'primary': true,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a510021',
          'desc': 'Permitted/Prohibited',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a5a0023',
              'value': 'permitted_(explicit)_under_conditions',
              'label': 'Permitted (explicit) under conditions'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6f0027',
              'value': 'unmentioned',
              'label': 'Unmentioned'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a720028',
              'value': 'not_applicable',
              'label': 'Not applicable'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a670025',
              'value': 'prohibited_(explicit)',
              'label': 'Prohibited (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a550022',
              'value': 'permitted_(explicit)',
              'label': 'Permitted (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a630024',
              'value': 'permitted_(interpreted)',
              'label': 'Permitted (interpreted)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6b0026',
              'value': 'prohibited_(interpreted)',
              'label': 'Prohibited (interpreted)'
            }
          ]
        },
        'defaultInternal': false,
        'label': 'Use in print course packs',
        'description': 'The right to use licensed materials in collections or compilations of materials assembled in a print format by faculty members for use by students in a class for purposes of instruction',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      },
      {
        'id': '2c9180af7012f9b7017012fa2b37002b',
        'name': 'walkInAccess',
        'primary': true,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a3b001d',
          'desc': 'Yes/No/Other',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a45001f',
              'value': 'no',
              'label': 'No'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a4b0020',
              'value': 'other_(see_notes)',
              'label': 'Other (see notes)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a40001e',
              'value': 'yes',
              'label': 'Yes'
            }
          ]
        },
        'defaultInternal': false,
        'label': 'Walk-in access permitted?',
        'description': 'Can non-members of the library/instittuion use the resource when in the library',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      },
      {
        'id': '2c9180af7012f9b7017012fa2bc3003a',
        'name': 'authProxy',
        'primary': false,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a3b001d',
          'desc': 'Yes/No/Other',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a45001f',
              'value': 'no',
              'label': 'No'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a4b0020',
              'value': 'other_(see_notes)',
              'label': 'Other (see notes)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a40001e',
              'value': 'yes',
              'label': 'Yes'
            }
          ]
        },
        'defaultInternal': true,
        'label': 'Access via a proxy supported?',
        'description': 'Whether authentication via a reverse proxy is supported',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      },
      {
        'id': '2c9180af7012f9b7017012fa2bda003d',
        'name': 'annualOptOut',
        'primary': false,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a3b001d',
          'desc': 'Yes/No/Other',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a45001f',
              'value': 'no',
              'label': 'No'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a4b0020',
              'value': 'other_(see_notes)',
              'label': 'Other (see notes)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a40001e',
              'value': 'yes',
              'label': 'Yes'
            }
          ]
        },
        'defaultInternal': true,
        'label': 'Annual opt-out clause included?',
        'description': "Whether the license includes an 'annual opt-out' clause within a multi-year agreement",
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      },
      {
        'id': '2c9180af7012f9b7017012fa2bbc0039',
        'name': 'authIP',
        'primary': false,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a3b001d',
          'desc': 'Yes/No/Other',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a45001f',
              'value': 'no',
              'label': 'No'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a4b0020',
              'value': 'other_(see_notes)',
              'label': 'Other (see notes)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a40001e',
              'value': 'yes',
              'label': 'Yes'
            }
          ]
        },
        'defaultInternal': true,
        'label': 'IP authentication supported?',
        'description': 'Whether authentication via IP range is supported',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      },
      {
        'id': '2c9180af7012f9b7017012fa2bb40038',
        'name': 'metadataUsage',
        'primary': false,
        'defaultInternal': true,
        'label': 'Metadata usage',
        'description': 'Any restrictions expressed related to the use of metadata in the platforms',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
      },
      {
        'id': '2c9180af7012f9b7017012fa2b9a0036',
        'name': 'otherRestrictions',
        'primary': false,
        'defaultInternal': true,
        'label': 'Other restrictions',
        'description': 'Other restrictions expressed in the license',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
      },
      {
        'id': '2c9180af7012f9b7017012fa2bd3003c',
        'name': 'authSAML',
        'primary': false,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a3b001d',
          'desc': 'Yes/No/Other',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a45001f',
              'value': 'no',
              'label': 'No'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a4b0020',
              'value': 'other_(see_notes)',
              'label': 'Other (see notes)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a40001e',
              'value': 'yes',
              'label': 'Yes'
            }
          ]
        },
        'defaultInternal': true,
        'label': 'SAML compliant authentication supported?',
        'description': 'Whether authentication via SAML compliant method is supported',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      },
      {
        'id': '2c9180af7012f9b7017012fa2b950035',
        'name': 'scholarlySharing',
        'primary': false,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a510021',
          'desc': 'Permitted/Prohibited',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a5a0023',
              'value': 'permitted_(explicit)_under_conditions',
              'label': 'Permitted (explicit) under conditions'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6f0027',
              'value': 'unmentioned',
              'label': 'Unmentioned'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a720028',
              'value': 'not_applicable',
              'label': 'Not applicable'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a670025',
              'value': 'prohibited_(explicit)',
              'label': 'Prohibited (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a550022',
              'value': 'permitted_(explicit)',
              'label': 'Permitted (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a630024',
              'value': 'permitted_(interpreted)',
              'label': 'Permitted (interpreted)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6b0026',
              'value': 'prohibited_(interpreted)',
              'label': 'Prohibited (interpreted)'
            }
          ]
        },
        'defaultInternal': true,
        'label': 'Sharing for scholarly use',
        'description': 'The right of authorized users and/or licensee to transmit hard copy or electronic copy of reasonable amounts of licensed materials to a third party for personal, scholarly, educational, scientific or professional use',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      },
      {
        'id': '2c9180af7012f9b7017012fa2ba00037',
        'name': 'textAndDataMining',
        'primary': false,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a510021',
          'desc': 'Permitted/Prohibited',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a5a0023',
              'value': 'permitted_(explicit)_under_conditions',
              'label': 'Permitted (explicit) under conditions'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6f0027',
              'value': 'unmentioned',
              'label': 'Unmentioned'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a720028',
              'value': 'not_applicable',
              'label': 'Not applicable'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a670025',
              'value': 'prohibited_(explicit)',
              'label': 'Prohibited (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a550022',
              'value': 'permitted_(explicit)',
              'label': 'Permitted (explicit)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a630024',
              'value': 'permitted_(interpreted)',
              'label': 'Permitted (interpreted)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a6b0026',
              'value': 'prohibited_(interpreted)',
              'label': 'Prohibited (interpreted)'
            }
          ]
        },
        'defaultInternal': false,
        'label': 'Text and Data mining',
        'description': 'Whether it is permitted to use text and data mining processes on the content of the resource',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      },
      {
        'id': '2c9180af7012f9b7017012fa2be0003e',
        'name': 'APCAndOffsetting',
        'primary': false,
        'defaultInternal': true,
        'label': 'Whether the resource is subject to an APC discount or subscription cost offsetting agreement',
        'description': 'Whether the resource is subject to an APC discount or subscription cost offsetting agreement',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
      },
      {
        'id': '2c9180af7012f9b7017012fa2bca003b',
        'name': 'postCancellationAccess',
        'primary': false,
        'category': {
          'id': '2c9180af7012f9b7017012fa2a3b001d',
          'desc': 'Yes/No/Other',
          'values': [
            {
              'id': '2c9180af7012f9b7017012fa2a45001f',
              'value': 'no',
              'label': 'No'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a4b0020',
              'value': 'other_(see_notes)',
              'label': 'Other (see notes)'
            },
            {
              'id': '2c9180af7012f9b7017012fa2a40001e',
              'value': 'yes',
              'label': 'Yes'
            }
          ]
        },
        'defaultInternal': true,
        'label': 'Post-cancellation terms included?',
        'description': 'Does the license include post-cancellation terms?',
        'weight': 1,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata'
      }
    ];
  });
}
