import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { Col, KeyValue, Row } from '@folio/stripes/components';

export default class LicenseCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    license: PropTypes.shape({
      endDate: PropTypes.string,
      openEnded: PropTypes.bool,
      orgs: PropTypes.arrayOf(
        PropTypes.shape({
          org: PropTypes.shape({
            name: PropTypes.string,
          }),
          role: PropTypes.shape({
            value: PropTypes.string,
          }),
        }),
      ),
      startDate: PropTypes.string,
      status: PropTypes.shape({
        label: PropTypes.string,
      }),
      type: PropTypes.shape({
        label: PropTypes.string,
      }),
    }),
    renderName: PropTypes.bool,
  }

  static defaultProps = {
    license: {},
    renderName: true,
  }


  renderEndDate() {
    const { license } = this.props;
    if (license.openEnded) return <FormattedMessage id="stripes-erm-components.licenseCard.openEnded" />;
    if (license.endDate) return <FormattedDate value={license.endDate} />;

    return '-';
  }

  renderLicensor = () => {
    const { license: { orgs = [] } } = this.props;
    const licensor = orgs.find(o => get(o, ['role', 'value']) === 'licensor');
    const licensorName = get(licensor, ['org', 'name']) || <FormattedMessage id="stripes-erm-components.licenseCard.notSet" />;

    return licensorName;
  }

  renderName = () => {
    const { license, renderName } = this.props;

    if (!renderName) return null;

    return (
      <Row>
        <Col xs={12}>
          <strong>
            {license.name}
          </strong>
        </Col>
      </Row>
    );
  }

  render() {
    const { license, className } = this.props;

    return (
      <div className={className}>
        { this.renderName() }
        <Row>
          <Col xs={2}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.licenseCard.type" />}>
              <div data-test-license-card-type>
                {get(license, ['type', 'label'], '-')}
              </div>
            </KeyValue>
          </Col>
          <Col xs={2}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.licenseCard.status" />}>
              <div data-test-license-card-status>
                {get(license, ['status', 'label'], '-')}
              </div>
            </KeyValue>
          </Col>
          <Col xs={2}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.licenseCard.startDate" />}>
              <div data-test-license-card-start-date>
                {license.startDate ? <FormattedDate value={license.startDate} /> : '-'}
              </div>
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.licenseCard.endDate" />}>
              <div data-test-license-card-end-date>
                {this.renderEndDate()}
              </div>
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.licenseCard.licensor" />}>
              <div data-test-license-card-licensor-name>
                {this.renderLicensor()}
              </div>
            </KeyValue>
          </Col>
        </Row>
      </div>
    );
  }
}
