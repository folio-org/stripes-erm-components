import React from 'react';
import PropTypes from 'prop-types';
import SafeHTMLMessage from '@folio/react-intl-safe-html';
import ReactDropzone from 'react-dropzone';
import { isFunction, pickBy } from 'lodash';

import { Button, Col, Icon, Layout, MessageBanner, Row, Spinner } from '@folio/stripes/components';

import css from './FileUploader.css';

export default class FileUploader extends React.Component {
  static propTypes = {
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
    rejectClassName: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.node.isRequired,
    uploadButtonAriaLabel: PropTypes.string,
    uploadButtonText: PropTypes.node.isRequired,
    uploadInProgress: PropTypes.bool,
    uploadInProgressText: PropTypes.node,
  };

  static defaultProps = {
    className: '',
  };

  renderErrorMessage = (errorMessage) => {
    const { isDropZoneActive } = this.props;
    return errorMessage &&
      (
        <span
          className={css.errorMessage}
          hidden={isDropZoneActive}
        >
          <Icon icon="exclamation-circle">
            <span data-test-error-msg>{errorMessage}</span>
          </Icon>
        </span>
      );
  };

  renderUploadError = () => {
    const { fileName, isDropZoneActive } = this.props;
    return (
      <MessageBanner data-test-error-msg type="error" hidden={isDropZoneActive} icon={null}>
        <Layout className="display-flex flex-direction-column">
          <Layout className="padding-bottom-gutter">
            <Row>
              <Col md={1}><Icon icon="document" /></Col>
              <Col md={11} className={css.breakAll}>{fileName}</Col>
            </Row>
          </Layout>
          <Layout>
            <Row>
              <Col md={1}><Icon icon="exclamation-circle" /></Col>
              <Col md={11}>
                <SafeHTMLMessage id="stripes-erm-components.errors.uploadError.1" />
                <SafeHTMLMessage id="stripes-erm-components.errors.uploadError.2" tagName="p" values={{ number: 200 }} />
                <SafeHTMLMessage id="stripes-erm-components.errors.uploadError.3" tagName="p" />
              </Col>
            </Row>
          </Layout>
        </Layout>
      </MessageBanner>
    );
  }

  renderUploadFields = () => {
    const {
      isDropZoneActive,
      name,
      uploadButtonAriaLabel,
      uploadButtonText,
      uploadInProgress,
      uploadInProgressText
    } = this.props;

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
          ) : this.props.title}
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
  }

  renderChildren = (open) => {
    const { children, isDropZoneActive } = this.props;
    return (
      <div
        className={css.children}
        data-test-children
        hidden={isDropZoneActive}
      >
        {isFunction(children) ? children(open) : children}
      </div>
    );
  }

  renderFooter = () => {
    const { footer, isDropZoneActive } = this.props;
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
  }

  render() {
    const {
      accept,
      acceptClassName,
      activeClassName,
      className,
      disabledClassName,
      errorMessage,
      maxSize,
      onDragEnter,
      onDragLeave,
      onDrop,
      rejectClassName,
      style,
      ...rest
    } = this.props;

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
            {this.renderUploadFields()}
            {this.renderChildren(open)}
            {this.renderFooter()}
            {errorMessage === 'uploadError' ? this.renderUploadError() : this.renderErrorMessage(errorMessage)}
          </div>
        )}
      </ReactDropzone>
    );
  }
}
