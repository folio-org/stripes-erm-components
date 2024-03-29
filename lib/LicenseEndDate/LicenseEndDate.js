import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { NoValue } from '@folio/stripes/components';

const LicenseEndDate = props => {
  const { license: { endDate, openEnded }, renderNullIfEmpty } = props;
  if (openEnded) return <FormattedMessage id="stripes-erm-components.licenseCard.openEnded" />;
  if (endDate) return <FormattedDate timeZone="UTC" value={endDate} />;

  return renderNullIfEmpty ? null : <NoValue />;
};

LicenseEndDate.propTypes = {
  license: PropTypes.shape({
    endDate: PropTypes.string,
    openEnded: PropTypes.bool,
  }),
  renderNullIfEmpty: PropTypes.bool
};

export default LicenseEndDate;
