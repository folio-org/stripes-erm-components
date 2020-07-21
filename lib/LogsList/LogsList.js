import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { MultiColumnList, NoValue, Spinner } from '@folio/stripes/components';

const RESULT_COUNT_INCREMENT = 100;
export default class LogsList extends React.Component {
  static propTypes = {
    job: PropTypes.object,
    logs: PropTypes.arrayOf(PropTypes.shape({
      recordNumber: PropTypes.string,
      message: PropTypes.string,
    })),
    onNeedMoreLogs: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  };

  render() {
    const { job, logs, onNeedMoreLogs, type } = this.props;

    if (!logs) return <Spinner />;
    if (!logs.length) return <FormattedMessage id={`stripes-erm-components.${type}LogNo`} />;

    return (
      <MultiColumnList
        columnMapping={{
          recordNumber: <FormattedMessage id="stripes-erm-components.columns.recordNumber" />,
          message: <FormattedMessage id={`stripes-erm-components.columns.${type}LogMessage`} />,
        }}
        contentData={logs}
        formatter={{ recordNumber: ({ recordNumber }) => (recordNumber ?? <NoValue />) }}
        id={`list-${type}Log`}
        interactive={false}
        maxHeight={800}
        onNeedMoreData={onNeedMoreLogs}
        pageAmount={RESULT_COUNT_INCREMENT}
        pagingType="click"
        totalCount={job[`${type}LogCount`]}
        virtualize
        visibleColumns={['recordNumber', 'message']}
      />
    );
  }
}
