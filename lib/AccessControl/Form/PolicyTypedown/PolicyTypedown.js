import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import isEqual from 'lodash/isEqual';

import { Typedown } from '@k-int/stripes-kint-components';

import { ACQUISITION_UNIT_POLICY_TYPE } from '../../constants';
import { AcquisitionUnitPolicy } from './PolicyRenderComponents';
import PropTypes from 'prop-types';

const PolicyTypedown = ({
  policies = [],
  ...typedownProps // Needs input, isSelected will also be useful since we're putting into a different fieldArray
} = {}) => {
  const [typed, setTyped] = useState('');
  const [policyOptions, setPolicyOptions] = useState(policies);

  const renderPolicyOption = useCallback((option, _currentlyTyped, _exactMatch, optionIsSelected) => {
    if (option.type === ACQUISITION_UNIT_POLICY_TYPE) {
      return (
        <AcquisitionUnitPolicy
          isSelected={optionIsSelected}
          policy={option}
          typed={typed}
        />
      );
    }

    return <>${option.type} · ${option.id}</>;
  }, [typed]);

  // The "type" logic needs to DIFFER for each policy type :(
  const onType = useCallback(e => {
    if (e.target.value !== typed) {
      setTyped(e.target.value);
    }
  }, [typed]);

  useEffect(() => {
    const newPolicyOptions = policies.filter(pol => {
      // Each policy type may have DIFFERENT filter logic.
      // Should probs be in their own files.
      if (pol.type === ACQUISITION_UNIT_POLICY_TYPE) {
        return (
          (pol.policy.name || '').toLowerCase().includes(typed.toLowerCase()) ||
          (pol.policy.description || '').toLowerCase().includes(typed.toLowerCase())
        );
      }

      return pol.policy.id.toLowerCase().includes(typed.toLowerCase());
    });

    if (!isEqual(newPolicyOptions, policyOptions)) {
      setPolicyOptions(newPolicyOptions);
    }
  }, [policies, policyOptions, typed]);

  return (
    <Typedown
      dataOptions={policyOptions}
      label={<FormattedMessage id="stripes-erm-components.accesscontrol.typedown.label" />}
      onType={onType}
      renderListItem={renderPolicyOption}
      {...typedownProps}
    />
  );
};

PolicyTypedown.propTypes = {
  policies: PropTypes.arrayOf(PropTypes.oneOf([
    PropTypes.shape({ // Acquisition unit policy shape
      id: PropTypes.string.isRequired,
      description: PropTypes.string,
      name: PropTypes.string.isRequired,
    }),
    PropTypes.shape({ // Generic policy shape
      id: PropTypes.string.isRequired,
    })
  ])),
};

export default PolicyTypedown;
