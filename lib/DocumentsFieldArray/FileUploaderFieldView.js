import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import {
  Col,
  IconButton,
  KeyValue,
  Row,
} from '@folio/stripes/components';

import FileUploader from '../FileUploader';

export default class FileUploaderFieldView extends React.Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    file: PropTypes.shape({
      modified: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    isDropZoneActive: PropTypes.func,
    onDelete: PropTypes.func.isRequired,
    onDragEnter: PropTypes.func,
    onDragLeave: PropTypes.func,
    onDrop: PropTypes.func.isRequired,
  }

  renderFileInfo = () => {
    const { file } = this.props;

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
            label="Uploaded"
            value={<FormattedDate value={file.modified} />}
          />
        </Col>
        <Col xs={2}>
          <IconButton
            aria-label="Remove uploaded file"
            icon="trash"
            onClick={e => {
              e.stopPropagation();
              this.props.onDelete(file);
            }}
          />
        </Col>
      </Row>
    );
  }

  render() {
    const {
      error,
      isDropZoneActive,
      onDelete, // eslint-disable-line no-unused-vars
      onDragEnter,
      onDragLeave,
      onDrop,
      ...rest
    } = this.props;

    return (
      <FileUploader
        errorMessage={error}
        footer={this.renderFileInfo()}
        isDropZoneActive={isDropZoneActive}
        multiple={false}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        uploadButtonText="or choose file"
        title="Drag & drop to upload"
        {...rest}
      />
    );
  }
}
