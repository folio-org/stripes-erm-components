import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Layout } from '@folio/stripes/components';

export default class Embargo extends React.Component {
    static propTypes = {
      alignment: PropTypes.string,
      embargo: PropTypes.shape({
        movingWallStart: PropTypes.shape({
          length: PropTypes.number,
          unit: PropTypes.string
        }),
        movingWallEnd: PropTypes.shape({
          length: PropTypes.number,
          unit: PropTypes.string
        })
      })
    }

    renderEmbargoEnd(embargo, className) {
      if (embargo.movingWallEnd?.length) {
        const unitId = `stripes-erm-components.${embargo.movingWallEnd.unit}`;
        const number = embargo.movingWallEnd.length;
        return (
          <Layout
            className={className}
            data-test-embargo-end
            data-test-embargo-end-length={number}
            data-test-embargo-end-unit={embargo.movingWallEnd.unit}
          >
            <FormattedMessage id="stripes-erm-components.embargo.end" tagName="div" />
            <FormattedMessage id={unitId} tagName="div" values={{ count: number }} />
          </Layout>
        );
      }
      return null;
    }

    renderEmbargoStart(embargo, className) {
      if (embargo.movingWallStart?.length) {
        const unitId = `stripes-erm-components.${embargo.movingWallStart.unit}`;
        const number = embargo.movingWallStart.length;
        return (
          <Layout
            className={className}
            data-test-embargo-start
            data-test-embargo-start-length={number}
            data-test-embargo-start-unit={embargo.movingWallStart.unit}
          >
            <FormattedMessage id="stripes-erm-components.embargo.start" tagName="div" />
            <FormattedMessage id={unitId} tagName="div" values={{ count: number }} />
          </Layout>
        );
      }
      return null;
    }

    render() {
      const { alignment, embargo } = this.props;
      if (!embargo) return null;

      const className = alignment ? `flex ${alignment}` : 'flex';

      return (
        <Layout className="full" data-test-embargo>
          {this.renderEmbargoStart(embargo, className)}
          {this.renderEmbargoEnd(embargo, className)}
        </Layout>
      );
    }
}
