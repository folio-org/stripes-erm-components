import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { pickBy } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { useCallout } from '@folio/stripes/core';

import FileUploaderFieldView from './FileUploaderFieldView';

const FileUploaderField = (props) => {
  const {
    hasDownloadPerm,
    onDownloadFile,
    onUploadFile,
    input: { name, onChange, value },
    meta,
  } = props;
  const callout = useCallout();

  const [error, setError] = useState(null);
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState(null);
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);
  const [uploadInProgress, setUploadInProgress] = useState(false);

  useEffect(() => {
    if (value && value.id) {
      // We've been passed an initial value for the field that is an object
      // with an ID. This means we're currently showing a previously-saved file.
      // So if this is different from the file we've saved to our internal state,
      // save it off so we can properly render the metadata.
      if (file && (file.id !== value.id)) {
        setFile(value);
      }
    }
  }, [value, file]);

  const processError = (resp) => {
    const contentType = resp.headers ? resp.headers.get('Content-Type') : '';
    if (contentType && contentType.startsWith('application/json')) {
      throw new Error(`${resp.message} (${resp.error})`);
    } else {
      throw new Error('uploadError');
    }
  };

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length !== 1) return;

    setError(undefined);
    setFileName(acceptedFiles[0].name);
    setIsDropZoneActive(false);
    setUploadInProgress(true);

    onUploadFile(acceptedFiles[0])
      .then(response => {
        if (response.ok) {
          response.json().then((uploadFile) => {
            onChange(uploadFile.id);
            setFile({ uploadFile });
          });
        } else {
          processError(response);
        }
      })
      .catch((uploadError) => {
        console.error(uploadError); // eslint-disable-line no-console
        setError(uploadError.message);
        setFile({});
      })
      .finally(() => setUploadInProgress(false));
  };

  const handleDropRejected = () => {
    setFileName(undefined);
    setIsDropZoneActive(false);
    setUploadInProgress(false);

    callout.sendCallout({
      message: <FormattedMessage id="stripes-erm-components.errors.uploadError.2" values={{ number: 200 }} />,
      type: 'error',
    });
  };

  const handleDelete = () => {
    onChange(null);
    setFile({});
  };


  return (
    <FileUploaderFieldView
      error={meta.error || error}
      file={value ? file : {}}
      fileName={fileName}
      hasDownloadPerm={hasDownloadPerm}
      isDropZoneActive={isDropZoneActive}
      name={name}
      onDelete={handleDelete}
      onDownloadFile={onDownloadFile}
      onDragEnter={() => setIsDropZoneActive(true)}
      onDragLeave={() => setIsDropZoneActive(false)}
      onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
      onDropRejected={handleDropRejected}
      uploadInProgress={uploadInProgress}
      {...pickBy(props, (_, key) => key.startsWith('data-test-'))}
    />
  );
};

FileUploaderField.propTypes = {
  hasDownloadPerm: PropTypes.bool,
  onDownloadFile: PropTypes.func.isRequired,
  onUploadFile: PropTypes.func.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
  meta: PropTypes.object,
};

export default FileUploaderField;
