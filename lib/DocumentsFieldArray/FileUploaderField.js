import React from 'react';
import PropTypes from 'prop-types';
import { withStripes } from '@folio/stripes/core';

import FileUploaderFieldView from './FileUploaderFieldView';

class FileUploaderField extends React.Component {
  static propTypes = {
    onDeleteFile: PropTypes.func.isRequired,
    onUploadFile: PropTypes.func.isRequired,
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
    }).isRequired,
    meta: PropTypes.object,
    stripes: PropTypes.shape({
      okapi: PropTypes.shape({
        tenant: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired
    }).isRequired,
  };

  state = {
    error: null,
    file: {},
    isDropZoneActive: false,
  }

  handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length !== 1) return;

    this.setState({ isDropZoneActive: false });

    this.props.onUploadFile(acceptedFiles[0])
      .then(response => {
        if (response.error) {
          throw new Error(`${response.message} (${response.error})`);
        }

        this.props.input.onChange(response.id);
        this.setState({ file: response });
      })
      .catch(error => {
        console.error(error); // eslint-disable-line no-console
        this.setState({
          error: `Failed to upload file with error: ${error.message}`,
          file: {},
        });
      });
  }

  handleDelete = (file) => {
    this.props.onDeleteFile(file)
      .then(response => {
        if (response.status >= 400) {
          throw new Error(`${response.statusText} (${response.status})`);
        }

        this.props.input.onChange(undefined);
        this.setState({ file: {} });
      }).catch(error => {
        console.error(error); // eslint-disable-line no-console
        this.setState({
          error: `Failed to delete file with error: ${error.message}`,
          file: {},
        });
      });
  }

  render() {
    return (
      <FileUploaderFieldView
        error={this.props.meta.error || this.state.error}
        file={this.state.file}
        isDropZoneActive={this.state.isDropZoneActive}
        onDelete={this.handleDelete}
        onDragEnter={() => this.setState({ isDropZoneActive: true })}
        onDragLeave={() => this.setState({ isDropZoneActive: false })}
        onDrop={this.handleDrop}
      />
    );
  }
}

export default withStripes(FileUploaderField);
