// FIXME THIS CAN BE REMOVED IF
//  https://github.com/folio-org/stripes-webpack/pull/167
//  is merged
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

import { IntlShape, useIntl } from 'react-intl';

import { Layout } from '@folio/stripes/components';
import { highlightString } from '@k-int/stripes-kint-components';

import Separator from './Separator';
import css from '../Styles.css';
import { AcquisitionUnitPolicy, AcquisitionUnitRestrictions, PolicyLink } from '../../../Types/Policy';

export const acquisitionPolicyRestrictions = (
  policy: AcquisitionUnitPolicy,
  intl: IntlShape
) => (['protectRead', 'protectUpdate', 'protectCreate', 'protectDelete'] as AcquisitionUnitRestrictions[]).map(restriction => {
  return policy[restriction] ?
    intl.formatMessage({ id: `stripes-erm-components.accesscontrol.acquisitionunits.${restriction}` }) :
    null;
}).filter(Boolean).join(', ');

type AcquisitionUnitPolicyProps = {
  isSelected: boolean,
  policy: PolicyLink<AcquisitionUnitPolicy>,
  typed: string
}

const AcquisitionUnitPolicyComponent = ({
  isSelected,
  policy,
  typed,
}: AcquisitionUnitPolicyProps) => {
  const intl = useIntl();

  return (
    <Layout className="display-flex">
      <Layout className="display-flex">
        {
          highlightString(
            typed,
            (policy.policy.name ?? ''),
          )
        }
      </Layout>
      <Separator />
      <Layout className={`display-flex ${css.itemMargin} ${isSelected ? '' : css.greyItem}`}>
        {
          highlightString(
            typed,
            (policy.policy.description ?? ''),
          )
        }
      </Layout>
      <Separator />
      <Layout className={`display-flex ${css.itemMargin} ${isSelected ? '' : css.greyItem}`}>
        {acquisitionPolicyRestrictions(policy.policy, intl)}
      </Layout>
    </Layout>
  );
};

export default AcquisitionUnitPolicyComponent;
