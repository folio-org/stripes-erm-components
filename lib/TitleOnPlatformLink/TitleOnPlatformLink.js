import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Icon,
  Tooltip,
} from '@folio/stripes/components';

const TitleOnPlatformLink = ({ id, platform, name, url }) => {
  if (!platform && !url) return null;

  return (
    <div>
      <div data-test-platform-name>{platform ?? null}</div>
      { url ? (
        <Tooltip
          data-test-pti-tooltip
          id={`pti-link-tooltip-${id}`}
          placement="bottom"
          text={<FormattedMessage
            id="stripes-erm-components.pti.accessTitleOnPlatform"
            values={{ name }}
          />}
        >
          {({ ref, ariaIds }) => (
            <div
              ref={ref}
              aria-labelledby={ariaIds.text}
            >
              <a
                href={url}
                onClick={e => e.stopPropagation()}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon icon="external-link" iconPosition="end">
                  <FormattedMessage id="stripes-erm-components.pti.titleOnPlatform" />
                </Icon>
              </a>
            </div>
          )}
        </Tooltip>) : null
      }
    </div>
  );
};

TitleOnPlatformLink.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  platform: PropTypes.string,
  url: PropTypes.string,
};

export default TitleOnPlatformLink;
