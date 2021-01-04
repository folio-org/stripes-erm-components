import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Checkbox,
  Datepicker,
  Layout
} from '@folio/stripes/components';

import stripesFinalForm from '@folio/stripes/final-form';

const DateFilterForm = ({ handleSubmit, name }) => {
  return (
    <>
      <Field
        backendDateStandard="YYYY-MM-DD"
        component={Datepicker}
        label={<FormattedMessage id="stripes-erm-components.dateFilter.onOrAfter" />}
        name="dateFrom"
        timeZone="UTC"
      />
      <Field
        backendDateStandard="YYYY-MM-DD"
        component={Datepicker}
        label={<FormattedMessage id="stripes-erm-components.dateFilter.onOrBefore" />}
        name="dateTo"
        timeZone="UTC"
      />
      <Layout className="padding-bottom-gutter">
        <Field
          component={Checkbox}
          label={<FormattedMessage id={`stripes-erm-components.dateFilter.${name}IsNotSet`} />}
          name="isDateSet"
          type="checkbox"
        />
      </Layout>
      <Button
        data-test-apply-button
        marginBottom0
        onClick={handleSubmit}
      >Apply
      </Button>
    </>
  );
};

DateFilterForm.propTypes = {
  handleSubmit: PropTypes.func,
  name: PropTypes.string
};

export default stripesFinalForm({
  enableReinitialize: true,
  subscription: {
    values: true,
  },
})(DateFilterForm);
