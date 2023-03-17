import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import ReactDropzone from 'react-dropzone';
import { isFunction, pickBy } from 'lodash';
import { Button, Col, Icon, Layout, MessageBanner, Row, Spinner } from '@folio/stripes/components';
import css from './FileUploader.css';

const FileUploader = ({
  accept,
  acceptClassName,
  activeClassName,
  children,
  className,
  disabledClassName,
  errorMessage,
  footer,
  fileName,
  isDropZoneActive,
  maxSize,
  name,
  onDragEnter,
  onDragLeave,
  onDrop,
  onDropRejected,
  rejectClassName,
  style,
  title,
  uploadButtonAriaLabel,
  uploadButtonText,
  uploadInProgress,
  uploadInProgressText,
  ...rest
}) => {
  const renderErrorMessage = (message) => {
    return (
      <MessageBanner data-test-error-msg hidden={isDropZoneActive} icon={null} type="error">
        <Layout className="display-flex flex-direction-column">
          {fileName &&
            <Layout className="padding-bottom-gutter">
              <Row>
                <Col md={1}><Icon icon="document">&nbsp;</Icon></Col>
                <Col className={css.breakAll} md={11}>{fileName}</Col>
              </Row>
            </Layout>
          }
          <Layout>
            <Row>
              <Col md={1}><Icon icon="exclamation-circle">&nbsp;</Icon></Col>
              <Col md={11}>
                {message === 'uploadError' ?
                  (
                    <span data-test-error-msg>
                      <FormattedMessage id="stripes-erm-components.errors.uploadError.1" />
                      <FormattedMessage id="stripes-erm-components.errors.uploadError.3" tagName="p" />
                    </span>
                  )
                  : <span data-test-error-msg>{message}</span>
                }
              </Col>
            </Row>
          </Layout>
        </Layout>
      </MessageBanner>
    );
  };

  const renderUploadFields = () => {
    return (
      <>
        <span
          className={`${css.uploadTitle} ${isDropZoneActive ? css.activeUploadTitle : ''}`}
          data-test-title
        >
          {uploadInProgress ? (
            <div>
              {uploadInProgressText}
              <Spinner />
            </div>
          ) : title}
        </span>
        <Button
          aria-label={uploadButtonAriaLabel}
          buttonStyle="primary"
          data-test-button
          hidden={isDropZoneActive}
          name={name}
        >
          {uploadButtonText}
        </Button>
      </>
    );
  };

  const renderChildren = (open) => {
    return (
      <div
        className={css.children}
        data-test-children
        hidden={isDropZoneActive}
      >
        {isFunction(children) ? children(open) : children}
      </div>
    );
  };

  const renderFooter = () => {
    return footer &&
      (
        <div
          className={css.footer}
          data-test-footer
          hidden={isDropZoneActive}
        >
          {footer}
        </div>
      );
  };

  const dataTest = pickBy(rest, (_, key) => key.startsWith('data-test-'));

  return (
    <ReactDropzone
      accept={accept}
      acceptClassName={acceptClassName}
      activeClassName={activeClassName}
      disableClick
      disabledClassName={disabledClassName}
      maxSize={maxSize}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDropRejected={onDropRejected}
      rejectClassName={rejectClassName}
      style={style}
    >
      {({ getInputProps, getRootProps, open }) => (
        <div
          className={`${css.upload} ${className}`}
          data-test-drop-zone
          {...dataTest}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {renderUploadFields()}
          {renderChildren(open)}
          {renderFooter()}
          {errorMessage && renderErrorMessage(errorMessage)}
        </div>
      )}
    </ReactDropzone>
  );
};

FileUploader.propTypes = {
  accept: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  acceptClassName: PropTypes.string,
  activeClassName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
  className: PropTypes.string,
  disabledClassName: PropTypes.string,
  errorMessage: PropTypes.node,
  footer: PropTypes.node,
  fileName: PropTypes.string,
  isDropZoneActive: PropTypes.bool.isRequired,
  maxSize: PropTypes.number,
  name: PropTypes.string,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDrop: PropTypes.func.isRequired,
  onDropRejected: PropTypes.func,
  rejectClassName: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.node.isRequired,
  uploadButtonAriaLabel: PropTypes.string,
  uploadButtonText: PropTypes.node.isRequired,
  uploadInProgress: PropTypes.bool,
  uploadInProgressText: PropTypes.node,
};

export default FileUploader;

