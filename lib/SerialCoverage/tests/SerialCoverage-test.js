import React from 'react';
import { beforeEach, describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import { mountWithContext } from '../../../tests/helpers';
import SerialCoverageInteractor from './interactor';
import SerialCoverage from '../SerialCoverage';

const serialInteractor = new SerialCoverageInteractor();
const serialInteractorStart = new SerialCoverageInteractor('[data-test-start]');
const serialInteractorEnd = new SerialCoverageInteractor('[data-test-end]');

const serial = {
  pti: {
    titleInstance: {
      id: '2612',
      name: 'This is a serial',
      type: { value: 'serial', label: 'Serial' },
      subType: {
        value: 'electronic',
        label: 'Electronic'
      }
    }
  },
  coverage: [{
    startDate: '2001-06-12',
    endDate: '2007-05-10',
    startVolume: '76',
    startIssue: '1',
    endVolume: '79',
    endIssue: '2'
  }],
  embargo: {
    movingWallStart: { length: 730, unit: 'days' },
    movingWallEnd: { length: 2, unit: 'years' },
  },
};

describe('Serial coverage tests', () => {
  describe('Rendering serial coverage for a serial pci', () => {
    beforeEach(async () => {
      await mountWithContext(
        <SerialCoverage statements={serial.coverage} />
      );
    });

    it('renders the serial coverage', () => {
      expect(serialInteractor.exists).to.be.true;
    });
    it('renders the first set of data', () => {
      expect(serialInteractor.first).to.be.true;
    });
    it('renders the last set of data', () => {
      expect(serialInteractor.end).to.be.true;
    });
    it('renders the arrow icon', () => {
      expect(serialInteractor.icon).to.be.true;
    });
    it('renders the correct start date', () => {
      expect(serialInteractorStart.startDate).to.have.string('6/12/2001');
    });
    it('renders the correct end date', () => {
      expect(serialInteractorEnd.endDate).to.have.string('5/10/2007');
    });
    it('renders the correct start issue', () => {
      expect(serialInteractorStart.startIssue).to.have.string(serial.coverage[0].startIssue);
    });
    it('renders the correct end issue', () => {
      expect(serialInteractorEnd.endIssue).to.have.string(serial.coverage[0].endIssue);
    });
    it('renders the correct start volume', () => {
      expect(serialInteractorStart.startVolume).to.have.string(serial.coverage[0].startVolume);
    });
    it('renders the correct end volume', () => {
      expect(serialInteractorEnd.endVolume).to.have.string(serial.coverage[0].endVolume);
    });
  });
});
