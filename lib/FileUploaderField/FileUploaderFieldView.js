import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';
import {
  Col,
  Icon,
  IconButton,
  KeyValue,
  Row,
  Tooltip,
} from '@folio/stripes/components';

import FileUploader from '../FileUploader';

export default class FileUploaderFieldView extends React.Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    file: PropTypes.shape({
      modified: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      name: PropTypes.string,
    }).isRequired,
    fileName: PropTypes.string,
    isDropZoneActive: PropTypes.bool,
    name: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    onDownloadFile: PropTypes.func.isRequired,
    onDragEnter: PropTypes.func,
    onDragLeave: PropTypes.func,
    onDrop: PropTypes.func.isRequired,
    uploadInProgress: PropTypes.bool,
  }

  renderFileInfo = () => {
    const { file } = this.props;

    if (!file.name) return null;

    return (
      <Row>
        <Col xs={6}>
          <KeyValue label={<FormattedMessage id="stripes-erm-components.fuf.filename" />}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              data-test-fuf-name
              href="#"
              onClick={(e) => {
                this.props.onDownloadFile(file);
                e.preventDefault();
                e.stopPropagation();
              }}
              rel="noopener noreferrer"
              style={{ wordBreak: 'break-all' }}
              target="_blank"
            >
              {file.name}
              <Icon icon="external-link" />
            </a>
          </KeyValue>
        </Col>
        <Col xs={4}>
          <KeyValue
            label={<FormattedMessage id="stripes-erm-components.fuf.uploaded" />}
            value={(
              <span data-test-fuf-uploaded>
                <div><FormattedDate value={file.modified} tagName="div" /></div>
                <div><FormattedTime value={file.modified} tagName="div" /></div>
              </span>
            )}
          />
        </Col>
        <Col xs={2}>
          <Tooltip
            id={uniqueId('deleteFileBtn')}
            text={<FormattedMessage id="stripes-erm-components.fuf.removeUploaded" />}
          >
            {({ ariaIds, ref }) => (
              <IconButton
                aria-labelledby={ariaIds.text}
                data-test-fuf-delete
                icon="trash"
                onClick={e => {
                  e.stopPropagation();
                  this.props.onDelete(file);
                }}
                ref={ref}
              />
            )}
          </Tooltip>
        </Col>
      </Row>
    );
  }

  render() {
    const {
      error,
      fileName,
      isDropZoneActive,
      name,
      onDelete, // eslint-disable-line no-unused-vars
      onDragEnter,
      onDragLeave,
      onDrop,
      uploadInProgress,
      ...rest
    } = this.props;

    return (
      <FormattedMessage id="stripes-erm-components.fuf.buttonAriaLabel">
        { buttonAriaLabel => (
          <FileUploader
            errorMessage={error}
            footer={this.renderFileInfo()}
            fileName={fileName}
            isDropZoneActive={isDropZoneActive}
            multiple={false}
            name={name}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            title={<FormattedMessage id="stripes-erm-components.fuf.title" />}
            uploadButtonAriaLabel={buttonAriaLabel}
            uploadButtonText={<FormattedMessage id="stripes-erm-components.fuf.subtitle" />}
            uploadInProgress={uploadInProgress}
            uploadInProgressText={<FormattedMessage id="stripes-erm-components.fuf.uploading" />}
            {...rest}
          >
            <FormattedMessage id="stripes-erm-components.fuf.maxFileSize" />
          </FileUploader>
        )}
      </FormattedMessage>
    );
  }
}
