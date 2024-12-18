import PropTypes from 'prop-types';
import { Button, Row, Col, Label } from '@folio/stripes/components';
import { useForm, useFormState } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage } from 'react-intl';
import DocumentFilterRule from './DocumentFilterRule';

const DocumentFilterField = ({
  categoryValues,
  filterName,
  index,
  name
}) => {
  const {
    mutators: { push },
  } = useForm();
  const { values } = useFormState();
  const renderRuleComponent = (ruleFields, ruleFieldName, ruleFieldIndex) => {
    return (
      <DocumentFilterRule
        key={ruleFieldName}
        ariaLabelledby={`selected-document-item-name-${index}`}
        categoryValues={categoryValues}
        filterName={filterName}
        index={ruleFieldIndex}
        name={ruleFieldName}
        onDelete={() => ruleFields.remove(ruleFieldIndex)}
        value={values.filters[index]?.rules[ruleFieldIndex]}
      />
    );
  };

  return (
    <>
      <Row>
        <Col xs={2} />
        <Col xs={3}>
          <Label id="rule-column-header-attribute" required>
            <FormattedMessage id="stripes-erm-components.documentFilter.attribute" />
          </Label>
        </Col>
        <Col xs={3}>
          <Label id="rule-column-header-comparator" required>
            <FormattedMessage id="stripes-erm-components.comparator" />
          </Label>
        </Col>
        <Col xs={3}>
          <Label id="rule-column-header-value" required>
            <FormattedMessage id="stripes-erm-components.value" />
          </Label>
        </Col>
        <Col xs={1} />
      </Row>

      <FieldArray name={`${name}.rules`}>
        {({ fields: ruleFields }) => ruleFields.map((ruleFieldName, ruleFieldIndex) => (
          renderRuleComponent(ruleFields, ruleFieldName, ruleFieldIndex)
        ))
        }
      </FieldArray>
      <Button
        data-test-add-rule-btn
        id={`add-rule-button-${name}`}
        onClick={() => push(`${name}.rules`)}
      >
        <FormattedMessage id="stripes-erm-components.documentFilter.addRule" />
      </Button>
    </>
  );
};

DocumentFilterField.propTypes = {
  categoryValues: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number,
  name: PropTypes.string,
  filterName: PropTypes.string,
};

export default DocumentFilterField;
