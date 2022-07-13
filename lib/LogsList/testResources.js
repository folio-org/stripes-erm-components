const errorLog = {
  jobs: {
    'id': 'b3ae754a-ac0c-4e86-ae5b-d095b62a4370',
    'dateCreated': 1657111266843,
    'ended': 1657111267412,
    'fileUpload': {
      'id': 'ccc9790a-eb95-4005-aed6-b3e2b194b148',
      'contentType': 'application/json',
      'size': 4981,
      'modified': '2022-07-06T12:41:06Z',
      'name': 'access_start_access_end_test.json'
    },
    'result': {
      'id': '2c9180b07f436083017f436310d40024',
      'value': 'partial_success',
      'label': 'Partial success'
    },
    'name': 'Import package from access_start_access_end_test.json',
    'started': 1657111266874,
    'status': {
      'id': '2c9180b07f436083017f43631123002a',
      'value': 'ended',
      'label': 'Ended'
    },
    'class': 'org.olf.general.jobs.PackageImportJob',
    'fullLogCount': 6,
    'errorLogCount': 4,
    'infoLogCount': 2
  },
  logs: [
    {
      'id': 'c1b7262f-ff57-45e7-85ba-73144856a029',
      'message': 'Property [availabilityScope] of class [class org.olf.dataimport.erm.ErmPackageImpl] cannot be null',
      'origin': 'b3ae754a-ac0c-4e86-ae5b-d095b62a4370',
      'dateCreated': 1657111267398,
      'type': 'error',
      'additionalInfo': {
        'jobId': 'b3ae754a-ac0c-4e86-ae5b-d095b62a4370',
        'tenantId': 'diku_mod_agreements',
        'tenant': 'diku'
      }
    },
    {
      'id': '5a1dc356-6b12-483c-a932-ed18457e0633',
      'message': 'Property [lifecycleStatus] of class [class org.olf.dataimport.erm.ErmPackageImpl] cannot be null',
      'origin': 'b3ae754a-ac0c-4e86-ae5b-d095b62a4370',
      'dateCreated': 1657111267399,
      'type': 'error',
      'additionalInfo': {
        'jobId': 'b3ae754a-ac0c-4e86-ae5b-d095b62a4370',
        'tenantId': 'diku_mod_agreements',
        'tenant': 'diku'
      }
    },
    {
      'id': '9abd9c88-c33b-4f8d-8160-a38dfff3712a',
      'message': 'Property [sourceDataUpdated] of class [class org.olf.dataimport.erm.ErmPackageImpl] cannot be null',
      'origin': 'b3ae754a-ac0c-4e86-ae5b-d095b62a4370',
      'dateCreated': 1657111267400,
      'type': 'error',
      'additionalInfo': {
        'jobId': 'b3ae754a-ac0c-4e86-ae5b-d095b62a4370',
        'tenantId': 'diku_mod_agreements',
        'tenant': 'diku'
      }
    },
    {
      'id': 'e6ebc3f9-b15a-404f-8208-14c2d13714cf',
      'message': 'Property [sourceDataCreated] of class [class org.olf.dataimport.erm.ErmPackageImpl] cannot be null',
      'origin': 'b3ae754a-ac0c-4e86-ae5b-d095b62a4370',
      'dateCreated': 1657111267403,
      'type': 'error',
      'additionalInfo': {
        'jobId': 'b3ae754a-ac0c-4e86-ae5b-d095b62a4370',
        'tenantId': 'diku_mod_agreements',
        'tenant': 'diku'
      }
    }
  ],
  type: 'error',
};
const infoLog = {
  jobs: {
    'id': 'b3ae754a-ac0c-4e86-ae5b-d095b62a4370',
    'dateCreated': 1657111266843,
    'ended': 1657111267412,
    'fileUpload': {
      'id': 'ccc9790a-eb95-4005-aed6-b3e2b194b148',
      'contentType': 'application/json',
      'size': 4981,
      'modified': '2022-07-06T12:41:06Z',
      'name': 'access_start_access_end_test.json'
    },
    'result': {
      'id': '2c9180b07f436083017f436310d40024',
      'value': 'partial_success',
      'label': 'Partial success'
    },
    'name': 'Import package from access_start_access_end_test.json',
    'started': 1657111266874,
    'status': {
      'id': '2c9180b07f436083017f43631123002a',
      'value': 'ended',
      'label': 'Ended'
    },
    'class': 'org.olf.general.jobs.PackageImportJob',
    'fullLogCount': 6,
    'errorLogCount': 4,
    'infoLogCount': 2
  },
  logs: [
    {
      'id': '4abbdbe3-b63a-48c7-a942-71efe7bf534d',
      'message': 'dataSchema specified',
      'origin': 'b3ae754a-ac0c-4e86-ae5b-d095b62a4370',
      'dateCreated': 1657111266952,
      'type': 'info',
      'additionalInfo': {
        'jobId': 'b3ae754a-ac0c-4e86-ae5b-d095b62a4370',
        'tenantId': 'diku_mod_agreements',
        'tenant': 'diku'
      }
    },
    {
      'id': '7b5363ab-f5b7-462f-bb8d-e8d6a57a22ef',
      'message': '[packageCount:1, packageIds:[]] package(s) imported successfully',
      'origin': 'b3ae754a-ac0c-4e86-ae5b-d095b62a4370',
      'dateCreated': 1657111267403,
      'type': 'info',
      'additionalInfo': {
        'jobId': 'b3ae754a-ac0c-4e86-ae5b-d095b62a4370',
        'tenantId': 'diku_mod_agreements',
        'tenant': 'diku'
      }
    }
  ],
  type: 'info',
};

export {
  errorLog,
  infoLog
};
