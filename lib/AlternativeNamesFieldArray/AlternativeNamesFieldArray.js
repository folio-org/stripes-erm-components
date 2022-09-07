import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Button,
  Col,
  Headline,
  IconButton,
  Row,
} from '@folio/stripes/components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';
import AlternativeNamesField from './AlternativeNamesField';

const AlternativeNamesFieldArray = ({ fields: { name } }) => {
  const {
    items,
    onAddField,
    onDeleteField
  } = useKiwtFieldArray(name);

  const renderNames = () => {
    return items.map((item, index) => (
      <div
        key={index}
        data-test-render-alternative-names
        data-testid={`alternativeNamesFieldArray[${index}]`}
      >
        <Row>
          <Col xs={11}>
            <Field
              component={AlternativeNamesField}
              id={`${name}-${index}-name`}
              name={`${name}[${index}].name`}
            />
          </Col>
          <Col xs={1}>
            <IconButton
              ariaLabel={`remove-alternative-name[${index}]-${item.name}`}
              data-test-delete-field-button
              icon="trash"
              onClick={() => onDeleteField(index, item)}
            />
          </Col>
        </Row>
      </div>
    ));
  };

  return (
    <div>
      <Headline>
        <FormattedMessage id="stripes-erm-components.alternativeNames" />
      </Headline>
      <div
        data-test-alternative-names-field-array
        id="alternative-names-form"
      >
        {renderNames()}
      </div>
      <Button
        data-test-alternative-names-field-array-add-button
        id="add-alternative-name-button"
        onClick={() => onAddField()}
      >
        <FormattedMessage id="stripes-erm-components.alternativeNames.addAlternativeName" />
      </Button>
    </div>
  );
};

AlternativeNamesFieldArray.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default AlternativeNamesFieldArray;
