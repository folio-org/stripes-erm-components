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

class AlternateNamesFieldArray extends React.Component {
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
                component={TextField}
                index={index}
                name={`${name}[${index}].name`}
              />
            </Col>
            <Col xs={1}>
              <IconButton
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
            <FormattedMessage id="stripes-erm-components.alternateNames" />
          </Headline>
          <div id="agreement-form-alternate-names">
            {this.renderNames()}
          </div>
          <Button id="add-alternate-name-button" onClick={() => this.props.onAddField()}>
            <FormattedMessage id="stripes-erm-components.alternateNames.addAlternateName" />
          </Button>
        </div>
      );
    }
}

export default withKiwtFieldArray(AlternateNamesFieldArray);
