import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  InfoPopover,
  Layout,
  Row
} from '@folio/stripes/components';

export default class LicenseTermsList extends React.Component {
  static propTypes = {
    license: PropTypes.shape({ customProperties: PropTypes.object }),
    terms: PropTypes.arrayOf(PropTypes.shape({
      primary: PropTypes.bool,
      name: PropTypes.string,
      description: PropTypes.string,
      label: PropTypes.string,
    })),
  };

  renderTerm = (term, index) => {
    let value = get(this.props.license, ['customProperties', term.name, '0', 'value']);

    if (value === undefined) {
      if (term.primary) value = <FormattedMessage id="licenseTermsList.notSet" />;
      else return null;
    }

    if (typeof value === 'object' && value.label) {
      value = value.label;
    }

    return (
      <Layout className="padding-top-gutter" key={index}>
        <Row>
          <Col xs={12} md={4}>
            {term.description ? <InfoPopover content={term.description} /> : null}
            <strong data-test-term-label={term.name}>{term.label}</strong>
          </Col>
          <Col xs={12} md={8}>
            <span data-test-term-value={term.name}>{value}</span>
          </Col>
        </Row>
      </Layout>
    );
  }

  render() {
    const { terms } = this.props;

    return (
      terms.map(this.renderTerm)
    );
  }
}
