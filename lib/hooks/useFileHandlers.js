import { useMutation } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { downloadBlob } from '../utils';

const useFileHandlers = (fileEndpoint) => {
  const ky = useOkapiKy();

  const { mutateAsync: handleUploadFile } = useMutation(
    [fileEndpoint, 'handleUpload'],
    (file) => {
      const formData = new FormData();
      formData.append('upload', file);
      return ky.post(fileEndpoint, { body: formData });
    }
  );

  // We are declaratively fetching a file via a function, useMutation is more convenient here
  const { mutate: handleDownloadFile } = useMutation(
    [fileEndpoint, 'handleDownload'],
    (file) => ky.get(`${fileEndpoint}/${file.id}/raw`).blob()
      /* In this instance we want the file name back as it was handed in, whitespace and all */
      .then(downloadBlob(file.name, { processWhitespace: false }))
  );

  return {
    handleDownloadFile,
    handleUploadFile
  };
};

export default useFileHandlers;
