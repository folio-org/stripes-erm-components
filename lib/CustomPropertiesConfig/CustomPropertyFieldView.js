import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { get } from 'lodash';
import { Button, Card, Col, Row, KeyValue } from '@folio/stripes/components';

const TYPE_CLASS_PREFIX = 'com.k_int.web.toolkit.custprops.types.CustomProperty';
const REFDATA_CLASS_NAME = 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata';

export default class CustomPropertyFieldView extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.shape({
        type: PropTypes.string,
      }).isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    pickLists: PropTypes.arrayOf(PropTypes.object),
    settingsRoute: PropTypes.string,
  }

  renderPickList = () => {
    const pickList = this.props.pickLists.find(p => p.value === get(this.props, 'input.value.category'));

    return pickList ? pickList.label : '-';
  }

  renderType = () => {
    const type = this.props.input.value.type.split(TYPE_CLASS_PREFIX)[1].toLowerCase();
    const translationKey = `stripes-erm-components.customProperties.type.${type}`;
    return <FormattedMessage id={translationKey} />;
  }

  render() {
    const {
      input: { value = {} },
      onDelete,
      onEdit,
      settingsRoute,
    } = this.props;

    const translationKey = (settingsRoute === 'terms') ? 'Term' : 'SupplementaryProperty';

    return (
      <Card
        data-test-customproperty={value.name}
        headerStart={(settingsRoute === 'terms') ?
          <strong><FormattedMessage id="stripes-erm-components.customProperties.term" /></strong> :
          <strong><FormattedMessage id="stripes-erm-components.customProperties.supplementaryProperty" /></strong>
        }
        headerEnd={(
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
              marginBottom0
              data-test-customproperty-edit-btn
              onClick={onEdit}
            >
              <FormattedMessage id="stripes-core.button.edit" />
            </Button>
          </span>
        )}
      >
        <Row>
          <Col xs={6}>
            <KeyValue
              data-test-customproperty-label
              label={<FormattedMessage id="stripes-erm-components.customProperties.label" />}
              value={value.label}
            />
          </Col>
          <Col xs={6}>
            <KeyValue
              data-test-customproperty-name
              label={<FormattedMessage id="stripes-erm-components.customProperties.name" />}
              value={value.name}
            />
          </Col>
        </Row>
        <KeyValue
          data-test-customproperty-description
          label={<FormattedMessage id="stripes-erm-components.customProperties.description" />}
          value={value.description}
        />
        <Row>
          <Col xs={4}>
            <KeyValue
              data-test-customproperty-weight
              label={<FormattedMessage id="stripes-erm-components.customProperties.orderWeight" />}
              value={value.weight}
            />
          </Col>
          <Col xs={4}>
            <KeyValue
              data-test-customproperty-primary
              label={<FormattedMessage id={`stripes-erm-components.customProperties.primary${translationKey}`} />}
              value={<FormattedMessage id={value.primary ? 'stripes-erm-components.yes' : 'stripes-erm-components.no'} />}
            />
          </Col>
          <Col xs={4}>
            <KeyValue
              data-test-customproperty-defaultinternal
              label={<FormattedMessage id="stripes-erm-components.customProperties.defaultVisibility" />}
              value={<FormattedMessage id={value.defaultInternal ? 'stripes-erm-components.customProperty.internalTrue' : 'stripes-erm-components.customProperty.internalFalse'} />}
            />
          </Col>
          <Col xs={6}>
            {value.type && value.type.indexOf(TYPE_CLASS_PREFIX) === 0 &&
              <KeyValue
                data-test-customproperty-type
                label={<FormattedMessage id="stripes-erm-components.customProperties.type" />}
                value={this.renderType()}
              />
            }
          </Col>
          <Col xs={6}>
            {value.type === REFDATA_CLASS_NAME &&
              <KeyValue
                data-test-customproperty-picklist
                label={<FormattedMessage id="stripes-erm-components.customProperties.pickList" />}
                value={this.renderPickList()}
              />
            }
          </Col>
        </Row>
      </Card>
    );
  }
}
