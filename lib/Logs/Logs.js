import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { generateKiwtQueryParams } from '@k-int/stripes-kint-components';

import { useOkapiKy } from '@folio/stripes/core';
import { Accordion, Badge, Button, Spinner } from '@folio/stripes/components';

import { useExportLogStream, usePrevNextPagination } from '../hooks';
import LogsList from '../LogsList';

const RESULT_COUNT_INCREMENT = 100;

const Logs = ({
  allowExport = false,
  id,
  job,
  type
}) => {
  const ky = useOkapiKy();
  const logCount = job[`${type}LogCount`];

  const LOGS_ENDPOINT = `erm/jobs/${job.id}/${type}Log`;

  const { refetch: fetchLogs, isLoading } = useExportLogStream(job, type);

  const [count, setCount] = useState(0);

  const { currentPage, paginationMCLProps } = usePrevNextPagination({
    count,
    pageSize: RESULT_COUNT_INCREMENT,
    // With syncToLocation false, this needs a unique id, so error/info aren't on the same page
    id: `${job.id}-${id}`,
    syncToLocation: false
  });

  // LOGS INFINITE FETCH
  const logQueryParams = useMemo(() => (
    generateKiwtQueryParams(
      {
        page: currentPage,
        perPage: RESULT_COUNT_INCREMENT
      },
      {}
    )
  ), [currentPage]);

  const {
    data: { results: logs = [], totalRecords: logsCount = 0 } = {},
    isLoading: areLogsLoading,
  } = useQuery(
    ['ERM', 'Job', job.id, 'Logs', type, LOGS_ENDPOINT, logQueryParams],
    () => {
      const params = [...logQueryParams];
      return ky.get(`${LOGS_ENDPOINT}?${params?.join('&')}`).json();
    },
  );

  // Bit hacky, gets us around the "used before defined" problem
  useEffect(() => {
    if (count !== logsCount) {
      setCount(logsCount);
    }
  }, [count, logsCount]);

  const renderBadgeAndExport = useCallback(() => {
    return (
      <div data-testid="logs">
        {allowExport &&
          <Button
            disabled={logCount < 1 || isLoading}
            onClick={() => fetchLogs()}
          >
            <FormattedMessage id="stripes-erm-components.export" />
            {
            isLoading &&
            <Spinner />
          }
          </Button>
        }
        <Badge>
          {logCount}
        </Badge>
      </div>
    );
  }, [allowExport, fetchLogs, isLoading, logCount]);

  return (
    <Accordion
      displayWhenClosed={renderBadgeAndExport()}
      displayWhenOpen={renderBadgeAndExport()}
      id={id}
      label={<FormattedMessage id={`stripes-erm-components.${type}Log`} />}
    >
      <LogsList
        job={job}
        loading={areLogsLoading}
        logs={logs}
        mclProps={{
          ...paginationMCLProps,
        }}
        type={type}
      />
    </Accordion>
  );
};

Logs.propTypes = {
  allowExport: PropTypes.bool,
  id: PropTypes.string,
  job: PropTypes.object,
  type: PropTypes.string.isRequired,
};

export default Logs;
