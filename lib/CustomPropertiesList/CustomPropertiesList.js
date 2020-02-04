import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col, InfoPopover, KeyValue, Row } from '@folio/stripes/components';

import Card from '../Card';

export default class CustomPropertiesList extends React.Component {
  static propTypes = {
    resource: PropTypes.shape({ customProperties: PropTypes.object }),
    customProperties: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        label: PropTypes.string,
        name: PropTypes.string,
        primary: PropTypes.bool,
        defaultInternal: PropTypes.bool,
      })
    ),
  };

  renderVisibility = (internal, customProperty) => {
    const internalId =
      internal === false ||
      (internal === undefined && customProperty.defaultInternal === false)
        ? 'internalFalse'
        : 'internalTrue';

    return (
      <span data-test-customproperty-visibility={customProperty.name}>
        <FormattedMessage
          id={`stripes-erm-components.customProperty.${internalId}`}
        />
      </span>
    );
  };

  renderCustomProperty = (customProperty = {}, index) => {
    const { resource } = this.props;
    let value = resource?.customProperties?.[customProperty.name]?.[0]?.value;

    if (value === undefined) {
      if (customProperty.primary) {
        value = (
          <FormattedMessage id="stripes-erm-components.customPropertiesList.notSet" />
        );
      } else return null;
    }

    if (typeof value === 'object' && value.label) {
      value = value.label;
    }

    const { internal, note: internalNote, publicNote } =
      resource?.customProperties?.[customProperty?.name]?.[0] || {};

    return (
      <Card
        data-test-customproperty
        id={`customproperty-card-${index}`}
        header={
          <div>
            <strong data-test-customproperty-label={customProperty.name}>
              {customProperty.label}
            </strong>
            {customProperty.description ? (
              <InfoPopover
                data-test-info-popover
                content={customProperty.description}
              />
            ) : null}
          </div>
        }
        key={index}
      >
        <Row>
          <Col xs={6}>
            <KeyValue
              label={
                <FormattedMessage id="stripes-erm-components.customProperty.value" />
              }
            >
              <span data-test-customproperty-value={customProperty.name}>
                {value}
              </span>
            </KeyValue>
          </Col>
          {internalNote ? (
            <Col xs={6}>
              <KeyValue
                label={
                  <FormattedMessage id="stripes-erm-components.customProperty.internalNote" />
                }
              >
                <span
                  data-test-customproperty-note={customProperty.name}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {internalNote}
                </span>
              </KeyValue>
            </Col>
          ) : null}
        </Row>
        <Row>
          <Col xs={6}>
            <KeyValue
              label={
                <FormattedMessage id="stripes-erm-components.customProperty.visibility" />
              }
            >
              {this.renderVisibility(internal, customProperty)}
            </KeyValue>
          </Col>
          {internal === false ||
          (internal === undefined &&
            customProperty.defaultInternal === false) ? (
              <Col xs={6}>
                <KeyValue
                  label={
                    <FormattedMessage id="stripes-erm-components.customProperty.publicNote" />
                }
                >
                  {publicNote ? (
                    <span
                      data-test-customproperty-public-note={customProperty.name}
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {publicNote}
                    </span>
                  ) : (
                    '-'
                  )}
                </KeyValue>
              </Col>
            ) : null}
        </Row>
      </Card>
    );
  };

  render() {
    return this.props.customProperties.map(this.renderCustomProperty);
  }
}
