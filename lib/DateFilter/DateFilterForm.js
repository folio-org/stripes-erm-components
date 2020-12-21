import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Checkbox,
  Col,
  Datepicker,
  Row,
  TextField,
} from '@folio/stripes/components';

import stripesFinalForm from '@folio/stripes/final-form';

import EditCard from '../EditCard';
import { required as requiredValidator } from '../validators';

class DateFilterForm extends React.Component {
  render() {
    const { name } = this.props;

    return (
      <>
        <Field
          backendDateStandard="YYYY-MM-DD"
          component={Datepicker}
          label="On or after"
          name="dateFrom"
          timeZone="UTC"
        />
        <Field
          backendDateStandard="YYYY-MM-DD"
          component={Datepicker}
          label="On or before"
          name="dateTo"
          timeZone="UTC"
        />
        <Field
          component={Checkbox}
          label="Start date is not set"
          name="isDateSet"
          type="checkbox"
          vertical
        />
        <Button
          data-test-apply-button
          marginBottom0
          onClick={this.props.handleSubmit}
        >Apply
        </Button>
      </>
    );
  }
}

export default stripesFinalForm({
  enableReinitialize: true,
  subscription: {
    values: true,
  },
})(DateFilterForm);
