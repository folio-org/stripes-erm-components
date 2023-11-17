import { useContext } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CalloutContext, useOkapiKy } from '@folio/stripes/core';

import { uniqBy, sortBy, difference } from 'lodash';
import { Pane } from '@folio/stripes/components';

import { TagsForm } from '@folio/stripes/smart-components';

import { useTags } from '../hooks';
import { tagNamespaceArray } from '../utils';

const Tags = ({
  invalidateLinks = [], // If there are other queries that need invalidating, pass those here
  link,
  onToggle,
}) => {
  const ky = useOkapiKy();
  const callout = useContext(CalloutContext);
  const queryClient = useQueryClient();

  // TAG GET/POST
  const { data: { tags = [] } = {} } = useTags(
    [...tagNamespaceArray, link]
  );

  // istanbul ignore next
  const { mutateAsync: postTags } = useMutation(
    ['tags', 'stripes-erm-components', 'Tags', 'postTags'],
    (data) => ky.post('tags', { json: data }).then(() => {
      queryClient.invalidateQueries('tags');
    })
  );

  // ENTITY GET/PUT
  const { data: entity } = useQuery(
    [link, 'stripes-erm-components', 'Tags'],
    () => ky.get(link).json()
  );

  // istanbul ignore next
  const { mutateAsync: putEntity } = useMutation(
    [link, 'stripes-erm-components', 'Tags', 'putEntity'],
    (data) => ky.put(link, { json: data }).then(() => {
      queryClient.invalidateQueries(link);
      if (invalidateLinks?.length) {
        invalidateLinks.forEach(il => queryClient.invalidateQueries(il));
      }
    })
  );

  // add tags to global list of tags
  // istanbul ignore next
  const saveTags = (tagsToSave) => {
    const newTag = difference(tagsToSave.map(t => (t.value || t)), tags.map(t => t.label.toLowerCase()));
    if (!newTag || !newTag.length) return;

    postTags({
      label: newTag[0],
      description: newTag[0]
    });

    callout.sendCallout({ message: <FormattedMessage id="stripes-erm-components.newTagCreated" /> });
  };

  // add tag to the list of entity tags
  // istanbul ignore next
  const saveEntityTags = (tagsToSave) => {
    const tagListMap = (entity?.tags ?? []).map(tag => ({ 'value': tag.value }));
    const tagsMap = tagsToSave.map(tag => ({ 'value': tag.value || tag }));

    const newTags = sortBy(uniqBy([...tagListMap, ...tagsMap], 'value'));

    putEntity({
      tags: newTags
    });
  };

  const onAdd = (addTags) => {
    saveEntityTags(addTags);
    saveTags(addTags);
  };

  const onRemove = (tag) => {
    const tagToDelete = (entity?.tags ?? []).filter(t => t.value.toLowerCase() === tag.toLowerCase());

    putEntity({
      tags: [{ id: tagToDelete[0].id, _delete:true }]
    });
  };

  const entityTags = (entity?.tags ?? []).map(tag => tag.value.toLowerCase());
  return (
    <Pane
      defaultWidth="20%"
      dismissible
      onClose={onToggle}
      paneSub={<FormattedMessage id="stripes-erm-components.numberOfTags" values={{ count: entity?.tags?.length ?? 0 }} />}
      paneTitle={<FormattedMessage id="stripes-erm-components.tags" />}
    >
      <TagsForm
        entityTags={entityTags}
        onAdd={onAdd}
        onRemove={onRemove}
        tags={tags}
      />
    </Pane>
  );
};

Tags.propTypes = {
  invalidateLinks: PropTypes.arrayOf(PropTypes.string),
  link: PropTypes.string,
  onToggle: PropTypes.func
};

export default Tags;
