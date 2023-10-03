import { useCallback, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';

import { CalloutContext, useOkapiKy } from '@folio/stripes/core';

import downloadBlob from '../../downloadBlob';

const useExportLogStream = (job, type) => {
  const callout = useContext(CalloutContext);
  const ky = useOkapiKy();
  const { refetch, isLoading } = useQuery(
    ['ui-local-kb-admin', 'Logs', 'fetchLogStream', job?.id, type],
    () => ky(
      `erm/jobs/${job?.id}/${type}LogStream`
    ).blob()
      .then(downloadBlob(`${job?.name}:${type}`, { fileExt: 'json' })),
    {
      // Ensure this doesn't run until the user clicks the button
      enabled: false
    }
  );

  const refetchWithCallout = useCallback(() => {
    callout.sendCallout({ message: <FormattedMessage id="ui-local-kb-admin.job.log.export.creation" /> });
    refetch();
  }, [callout, refetch]);

  if (!job || !type) {
    return {};
  }

  return { refetch: refetchWithCallout, isLoading };
};

export default useExportLogStream;
