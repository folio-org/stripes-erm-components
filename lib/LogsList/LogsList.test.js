import React from 'react';
import '../../test/jest/__mock__';
import { MemoryRouter } from 'react-router-dom';
import { MultiColumnList, MultiColumnListCell } from '@folio/stripes-testing';
import { renderWithIntl, translationsProperties } from '../../test/jest/helpers';
import { errorLog, infoLog } from './testResources';
import LogsList from './LogsList';

const onNeedMoreLogs = jest.fn();

describe('LogsList', () => {
  describe('render error log list', () => {
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <LogsList
            job={errorLog.jobs}
            logs={errorLog.logs}
            onNeedMoreLogs={onNeedMoreLogs}
            type={errorLog.type}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders expected MCL', async () => {
      await MultiColumnList('list-errorLog').exists();
    });

    test('renders expected columns', async () => {
      await MultiColumnList({
        columns: [
          'Record descriptor',
          'Error'
        ],
      }).exists();
    });

    test('renders expected record descriptor in the row', async () => {
      Promise.all([
        await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: '' }),
        await MultiColumnListCell({ row: 1, columnIndex: 0 }).has({ content: '' }),
        await MultiColumnListCell({ row: 2, columnIndex: 0 }).has({ content: '' }),
        await MultiColumnListCell({ row: 3, columnIndex: 0 }).has({ content: '' })
      ]);
    });

    test('renders expected error message in the row', async () => {
      Promise.all([
        await MultiColumnListCell({ row: 0, columnIndex: 1 }).has({ content: errorLog.logs[0].message }),
        await MultiColumnListCell({ row: 1, columnIndex: 1 }).has({ content: errorLog.logs[1].message }),
        await MultiColumnListCell({ row: 2, columnIndex: 1 }).has({ content: errorLog.logs[2].message }),
        await MultiColumnListCell({ row: 3, columnIndex: 1 }).has({ content: errorLog.logs[3].message })
      ]);
    });
  });

  describe('render info log list', () => {
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <LogsList
            job={infoLog.jobs}
            logs={infoLog.logs}
            onNeedMoreLogs={onNeedMoreLogs}
            type={infoLog.type}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders expected MCL', async () => {
      await MultiColumnList('list-infoLog').exists();
    });

    test('renders expected columns', async () => {
      await MultiColumnList({
        columns: [
          'Record descriptor',
          'Message'
        ],
      }).exists();
    });

    test('renders expected record descriptor in the row', async () => {
      Promise.all([
        await MultiColumnListCell({ row: 0, columnIndex: 0 }).has({ content: '' }),
        await MultiColumnListCell({ row: 1, columnIndex: 0 }).has({ content: '' })
      ]);
    });

    test('renders expected error message in the row', async () => {
      Promise.all([
        await MultiColumnListCell({ row: 0, columnIndex: 1 }).has({ content: infoLog.logs[0].message }),
        await MultiColumnListCell({ row: 1, columnIndex: 1 }).has({ content: infoLog.logs[1].message })
      ]);
    });
  });
});
