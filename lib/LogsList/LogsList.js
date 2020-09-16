import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { MultiColumnList, NoValue, Spinner } from '@folio/stripes/components';

const RESULT_COUNT_INCREMENT = 100;
export default class LogsList extends React.Component {
  static propTypes = {
    job: PropTypes.object,
    logs: PropTypes.arrayOf(PropTypes.shape({
      additionalInfo: PropTypes.map,
      message: PropTypes.string,
    })),
    onNeedMoreLogs: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  };

  render() {
    const { job, logs, onNeedMoreLogs, type } = this.props;

    if (!logs) return <Spinner />;
    if (!logs.length) return <FormattedMessage id={`stripes-erm-components.${type}LogNo`} />;

    const resultsFormatter = {
      additionalInfo: item => `<p>Package source: ${item.additionalInfo.packageSource}</p>
                               <p>Package reference: ${item.additionalInfo.packageReference}</p>
                               ${item.additionalInfo.rowNumber} => Row number: ${item.additionalInfo.rowNumber} : null
                               Record number: ${item.additionalInfo.recordNumber}`,
    };

    return (
      <MultiColumnList
        columnMapping={{
          additionalInfo: <FormattedMessage id="stripes-erm-components.columns.recordNumber" />,
          message: <FormattedMessage id={`stripes-erm-components.columns.${type}LogMessage`} />,
        }}
        contentData={logs}
        //formatter={{ recordNumber: ({ additionalInfo }) => (additionalInfo ?? <NoValue />) }}
        formatter={resultsFormatter}
        id={`list-${type}Log`}
        interactive={false}
        maxHeight={800}
        onNeedMoreData={onNeedMoreLogs}
        pageAmount={RESULT_COUNT_INCREMENT}
        pagingType="click"
        totalCount={job[`${type}LogCount`]}
        virtualize
        visibleColumns={['additionalInfo', 'message']}
      />
    );
  }
}
