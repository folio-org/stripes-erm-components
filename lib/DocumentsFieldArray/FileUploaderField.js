import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@folio/stripes/components';
import { withStripes } from '@folio/stripes/core';

import { FileUploader } from '../FileUploader';

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

  render() {
    const {
      input,
      label,
      onUploadFile,
      validateFile,
      readOnly,
      required,
      ...rest
    } = this.props; // eslint-disable-line no-unused-vars

    return (
      <div>
        <Label
          htmlFor={this.props.id}
          required={required}
          readOnly={readOnly}
        >
          {label}
        </Label>
        <FileUploader
          onDrop={(acceptedFiles) => {
            if (acceptedFiles.length !== 1) return;
            const file = acceptedFiles[0];

            if (validateFile(file)) {
              console.log('Setting file:', file.name); // eslint-disable-line
              input.onChange(file);
              this.uploadFile(file);
            }
          }}
          {...rest}
        />
        { input.value ? <div>File: {input.value.name} of size: {input.value.size}</div> : null }
      </div>
    );
  }
}

export default withStripes(FileUploaderField);
