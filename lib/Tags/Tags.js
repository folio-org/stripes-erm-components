import { get, uniqBy, sortBy, difference, cloneDeep } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Callout, Pane } from '@folio/stripes/components';
import { stripesConnect } from '@folio/stripes/core';

import { TagsForm } from '@folio/stripes/smart-components';

class Tags extends React.Component {
  static manifest = Object.freeze({
    tags: {
      type: 'okapi',
      path: 'tags?limit=100',
      records: 'tags',
      clear: false,
      throwErrors: false,
      POST: {
        path: 'tags',
      },
    },
    entities: {
      type: 'okapi',
      path: '!{link}',
    },
  });

  static propTypes = {
    mutator: PropTypes.shape({
      entities: PropTypes.shape({
        PUT: PropTypes.func.isRequired,
        replace: PropTypes.func,
      }),
      tags: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }),
    }),
    onToggle: PropTypes.func,
    resources: PropTypes.shape({
      entities: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
      tags: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
    }).isRequired,
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }),
  };

  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.calloutRef = React.createRef();
    this.state = { entity: [] };
  }

  static getDerivedStateFromProps(props) {
    const entities = (props.resources.entities || {}).records || [];
    const entity = entities[0] || {};
    if (entity) return { entity };
    return null;
  }

  onAdd(tags) {
    this.saveEntityTags(tags);
    this.saveTags(tags);
  }

  onRemove(tag) {
    const entity = this.state.entity;
    const tags = (entity.tags || []);
    const tagToDelete = tags.filter(t => t.value.toLowerCase() === tag.toLowerCase());
    const deletedTagList = tags.filter(t => t.value.toLowerCase() !== tag.toLowerCase());
    const updateEntity = cloneDeep(entity);
    updateEntity.tags = [{ id: tagToDelete[0].id, _delete:true }];
    this.props.mutator.entities.PUT(updateEntity).then(() => {
      updateEntity.tags = deletedTagList;
      this.setState({ entity: updateEntity });
    });
  }

  // add tag to the list of entity tags
  saveEntityTags(tags) {
    const entity = this.state.entity;
    const tagList = (entity.tags || []);
    const tagListMap = tagList.map(tag => ({ 'value': tag.value }));
    const tagsMap = tags.map(tag => ({ 'value': tag.value || tag }));
    entity.tags = sortBy(uniqBy([...tagListMap, ...tagsMap], 'value'));
    this.props.mutator.entities.PUT(entity);
  }

  // add tags to global list of tags
  saveTags(tags) {
    const { mutator, resources } = this.props;
    const records = (resources.tags || {}).records || [];
    const newTag = difference(tags.map(t => (t.value || t)), records.map(t => t.label.toLowerCase()));
    if (!newTag || !newTag.length) return;

    mutator.tags.POST({
      label: newTag[0],
      description: newTag[0],
    });

    if (this.callout) {
      const message = <FormattedMessage id="stripes-erm-components.newTagCreated" />;
      this.calloutRef.current.sendCallout({ message });
    }
  }

  render() {
    const { resources, stripes } = this.props;
    const { entity } = this.state;
    const entityTagsArray = get(entity, ['tags'], []);
    const entityTags = entityTagsArray.map(tag => tag.value.toLowerCase());
    const tags = (resources.tags || {}).records || [];

    return (
      <Pane
        defaultWidth="20%"
        paneTitle={<FormattedMessage id="stripes-erm-components.tags" />}
        paneSub={<FormattedMessage id="stripes-erm-components.numberOfTags" values={{ count: entityTags.length }} />}
        dismissible
        onClose={this.props.onToggle}
      >
        <TagsForm
          onRemove={this.onRemove}
          onAdd={this.onAdd}
          tags={tags}
          entityTags={entityTags}
          stripes={stripes}
        />

        <Callout ref={this.calloutRef} />
      </Pane>
    );
  }
}

export default stripesConnect(Tags);
