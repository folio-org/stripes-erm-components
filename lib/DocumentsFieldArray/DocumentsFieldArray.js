import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  Button,
  Col,
  IconButton,
  Layout,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';

import withKiwtFieldArray from '../withKiwtFieldArray';

import css from './DocumentsFieldArray.css';

class DocumentsFieldArray extends React.Component {
  static propTypes = {
    addDocBtnLabel: PropTypes.node,
    isEmptyMessage: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    onAddField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    documentCategories: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    addDocBtnLabel: <FormattedMessage id="stripes-erm-components.doc.addDoc" />,
    isEmptyMessage: <FormattedMessage id="stripes-erm-components.doc.noDocs" />,
  }

  validateDocIsSpecified = (value, allValues, props, name) => {
    const index = parseInt(/\[([0-9]*)\]/.exec(name)[1], 10);
    const { location, url } = get(allValues, [this.props.name, index], {});
    if (!location && !url) {
      return <FormattedMessage id="stripes-erm-components.doc.error.docsMustHaveLocationOrURL" />;
    }

    return undefined;
  }

  validateURLIsValid = (value) => {
    if (value) {
      try {
        // Test if the URL is valid
        new URL(value); // eslint-disable-line no-new
      } catch (_) {
        return <FormattedMessage id="stripes-erm-components.doc.error.invalidURL" />;
      }
    }

    return undefined;
  }

  validateRequired = (value) => (
    !value ? <FormattedMessage id="stripes-core.label.missingRequiredField" /> : undefined
  )

  renderCategory = (i) => {
    const { documentCategories, name } = this.props;
    return (
      <Row>
        <Col xs={11}>
          <FormattedMessage id="stripes-erm-components.placeholder.documentCategory">
            {placeholder => (
              <Field
                component={Select}
                dataOptions={documentCategories}
                id={`${name}-category-${i}`}
                label={<FormattedMessage id="stripes-erm-components.doc.category" />}
                name={`${name}[${i}].atType`}
                placeholder={placeholder}
              />
            )}
          </FormattedMessage>
        </Col>
      </Row>
    );
  }

  renderDocs = () => {
    const { documentCategories, items, name, onDeleteField } = this.props;

    return items.map((doc, i) => (
      <div className={css.doc} key={i}>
        <Row>
          <Col xs={11}>
            <Field
              component={TextField}
              id={`${name}-name-${i}`}
              label={<FormattedMessage id="stripes-erm-components.doc.name" />}
              name={`${name}[${i}].name`}
              required
              validate={this.validateRequired}
            />
          </Col>
          <Col xs={1}>
            <IconButton
              icon="trash"
              id={`${name}-delete-${i}`}
              onClick={() => onDeleteField(i, doc)}
            />
          </Col>
        </Row>
        { documentCategories ? this.renderCategory(i) : '' }
        <Row>
          <Col xs={11}>
            <Field
              component={TextArea}
              id={`${name}-note-${i}`}
              label={<FormattedMessage id="stripes-erm-components.doc.note" />}
              name={`${name}[${i}].note`}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={11}>
            <Field
              component={TextField}
              id={`${name}-location-${i}`}
              label={<FormattedMessage id="stripes-erm-components.doc.location" />}
              name={`${name}[${i}].location`}
              validate={this.validateDocIsSpecified}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={11}>
            <Field
              component={TextField}
              id={`${name}-url-${i}`}
              label={<FormattedMessage id="stripes-erm-components.doc.url" />}
              name={`${name}[${i}].url`}
              validate={[
                this.validateDocIsSpecified,
                this.validateURLIsValid,
              ]}
            />
          </Col>
        </Row>
      </div>
    ));
  }

  renderEmpty = () => (
    <Layout className="padding-bottom-gutter">
      { this.props.isEmptyMessage }
    </Layout>
  )

  render() {
    const { items, name, onAddField } = this.props;

    return (
      <div>
        <div>
          { items.length ? this.renderDocs() : this.renderEmpty() }
        </div>
        <Button id={`add-${name}-btn`} onClick={() => onAddField({})}>
          { this.props.addDocBtnLabel }
        </Button>
      </div>
    );
  }
}

export default withKiwtFieldArray(DocumentsFieldArray);
