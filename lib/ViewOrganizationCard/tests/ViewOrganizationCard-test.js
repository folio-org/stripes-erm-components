import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect, spy } from 'chai';
import MultiColumnListInteractor from '@folio/stripes-components/lib/MultiColumnList/tests/interactor';
import { setupApplication, dummyMount, mountWithContext } from '../../../tests/helpers';
import ViewOrganizationCard from '../ViewOrganizationCard';
import ViewOrganizationCardInteractor from './interactor';

const fetchCredentials = spy();

const interfaces = [
  {
    name: 'Interface 5485',
    type: ['qwert'],
    notes: 'Hello world 43106',
    credentials: {
      username: 'username #90396',
      password: 'password #30288',
    }
  },
  {
    name: 'Interface 5486',
    type: ['qwerty'],
    notes: 'Hello world 43107',
    credentials: {
      username: 'username #90396',
      password: 'password #30288',
    }
  },
];

const org = { name: 'American Chemical Society', note: 'a test note' };

describe('ViewOrganizationCard', () => {
  const interactor = new ViewOrganizationCardInteractor();
  const mcl = new MultiColumnListInteractor();
  setupApplication();

  beforeEach(async () => {
    await dummyMount(
      <ViewOrganizationCard
        fetchCredentials={fetchCredentials}
        headerStart={<span>Organization</span>}
        interfaces={interfaces}
      />
    );
  });

  it('renders the card', () => {
    expect(interactor.hasCard).to.be.true;
  });

  it('renders the card header', () => {
    expect(interactor.hasHeaderStart).to.be.true;
  });

  it('renders the card body', () => {
    expect(interactor.hasCardBody).to.be.true;
  });

  it('renders the MCL container', () => {
    expect(mcl.containerPresent).to.be.true;
  });

  it('renders the correct number of headers', () => {
    expect(mcl.columnCount).to.equal(Object.keys(interfaces[0]).length + 2);
  });

  it('renders the correct number of rows', () => {
    expect(mcl.rowCount).to.equal(interfaces.length);
  });

  it('each row renders the correct number of columns', () => {
    let correctNumber;
    interfaces.forEach((d, i) => {
      const cellNumber = mcl.rows(i).cellCount;
      if (cellNumber !== Object.keys(interfaces[i]).length + 2) {
        correctNumber = false;
      }
    });
    expect(correctNumber).to.not.be.false;
  });

  it('renders the expected notes in each row', () => {
    let correctData;
    interfaces.forEach((d, n) => {
      for (let j = 1; j < mcl.rowCount; j++) {
        if (mcl.rows(n).cells(2).content !== d[Object.keys(d)[2]]) {
          correctData = false;
        }
      }
    });
    expect(correctData).to.not.be.false;
  });

  it('password is hidden', () => {
    expect(interactor.credentials(0).passwordBlockText).to.contain('****');
  });

  it('username is hidden', () => {
    expect(interactor.credentials(0).usernameBlockText).to.contain('****');
  });

  describe('Click the show credentials button', () => {
    beforeEach(async () => {
      await interactor.credentials(0).showCredentialsButton();
    });

    it('calls fetchCredentials', () => {
      expect(fetchCredentials).to.be.called();
    });
  });


  describe('Passing org prop', () => {
    beforeEach(async () => {
      await mountWithContext(
        <ViewOrganizationCard
          headerStart={<span>Organization</span>}
          id="name"
          note={org.note}
          org={org}
        />
      );
    });

    it('renders the org name', () => {
      expect(interactor.name).to.equal(org.name);
    });

    it('renders the org note', () => {
      expect(interactor.note).to.equal(org.note);
    });
  });
});
