import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import { withStripes } from '@folio/stripes/core';
import {
  Col,
  IconButton,
  KeyValue,
  Row,
} from '@folio/stripes/components';

import FileUploader from '../FileUploader';

class FileUploaderField extends React.Component {
  static propTypes = {
    meta: PropTypes.object,
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
    }).isRequired,
    validateFile: PropTypes.func,
  };

  static defaultProps = {
    validateFile: () => true,
  }

  state = {
    file: {},
    isDropZoneActive: false,
  }

  uploadFile = (file) => {
    const { okapi } = this.props.stripes;

    const request = new XMLHttpRequest();
    request.open('POST', '/licenses/upload-file');
    request.setRequestHeader('X-Okapi-Tenant', okapi.tenant);
    request.setRequestHeader('X-Okapi-Token', okapi.token);

    request.onreadystatechange = () => {
      const { readyState, responseText, status } = request;

      if (readyState !== 4) return;

      try {
        const response = JSON.parse(responseText);
        console.log(`File Upload Complete with Status "${status}"`, response); // eslint-disable-line
      } catch (error) {
        console.error('File Upload Error', error); // eslint-disable-line
      }
    };

    const formData = new FormData();
    formData.append('file', file);
    request.send(formData);
  }

  renderFileInfo = () => {
    const { file } = this.state;

    if (!file.name) return null;

    return (
      <Row>
        <Col xs={6}>
          <KeyValue
            label="File name"
            value={file.name}
          />
        </Col>
        <Col xs={4}>
          <KeyValue
            label="Date/time stamp"
            value={<FormattedDate value={file.lastModifiedDate} />}
          />
        </Col>
        <Col xs={2}>
          <IconButton
            aria-label="Remove uploaded file"
            icon="trash"
            onClick={e => {
              e.stopPropagation();
              this.setState({ file: {} });
            }}
          />
        </Col>
      </Row>
    );
  }

  render() {
    const {
      input,
      validateFile,
      ...rest
    } = this.props; // eslint-disable-line no-unused-vars

    return (
      <FileUploader
        footer={this.renderFileInfo()}
        isDropZoneActive={this.state.isDropZoneActive}
        onDragEnter={() => this.setState({ isDropZoneActive: true })}
        multiple={false}
        onDragLeave={() => this.setState({ isDropZoneActive: false })}
        onDrop={(acceptedFiles) => {
          console.log('Files:', acceptedFiles);
          if (acceptedFiles.length !== 1) return;
          const file = acceptedFiles[0];

          if (validateFile(file)) {
            this.setState({
              file,
              isDropZoneActive: false,
            });
            input.onChange(file.name);
            // this.uploadFile(file);
          }
        }}
        onUploadFile={this.props.onUploadFile}
        uploadButtonText="or choose file"
        title="Drag & drop to upload"
        {...rest}
      />
    );
  }
}

export default withStripes(FileUploaderField);
