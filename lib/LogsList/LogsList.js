import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { MultiColumnList, NoValue, Spinner } from '@folio/stripes/components';

const RESULT_COUNT_INCREMENT = 100;
export default class LogsList extends React.Component {
    static propTypes = {
        job: PropTypes.object,
        logs: PropTypes.arrayOf(PropTypes.shape({
            recordDescriptor: PropTypes.string,
            message: PropTypes.string,
        })),
        onNeedMoreLogs: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired,
    };

    resultsFormatter = {
        recordDescriptor: ({ additionalInfo }) => {
            return (
                <div>
                    {additionalInfo.packageSource ? <FormattedMessage id="stripes-erm-components.packageSource" tagName="div" values={{ source: additionalInfo.packageSource }} /> : null}
                    {additionalInfo.packageReference ? <FormattedMessage id="stripes-erm-components.packageReference" tagName="div" values={{ ref: additionalInfo.packageReference }} /> : null}
                    {additionalInfo.rowNumber ? <FormattedMessage id="stripes-erm-components.rowNumber" tagName="div" values={{ rownumber: additionalInfo.rowNumber }} /> : null}
                    {additionalInfo.recordNumber ? <FormattedMessage id="stripes-erm-components.recordNumber" tagName="div" values={{ recordnumber: additionalInfo.recordNumber }} /> : null}
                </div>
            );
        }
    }

    render() {
        const { job, logs, onNeedMoreLogs, type } = this.props;

        if (!logs) return <Spinner />;
        if (!logs.length) return <FormattedMessage id={`stripes-erm-components.${type}LogNo`} />;

        return (
            <MultiColumnList
                columnMapping={{
                    recordDescriptor: <FormattedMessage id="stripes-erm-components.columns.recordDescriptor" />,
                    message: <FormattedMessage id={`stripes-erm-components.columns.${type}LogMessage`} />,
                }}
                contentData={logs}
                formatter={this.resultsFormatter}
                id={`list-${type}Log`}
                interactive={false}
                maxHeight={800}
                onNeedMoreData={onNeedMoreLogs}
                pageAmount={RESULT_COUNT_INCREMENT}
                pagingType="click"
                totalCount={job[`${type}LogCount`]}
                virtualize
                visibleColumns={['recordDescriptor', 'message']}
            />
        );
    }
}
