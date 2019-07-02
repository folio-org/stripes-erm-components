import React from 'react';
import { describe, beforeEach, it } from '@bigtest/mocha';
import { expect } from 'chai';
import MultiColumnListInteractor from '@folio/stripes-components/lib/MultiColumnList/tests/interactor';
import { mountWithContext } from '../../../tests/helpers';
import ViewOrganizationCard from '../ViewOrganizationCard';
import ViewOrganizationCardInteractor from './interactor';

const interfaces = [
  {
    name: 'Interface 5485',
    username: 'username #90396',
    password: 'password #30288',
    type: ['qwert'],
    notes: 'Hello world 43106',
  },
  {
    name: 'Interface 5486',
    username: 'username #90397',
    password: 'password #30289',
    type: ['qwerty'],
    notes: 'Hello world 43107',
  },
];

const org = { name: 'American Chemical Society' };

describe('ViewOrganizationCard', () => {
  const interactor = new ViewOrganizationCardInteractor();
  const mcl = new MultiColumnListInteractor();

  beforeEach(async () => {
    await mountWithContext(
      <ViewOrganizationCard
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
    expect(mcl.columnCount).to.equal(Object.keys(interfaces[0]).length);
  });

  it('renders the correct number of rows', () => {
    expect(mcl.rowCount).to.equal(interfaces.length);
  });

  it('each row renders the correct number of columns', () => {
    let correctNumber;
    interfaces.forEach((d, i) => {
      const cellNumber = mcl.rows(i).cellCount;
      if (cellNumber !== Object.keys(interfaces[i]).length) {
        correctNumber = false;
      }
    });
    expect(correctNumber).to.not.be.false;
  });

  it('renders the expected username in each row', () => {
    let correctData;
    interfaces.forEach((d, n) => {
      for (let j = 1; j < mcl.rowCount; j++) {
        if (mcl.rows(n).cells(1).content !== d[Object.keys(d)[1]]) {
          correctData = false;
        }
      }
    });
    expect(correctData).to.not.be.false;
  });

  it('renders the expected password in each row', () => {
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

  it('renders the expected notes in each row', () => {
    let correctData;
    interfaces.forEach((d, n) => {
      for (let j = 1; j < mcl.rowCount; j++) {
        if (mcl.rows(n).cells(4).content !== d[Object.keys(d)[4]]) {
          correctData = false;
        }
      }
    });
    expect(correctData).to.not.be.false;
  });

  describe('Passing org prop', () => {
    beforeEach(async () => {
      await mountWithContext(
        <ViewOrganizationCard
          id="name"
          headerStart={<span>Organization</span>}
          org={org}
        />
      );
    });

    it('renders the org name', () => {
      expect(interactor.name).to.equal(org.name);
    });
  });
});
