import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  Button,
  Col,
  Layout,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';

import EditCard from '../EditCard';
import FileUploaderField from './FileUploaderField';
import withKiwtFieldArray from '../withKiwtFieldArray';

class DocumentsFieldArray extends React.Component {
  static propTypes = {
    addDocBtnLabel: PropTypes.node,
    onDeleteFile: PropTypes.func.isRequired,
    onUploadFile: PropTypes.func.isRequired,
    isEmptyMessage: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    onAddField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    documentCategories: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
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
        <Col xs={12}>
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
    const {
      documentCategories,
      onUploadFile,
      onDeleteFile,
      items,
      name,
      onDeleteField
    } = this.props;

    return items.map((doc, i) => (
      <EditCard
        deleteBtnProps={{ 'data-test-delete-field-button': true }}
        header={<FormattedMessage id="stripes-erm-components.doc.title" values={{ number: i + 1 }} />}
        key={i}
        onDelete={() => onDeleteField(i, doc)}
      >
        <Row>
          <Col xs={12} md={onUploadFile ? 6 : 12}>
            <Row>
              <Col xs={12}>
                <Field
                  data-test-document-field-name
                  component={TextField}
                  id={`${name}-name-${i}`}
                  label={<FormattedMessage id="stripes-erm-components.doc.name" />}
                  name={`${name}[${i}].name`}
                  required
                  validate={this.validateRequired}
                />
              </Col>
            </Row>
            { documentCategories ? this.renderCategory(i) : null }
            <Row>
              <Col xs={12}>
                <Field
                  data-test-document-field-note
                  component={TextArea}
                  id={`${name}-note-${i}`}
                  label={<FormattedMessage id="stripes-erm-components.doc.note" />}
                  name={`${name}[${i}].note`}
                />
              </Col>
            </Row>
          </Col>
          {onUploadFile &&
            <Col xs={12} md={6}>
              <Row>
                <Col xs={12}>
                  <Field
                    component={FileUploaderField}
                    id={`${name}-file-${i}`}
                    label="File"
                    name={`${name}[${i}].file`}
                    onDeleteFile={onDeleteFile}
                    onUploadFile={onUploadFile}
                  />
                </Col>
              </Row>
            </Col>
          }
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              data-test-document-field-location
              component={TextField}
              id={`${name}-location-${i}`}
              label={<FormattedMessage id="stripes-erm-components.doc.location" />}
              name={`${name}[${i}].location`}
              validate={this.validateDocIsSpecified}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              component={TextField}
              data-test-document-field-url
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
      </EditCard>
    ));
  }

  renderEmpty = () => (
    <Layout data-test-document-field-empty-message className="padding-bottom-gutter">
      { this.props.isEmptyMessage }
    </Layout>
  )

  render() {
    const { items, name, onAddField } = this.props;

    return (
      <div data-test-documents-field-array>
        <div>
          { items.length ? this.renderDocs() : this.renderEmpty() }
        </div>
        <Button
          data-test-documents-field-array-add-button
          id={`add-${name}-btn`}
          onClick={() => onAddField({})}
        >
          { this.props.addDocBtnLabel }
        </Button>
      </div>
    );
  }
}

export default withKiwtFieldArray(DocumentsFieldArray);
