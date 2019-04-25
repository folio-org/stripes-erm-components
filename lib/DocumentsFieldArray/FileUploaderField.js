import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@folio/stripes/components';

import { FileUploader } from '../FileUploader';

export default class FileUploaderField extends React.Component {
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

  render() {
    const {
      input,
      label,
      meta,
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
              console.log('Setting file:', file.name);
              input.onChange(file);
            }
          }}
          {...rest}
        />
        { input.value ? <div>File: {input.value.name} of size: {input.value.size}</div> : null }
      </div>
    );
  }
}
