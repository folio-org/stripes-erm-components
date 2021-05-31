import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { Col, KeyValue, Row, NoValue } from '@folio/stripes/components';

import LicenseEndDate from '../LicenseEndDate';

export default class LicenseCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    license: PropTypes.shape({
      endDate: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
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

  renderPrimaryOrg = () => {
    const { license: { orgs = [] } } = this.props;
    const primaryOrg = orgs.find(o => o.primaryOrg === true);
    return primaryOrg?.org?.name || <FormattedMessage id="stripes-erm-components.licenseCard.notSet" />;
  }

  renderName = () => {
    const { license, renderName } = this.props;
    const { location } = window.document;

    if (!renderName) return null;

    const alreadyInLicensesApp = location.pathname.startsWith('/licenses/');

    const name = license.name || <FormattedMessage id="stripes-erm-components.licenseCard.unknownLicense" />;
    const ComponentType = license.id ? Link : 'span';

    return (
      <ComponentType
        data-test-license-card-name
        to={`/licenses/${license.id}${alreadyInLicensesApp ? location.search : ''}`}
      >
        {name}
      </ComponentType>
    );
  }

  render() {
    const { license, className } = this.props;

    return (
      <div className={className}>
        { this.renderName() }
        <Row>
          <Col md={2} xs={6}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.licenseCard.type" />}>
              <div data-test-license-card-type>
                {license?.type?.label ?? <NoValue />}
              </div>
            </KeyValue>
          </Col>
          <Col md={2} xs={6}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.licenseCard.status" />}>
              <div data-test-license-card-status>
                {license?.status?.label ?? <NoValue />}
              </div>
            </KeyValue>
          </Col>
          <Col md={2} xs={6}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.licenseCard.startDate" />}>
              <div data-test-license-card-start-date>
                {license.startDate ? <FormattedDate timeZone="UTC" value={license.startDate} /> : <NoValue />}
              </div>
            </KeyValue>
          </Col>
          <Col md={3} xs={6}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.licenseCard.endDate" />}>
              <div data-test-license-card-end-date>
                <LicenseEndDate license={license} />
              </div>
            </KeyValue>
          </Col>
          <Col md={3} xs={6}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.licenseCard.primaryOrg" />}>
              <div data-test-license-card-primary-org-name>
                {this.renderPrimaryOrg()}
              </div>
            </KeyValue>
          </Col>
        </Row>
      </div>
    );
  }
}
