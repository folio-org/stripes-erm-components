import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import {
  Col,
  InfoPopover,
  KeyValue,
  Row
} from '@folio/stripes/components';

import Card from '../Card';

export default class CustomPropertiesList extends React.Component {
  static propTypes = {
    resource: PropTypes.shape({ customProperties: PropTypes.object }),
    customProperties: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      primary: PropTypes.bool,
      defaultInternal: PropTypes.bool,
    })),
  };

  renderVisibility = (internal, term) => {
    const internalId = ((internal === false) || (internal === undefined && term.defaultInternal === false)) ? 'internalFalse' : 'internalTrue';

    return (
      <span data-test-term-visibility={term.name}>
        <FormattedMessage id={`stripes-erm-components.term.${internalId}`} />
      </span>
    );
  }

  renderTerm = (term, index) => {
    let value = get(this.props.resource, ['customProperties', term.name, '0', 'value']);

    if (value === undefined) {
      if (term.primary) value = <FormattedMessage id="stripes-erm-components.customPropertiesList.notSet" />;
      else return null;
    }

    if (typeof value === 'object' && value.label) {
      value = value.label;
    }

    const {
      internal,
      note: internalNote,
      publicNote,
    } = get(this.props.resource, ['customProperties', term.name, 0], {});

    return (
      <Card
        data-test-term
        id={`term-card-${index}`}
        header={
          <div>
            <strong data-test-term-label={term.name}>{term.label}</strong>
            {term.description ? <InfoPopover data-test-info-popover content={term.description} /> : null}
          </div>
        }
        key={index}
      >
        <Row>
          <Col xs={6}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.term.value" />}>
              <span data-test-term-value={term.name}>{value}</span>
            </KeyValue>
          </Col>
          {internalNote ? (
            <Col xs={6}>
              <KeyValue label={<FormattedMessage id="stripes-erm-components.term.internalNote" />}>
                <span data-test-term-note={term.name} style={{ whiteSpace: 'pre-wrap' }}>{internalNote}</span>
              </KeyValue>
            </Col>
          ) : null
          }
        </Row>
        <Row>
          <Col xs={6}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.term.visibility" />}>
              {this.renderVisibility(internal, term)}
            </KeyValue>
          </Col>
          {(internal === false || (internal === undefined && term.defaultInternal === false)) ? (
            <Col xs={6}>
              <KeyValue label={<FormattedMessage id="stripes-erm-components.term.publicNote" />}>
                {publicNote ? (
                  <span data-test-term-public-note={term.name} style={{ whiteSpace: 'pre-wrap' }}>{publicNote}</span>
                ) : '-'
                }
              </KeyValue>
            </Col>
          ) : null
          }
        </Row>
      </Card>
    );
  }

  render() {
    return (
      this.props.customProperties.map(this.renderTerm)
    );
  }
}
