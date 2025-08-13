// FIXME THIS CAN BE REMOVED IF
//  https://github.com/folio-org/stripes-webpack/pull/167
//  is merged
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Layout } from '@folio/stripes/components';

import css from '../Styles.css';

// FIXME could probs move this to kint-comps, used here and in number generator

// CSS Components
const cssLayoutItem = `display-flex ${css.itemMargin}`;
const cssLayoutGreyItem = (isSelected: boolean) => { return isSelected ? cssLayoutItem : `${cssLayoutItem} ${css.greyItem}`; };
const cssLayoutBoldItem = `${cssLayoutItem} ${css.boldItem}`;

const Separator = ({
  bold = false,
  isSelected = false
}) => (
  <Layout
    className={bold ? cssLayoutBoldItem : cssLayoutGreyItem(isSelected)}
  >
    <FormattedMessage id="stripes-erm-components.separator" />
  </Layout>
);

export default Separator;
