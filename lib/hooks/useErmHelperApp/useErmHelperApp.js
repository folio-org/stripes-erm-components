import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useHelperApp, useTagsEnabled } from '@k-int/stripes-kint-components';

import { IconButton } from '@folio/stripes/components';
import Tags from '../../Tags';

const useErmHelperApp = () => {
  const tagsEnabled = useTagsEnabled({ useSettings: true });
  const { HelperComponent, helperToggleFunctions, isOpen } = useHelperApp({
    tags: Tags,
  });

  const handleToggleTags = useCallback(() => {
    if (tagsEnabled) {
      helperToggleFunctions.tags();
    }
  }, [helperToggleFunctions, tagsEnabled]);

  const TagButton = tagsEnabled ? ({ entity, onClick = () => null }) => {
    return (
      <FormattedMessage id="stripes-erm-components.showTags">
        {ariaLabel => (
          <IconButton
            ariaLabel={ariaLabel[0]}
            badgeCount={entity?.tags?.length ?? 0}
            icon="tag"
            id="clickable-show-tags"
            onClick={
              () => {
                handleToggleTags();
                onClick({ open: isOpen('tags') });
              }
            }
          />
        )}
      </FormattedMessage>
    );
  } : () => null;

  TagButton.propTypes = {
    entity: PropTypes.shape({
      tags: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        normValue: PropTypes.string,
        value: PropTypes.string,
      })),
    }),
    onClick: PropTypes.func
  };

  return { handleToggleTags, HelperComponent, TagButton, isOpen };
};

export default useErmHelperApp;
