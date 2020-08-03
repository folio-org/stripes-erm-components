import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Card, Col, Row, KeyValue } from '@folio/stripes/components';

const TYPE_CLASS_PREFIX =
  'com.k_int.web.toolkit.custprops.types.CustomProperty';
const REFDATA_CLASS_NAME =
  'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata';

export default class CustomPropertyFieldView extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.shape({
        category: PropTypes.string,
        type: PropTypes.string,
      }).isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    pickLists: PropTypes.arrayOf(PropTypes.object),
    translationKey: PropTypes.string,
  };

  renderPickList = () => {
    const { input } = this.props;
    const pickList = this.props.pickLists.find(
      p => p.value === input?.value?.category
    );

    return pickList ? pickList.label : '-';
  };

  renderType = () => {
    const type = this.props.input.value.type
      .split(TYPE_CLASS_PREFIX)[1]
      .toLowerCase();
    const translationKey = `stripes-erm-components.customProperties.type.${type}`;
    return <FormattedMessage id={translationKey} />;
  };

  render() {
    const {
      input: { value = {} },
      onDelete,
      onEdit,
      translationKey,
    } = this.props;

    return (
      <Card
        data-test-customproperty={value.name}
        headerEnd={
          <span>
            <Button
              buttonStyle="danger"
              data-test-customproperty-delete-btn
              marginBottom0
              onClick={onDelete}
            >
              <FormattedMessage id="stripes-core.button.delete" />
            </Button>
            <Button
              data-test-customproperty-edit-btn
              marginBottom0
              onClick={onEdit}
            >
              <FormattedMessage id="stripes-core.button.edit" />
            </Button>
          </span>
        }
        headerStart={
          <strong>
            <FormattedMessage
              id={`stripes-erm-components.customProperties.${translationKey}`}
            />
          </strong>
        }
      >
        <Row>
          <Col xs={6}>
            <KeyValue
              data-test-customproperty-label
              label={
                <FormattedMessage id="stripes-erm-components.customProperties.label" />
              }
              value={value.label}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              data-test-customproperty-name
              label={
                <FormattedMessage id="stripes-erm-components.customProperties.name" />
              }
              value={value.name}
            />
          </Col>
        </Row>
        <KeyValue
          data-test-customproperty-description
          label={
            <FormattedMessage id="stripes-erm-components.customProperties.description" />
          }
          value={value.description}
        />
        <Row>
          <Col xs={4}>
            <KeyValue
              data-test-customproperty-weight
              label={
                <FormattedMessage id="stripes-erm-components.customProperties.orderWeight" />
              }
              value={value.weight}
            />
          </Col>
          <Col xs={4}>
            <KeyValue
              data-test-customproperty-primary
              label={
                <FormattedMessage
                  id={`stripes-erm-components.customProperties.${translationKey}.primary`}
                />
              }
              value={
                <FormattedMessage
                  id={
                    value.primary
                      ? 'stripes-erm-components.yes'
                      : 'stripes-erm-components.no'
                  }
                />
              }
            />
          </Col>
          <Col xs={4}>
            <KeyValue
              data-test-customproperty-defaultinternal
              label={
                <FormattedMessage id="stripes-erm-components.customProperties.defaultVisibility" />
              }
              value={
                <FormattedMessage
                  id={
                    value.defaultInternal
                      ? 'stripes-erm-components.customProperty.internalTrue'
                      : 'stripes-erm-components.customProperty.internalFalse'
                  }
                />
              }
            />
          </Col>
          <Col xs={6}>
            {value.type && value.type.indexOf(TYPE_CLASS_PREFIX) === 0 && (
              <KeyValue
                data-test-customproperty-type
                label={
                  <FormattedMessage id="stripes-erm-components.customProperties.type" />
                }
                value={this.renderType()}
              />
            )}
          </Col>
          <Col xs={6}>
            {value.type === REFDATA_CLASS_NAME && (
              <KeyValue
                data-test-customproperty-picklist
                label={
                  <FormattedMessage id="stripes-erm-components.customProperties.pickList" />
                }
                value={this.renderPickList()}
              />
            )}
          </Col>
        </Row>
      </Card>
    );
  }
}
