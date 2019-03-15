import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import {
  Accordion,
  Col,
  InfoPopover,
  Layout,
  Row
} from '@folio/stripes/components';

export default class LicenseTerms extends React.Component {
  static propTypes = {
    license: PropTypes.shape({ customProperties: PropTypes.object }),
    id: PropTypes.string,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
    parentResources: PropTypes.shape({
      terms: PropTypes.object,
    }),
  };

  /*  static defaultProps = {
    license: {},
  } */

  renderTerm = (term, index) => {
    const { license } = this.props;
    let value = get(license, ['customProperties', term.name, '0', 'value']);

    if (value === undefined) {
      if (term.primary) value = <FormattedMessage id="stripes-erm-components.licenseTermsList.notSet" />;
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
    const { id, onToggle, open, parentResources } = this.props;
    const terms = get(parentResources, ['terms', 'records'], []);

    return (
      <Accordion
        id={id}
        label={<FormattedMessage id="stripes-erm-components.licenseTermsList.terms" />}
        open={open}
        onToggle={onToggle}
      >
        {terms.map(this.renderTerm)}
      </Accordion>
    );
  }
}
