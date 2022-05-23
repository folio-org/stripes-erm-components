import React from 'react';
import { useMutation } from 'react-query';
import { useOkapiKy } from '@folio/stripes/core';
import { FormattedMessage } from 'react-intl';

const useAsyncValidation = (app, validationPath) => {
  const ky = useOkapiKy();

  const { mutateAsync: asyncValidate } = useMutation(
    [validationPath, 'useAsyncValidation'],
    ({ value, name }) => {
      const payload = {};
      payload[name] = value;
      return ky.post(`${validationPath}/${name}`, { json: payload })
        .then(() => '')
        .catch(async (err) => {
          const { errors } = await err.response.json();
          return (
            errors.map((error, index) => (
              <FormattedMessage
                key={index}
                defaultMessage={error.message}
                id={`${app}.${error.i18n_code}`}
                tagName="div"
              />
            ))
          );
        });
    }
  );

  return (value, _, meta) => {
    return asyncValidate({
      value,
      name: meta.name
    });
  };
};


export default useAsyncValidation;
