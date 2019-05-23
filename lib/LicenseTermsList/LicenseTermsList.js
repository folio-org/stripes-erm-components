import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  InfoPopover,
  KeyValue,
  Layout,
  Row
} from '@folio/stripes/components';

import Card from '../Card';

export default class LicenseTermsList extends React.Component {
  static propTypes = {
    license: PropTypes.shape({ customProperties: PropTypes.object }),
    terms: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      primary: PropTypes.bool,
    })),
  };

  renderTerm = (term, index) => {
    let value = get(this.props.license, ['customProperties', term.name, '0', 'value']);

    if (value === undefined) {
      if (term.primary) value = <FormattedMessage id="stripes-erm-components.licenseTermsList.notSet" />;
      else return null;
    }

    if (typeof value === 'object' && value.label) {
      value = value.label;
    }

    const note = get(this.props.license, ['customProperties', term.name, '0', 'note']);

    return (
      <Layout key={index}>
        <Card
          id="term-card"
          header={
            <Col xs={12}>
              <strong data-test-term-label={term.name}>{term.label}</strong>
              {term.description ? <InfoPopover data-test-info-popover content={term.description} /> : null}
            </Col>
          }
        >
          <Row>
            <Col xs={6}>
              <KeyValue label={<FormattedMessage id="stripes-erm-components.term.value" />}>
                <span data-test-term-value={term.name}>{value}</span>
              </KeyValue>
            </Col>
            { note ? (
              <Col xs={6}>
                <KeyValue label={<FormattedMessage id="stripes-erm-components.term.note" />}>
                  <span data-test-term-note={term.name}>{note}</span>
                </KeyValue>
              </Col>
            ) : null
            }
          </Row>
        </Card>
      </Layout>
    );
  }

  render() {
    return (
      this.props.terms.map(this.renderTerm)
    );
  }
}
