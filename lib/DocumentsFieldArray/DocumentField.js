import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Col,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';

import FileUploaderField from '../FileUploaderField';
import { composeValidators } from '../validators';

export default class DocumentField extends React.Component {
  static propTypes = {
    onDownloadFile: PropTypes.func,
    onUploadFile: PropTypes.func,
    index: PropTypes.number.isRequired,
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    documentCategories: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
  }

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    if (!get(this.props, 'input.value.id') && get(this.inputRef, 'current')) {
      this.inputRef.current.focus();
    }
  }

  validateDocIsSpecified = (value, allValues, meta) => {
    if (meta) {
      const index = parseInt(/\[([0-9]*)\]/.exec(meta.name)[1], 10);
      const { fileUpload, location, name, url } = get(allValues, [this.props.input.name, index], {});
      if (name && (!fileUpload && !location && !url)) {
        return <FormattedMessage id="stripes-erm-components.doc.error.docsMustHaveLocationOrURL" />;
      }
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
    const { documentCategories, input: { name } } = this.props;

    if (!get(documentCategories, 'length')) return null;

    return (
      <Row>
        <Col xs={12}>
          <Field
            component={Select}
            data-test-document-field-category
            dataOptions={[
              { value: '', label: '' },
              ...documentCategories,
            ]}
            id={`${name}-category-${i}`}
            label={<FormattedMessage id="stripes-erm-components.doc.category" />}
            name={`${name}[${i}].atType`}
            parse={v => v} // Lets us send an empty string instead of `undefined`
          />
        </Col>
      </Row>
    );
  }

  render = () => {
    const {
      index,
      input: { name },
      onDownloadFile,
      onUploadFile,
    } = this.props;

    return (
      <div>
        <Row>
          <Col xs={12} md={onUploadFile ? 6 : 12}>
            <Row>
              <Col xs={12}>
                <Field
                  data-test-document-field-name
                  component={TextField}
                  id={`${name}-name-${index}`}
                  inputRef={this.inputRef}
                  label={<FormattedMessage id="stripes-erm-components.doc.name" />}
                  name={`${name}[${index}].name`}
                  required
                  validate={this.validateRequired}
                />
              </Col>
            </Row>
            {this.renderCategory(index)}
            <Row>
              <Col xs={12}>
                <Field
                  data-test-document-field-note
                  component={TextArea}
                  id={`${name}-note-${index}`}
                  label={<FormattedMessage id="stripes-erm-components.doc.note" />}
                  name={`${name}[${index}].note`}
                  parse={v => v} // Lets us send an empty string instead of `undefined`
                />
              </Col>
            </Row>
          </Col>
          {onUploadFile &&
            <Col xs={12} md={6}>
              <Field
                component={FileUploaderField}
                data-test-document-field-file
                id={`${name}-file-${index}`}
                label={<FormattedMessage id="stripes-erm-components.doc.file" />}
                name={`${name}[${index}].fileUpload`}
                onDownloadFile={onDownloadFile}
                onUploadFile={onUploadFile}
                validate={this.validateDocIsSpecified}
              />
            </Col>
          }
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              data-test-document-field-location
              component={TextField}
              id={`${name}-location-${index}`}
              label={<FormattedMessage id="stripes-erm-components.doc.location" />}
              name={`${name}[${index}].location`}
              parse={v => v} // Lets us send an empty string instead of `undefined`
              validate={this.validateDocIsSpecified}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Field
              component={TextField}
              data-test-document-field-url
              id={`${name}-url-${index}`}
              label={<FormattedMessage id="stripes-erm-components.doc.url" />}
              name={`${name}[${index}].url`}
              parse={v => v} // Lets us send an empty string instead of `undefined`
              validate={composeValidators(
                this.validateDocIsSpecified,
                this.validateURLIsValid,
              )}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
