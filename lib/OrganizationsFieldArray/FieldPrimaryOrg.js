import React from 'react';
import { Field, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Checkbox } from '@folio/stripes/components';

function FieldPrimaryOrg({ fields, fieldIndex, fieldPrefix, labelClass, labelId, input }) {
  const { change } = useForm();
  const changePrimaryOrg = ({ target: { checked } }) => {
    fields.forEach((fieldName, i) => (
      i === fieldIndex
        ? change(`${fieldName}.primaryOrg`, checked)
        : change(`${fieldName}.primaryOrg`, false)
    ));
  };

  const autoFocus = !input?.value?.id && true;
  return (
    <Field
      autoFocus={autoFocus}
      component={Checkbox}
      data-test-checkbox-primary-org
      inline
      label={<FormattedMessage id={labelId} />}
      labelClass={labelClass}
      name={`${fieldPrefix}.primaryOrg`}
      onChange={changePrimaryOrg}
      type="checkbox"
    />
  );
}

FieldPrimaryOrg.propTypes = {
  fieldIndex: PropTypes.number.isRequired,
  fieldPrefix: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  labelClass: PropTypes.string,
  labelId: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

export default FieldPrimaryOrg;
