import React from 'react';
import PropTypes from 'prop-types';
import { pickBy } from 'lodash';
import { withStripes } from '@folio/stripes/core';

import FileUploaderFieldView from './FileUploaderFieldView';

class FileUploaderField extends React.Component {
  static propTypes = {
    onDownloadFile: PropTypes.func.isRequired,
    onUploadFile: PropTypes.func.isRequired,
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
    }).isRequired,
    meta: PropTypes.object,
  };

  state = {
    error: null,
    file: {},
    isDropZoneActive: false,
  }

  static getDerivedStateFromProps(props, state) {
    const { input: { value } } = props;

    if (value && value.id) {
      // We've been passed an initial value for the field that is an object
      // with an ID. This means we're currently showing a previously-saved file.
      // So if this is different from the file we've saved to our internal state,
      // save it off so we can properly render the metadata.
      if (state.file && (state.file.id !== value.id)) {
        return { file: value };
      }
    }

    return null;
  }

  handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length !== 1) return;

    this.setState({
      error: undefined,
      isDropZoneActive: false,
    });

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
          error: error.message,
          file: {},
        });
      });
  }

  handleDelete = () => {
    this.props.input.onChange(null);
    this.setState({ file: {} });
  }

  render() {
    return (
      <FileUploaderFieldView
        error={this.props.meta.error || this.state.error}
        file={this.props.input.value ? this.state.file : {}}
        isDropZoneActive={this.state.isDropZoneActive}
        onDelete={this.handleDelete}
        onDownloadFile={this.props.onDownloadFile}
        onDragEnter={() => this.setState({ isDropZoneActive: true })}
        onDragLeave={() => this.setState({ isDropZoneActive: false })}
        onDrop={this.handleDrop}
        {...pickBy(this.props, (_, key) => key.startsWith('data-test-'))}
      />
    );
  }
}

export default withStripes(FileUploaderField);
