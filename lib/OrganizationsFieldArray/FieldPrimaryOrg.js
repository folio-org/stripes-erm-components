import React from 'react';
import { Field, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Checkbox } from '@folio/stripes/components';

function FieldPrimaryOrg({ fields, fieldIndex, fieldPrefix, labelClass, labelId }) {
  const { change } = useForm();
  const changePrimaryOrg = ({ target: { checked } }) => {
    fields.forEach((fieldName, i) => (
      i === fieldIndex
        ? change(`${fieldName}.primaryOrg`, checked)
        : change(`${fieldName}.primaryOrg`, false)
    ));
  };

  return (
    <Field
      autoFocus
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
};

export default FieldPrimaryOrg;
