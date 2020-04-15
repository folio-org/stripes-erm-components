import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Button,
  Col,
  Headline,
  IconButton,
  TextField,
  Row,
} from '@folio/stripes/components';

import withKiwtFieldArray from '../withKiwtFieldArray';

class AlternativeNamesFieldArray extends React.Component {
    static propTypes = {
      items: PropTypes.arrayOf(PropTypes.object),
      name: PropTypes.string.isRequired,
      onAddField: PropTypes.func.isRequired,
      onDeleteField: PropTypes.func.isRequired,
    }

    static defaultProps = {
      items: [],
    }

    renderNames = () => {
      const { items, name, onDeleteField } = this.props;
      return items.map((item, index) => (
        <div key={index}>
          <Row>
            <Col xs={11}>
              <Field
                autoFocus
                component={TextField}
                data-test-alternative-names-field
                index={index}
                name={`${name}[${index}].name`}
              />
            </Col>
            <Col xs={1}>
              <IconButton
                data-test-delete-field-button
                icon="trash"
                onClick={() => onDeleteField(index, item)}
              />
            </Col>
          </Row>
        </div>
      ));
    }

    render = () => {
      return (
        <div>
          <Headline>
            <FormattedMessage id="stripes-erm-components.alternativeNames" />
          </Headline>
          <div
            data-test-alternative-names-field-array
            id="alternative-names-form"
          >
            {this.renderNames()}
          </div>
          <Button
            data-test-alternative-names-field-array-add-button
            id="add-alternative-name-button"
            onClick={() => this.props.onAddField()}
          >
            <FormattedMessage id="stripes-erm-components.alternativeNames.addAlternativeName" />
          </Button>
        </div>
      );
    }
}

export default withKiwtFieldArray(AlternativeNamesFieldArray);
