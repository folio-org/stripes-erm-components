import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';
import PropTypes from 'prop-types';

const FormattedDateTime = ({ date }) => {
  return (
    <div>
      <FormattedDate value={this.props.date} />
      &nbsp;
      <FormattedTime value={this.props.date} />
    </div>
  );
}

FormattedDateTime.propTypes = {
  date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default FormattedDateTime;
