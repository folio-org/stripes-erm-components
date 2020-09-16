import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { MultiColumnList, NoValue, Spinner } from '@folio/stripes/components';

const RESULT_COUNT_INCREMENT = 100;
export default class LogsList extends React.Component {
  static propTypes = {
    job: PropTypes.object,
    logs: PropTypes.arrayOf(PropTypes.shape({
      additionalInfo: PropTypes.array,   // is this correct? I tried PropTypes.maps as well and it worked with my code previously
      message: PropTypes.string,
    })),
    onNeedMoreLogs: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  };

  render() {
    const { job, logs, onNeedMoreLogs, type } = this.props;

    if (!logs) return <Spinner />;
    if (!logs.length) return <FormattedMessage id={`stripes-erm-components.${type}LogNo`} />;

    const resultsFormatter = {           // this worked previously but without the line breaks; not used right now
      additionalInfo: item => `Package source: ${item.additionalInfo.packageSource}<br />
                               Package reference: ${item.additionalInfo.packageReference}`,
                               // to be continued with ${item.additionalInfo.rowNumber}
                               //                      ${item.additionalInfo.recordNumber}`,
    };

    return (
      <MultiColumnList
        columnMapping={{
          additionalInfo: <div>
              <FormattedMessage id="stripes-erm-components.packageSource" tagName="div" values={{ source: packageSource }} />
              <FormattedMessage id="stripes-erm-components.packageReference" tagName="div" values={{ ref: packageReference }} />
          </div>,
          message: <FormattedMessage id={`stripes-erm-components.columns.${type}LogMessage`} />,
        }}
        contentData={logs}
        // formatter={resultsFormatter}
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
