import PropTypes from 'prop-types';

import { SearchKeyControl as ImportedSearchKeyControl } from '@k-int/stripes-kint-components';

// DEPRECATED This should be removed in a future major version in favour of kint-components import
const SearchKeyControl = (props) => {
  console.warn('deprecated, use directly from @k-int/stripes-kint-components');
  return (
    <ImportedSearchKeyControl {...props} />
  );
};

SearchKeyControl.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
    key: PropTypes.string.isRequired
  }))
};

export default SearchKeyControl;
