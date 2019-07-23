
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedMessage } from 'react-intl';

const LicenseEndDate = props => {
  const { license: { endDate, openEnded } } = props;
  if (openEnded) return <FormattedMessage id="stripes-erm-components.licenseCard.openEnded" />;
  if (endDate) return <FormattedDate timeZone="UTC" value={endDate} />;

  return '-';
};

LicenseEndDate.propTypes = {
  license: PropTypes.shape({
    endDate: PropTypes.string,
    openEnded: PropTypes.bool,
  })
};

export default LicenseEndDate;
