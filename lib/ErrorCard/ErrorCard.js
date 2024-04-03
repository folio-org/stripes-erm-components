import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Card, Headline, Icon } from '@folio/stripes/components';

import css from './ErrorCard.css';

const propTypes = {
  cardStyle: PropTypes.oneOf(['default', 'negative', 'positive']),
  error: PropTypes.shape({
    number: PropTypes.number,
    message: PropTypes.string,
  }).isRequired,
  headerEnd: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  headerStart: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

const defaultHeaderStart = (
  <Icon icon="exclamation-circle" size="small">
    <strong>
      <FormattedMessage id="stripes-erm-components.errors.errorCard.defaultErrorHeader" />
    </strong>
  </Icon>
);
const ErrorCard = ({
  cardStyle = 'default',
  error,
  headerEnd,
  headerStart = defaultHeaderStart,
}) => {
  return (
    <Card
      cardStyle={cardStyle}
      data-test-error-card
      data-testid="errorCard"
      headerEnd={headerEnd}
      headerProps={{ 'data-test-error-card-header': true }}
      headerStart={headerStart}
      roundedBorder
    >
      <div className={css.titleWrap}>
        <Icon icon="exclamation-circle" iconClassName={css.fadeIcon} size="large" />
        <Headline
          className={css.title}
          faded
          margin="none"
          tag="h1"
        >
          {(error?.number || error?.message) ?
            <FormattedMessage id="stripes-erm-components.errors.errorCard.title" values={{ number: error?.number, message: error?.message }} />
            :
            <FormattedMessage id="stripes-erm-components.errors.errorCard.defaultTitle" />
          }
        </Headline>
        <Headline
          className={css.title}
          faded
          margin="none"
          tag="h3"
        >
          <FormattedMessage id="stripes-erm-components.errors.errorCard.text" />
        </Headline>
      </div>
    </Card>
  );
};

ErrorCard.propTypes = propTypes;
export default ErrorCard;
