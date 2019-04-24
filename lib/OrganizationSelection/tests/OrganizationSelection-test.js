import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { when } from '@bigtest/convergence';
import { Response } from '@bigtest/mirage';
import { expect } from 'chai';

import SelectionInteractor from '@folio/stripes-components/lib/Selection/tests/interactor';

import { setupApplication, dummyMount } from '../../../tests/helpers';
import connectStripes from '../../../tests/connectStripes';
import TestForm from '../../../tests/TestForm';

import OrganizationSelection from '../OrganizationSelection';

const ConnectedField = connectStripes(OrganizationSelection);

describe('OrganizationSelection', () => {
  const field = new SelectionInteractor();

  setupApplication();

  // beforeEach(async function () {
  //   this.server.get('/licenses/org', (schema, request) => {
  //     //TBW
  //   });

    // mount the component under test
  dummyMount(
    <TestForm>
      <ConnectedField
        name="test"
      />
    </TestForm>
  );
});
