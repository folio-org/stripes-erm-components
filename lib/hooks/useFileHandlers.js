import { useMutation } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

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
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
  );

  return {
    handleDownloadFile,
    handleUploadFile
  };
};

export default useFileHandlers;
