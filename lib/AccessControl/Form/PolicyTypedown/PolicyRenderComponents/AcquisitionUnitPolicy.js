import { useIntl } from 'react-intl';

import { Layout } from '@folio/stripes/components';
import { highlightString } from '@k-int/stripes-kint-components';

import Separator from './Separator';
import css from '../Styles.css';

export const acquisitionPolicyRestrictions = (policy, intl) => ['protectRead', 'protectUpdate', 'protectCreate', 'protectDelete'].map(restriction => {
  return policy[restriction] ? intl.formatMessage({ id: `stripes-erm-components.accesscontrol.acquisitionunits.${restriction}` }) : null;
}).filter(Boolean).join(', ');

const AcquisitionUnitPolicy = ({
  isSelected,
  policy,
  typed,
}) => {
  const intl = useIntl();
  return (
    <Layout
      className="display-flex"
      data-test-acquisition-unit-policy-container
      data-testid="acquisition-unit-policy-container"
    >
      <Layout
        className="display-flex"
        data-test-acquisition-unit-policy-name
        data-testid="acquisition-unit-policy-name"
      >
        {
          highlightString(
            typed,
            (policy.policy.name || ''),
          )
        }
      </Layout>
      <Separator />
      <Layout
        className={`display-flex ${css.itemMargin} ${isSelected ? '' : css.greyItem}`}
        data-test-acquisition-unit-policy-description
        data-testid="acquisition-unit-policy-description"
      >
        {
          highlightString(
            typed,
            (policy.policy.description || ''),
          )
        }
      </Layout>
      <Separator />
      <Layout
        className={`display-flex ${css.itemMargin} ${isSelected ? '' : css.greyItem}`}
        data-test-acquisition-unit-policy-restrictions
        data-testid="acquisition-unit-policy-restrictions"
      >
        {acquisitionPolicyRestrictions(policy.policy, intl)}
      </Layout>
    </Layout>
  );
};

export default AcquisitionUnitPolicy;
