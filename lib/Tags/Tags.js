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
  };

  constructor(props) {
    super(props);
    this.calloutRef = React.createRef();
    this.state = { entity: [] };
  }

  static getDerivedStateFromProps(props) {
    const entity = get(props, 'resources.entities.records[0]');

    if (entity) return { entity };

    return null;
  }

  onAdd = (tags) => {
    this.saveEntityTags(tags);
    this.saveTags(tags);
  }

  onRemove = (tag) => {
    const entity = this.state.entity;
    const tags = entity.tags || [];

    const tagToDelete = tags.filter(t => t.value.toLowerCase() === tag.toLowerCase());
    const deletedTagList = tags.filter(t => t.value.toLowerCase() !== tag.toLowerCase());
    const updateEntity = cloneDeep(entity);

    const toDelete = [{ id: tagToDelete[0].id, _delete:true }];

    this.props.mutator.entities
      .PUT({ tags: toDelete })
      .then(() => {
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

    const newTags = sortBy(uniqBy([...tagListMap, ...tagsMap], 'value'));

    this.props.mutator.entities.PUT({ tags: newTags });
  }

  // add tags to global list of tags
  saveTags(tags) {
    const { mutator, resources } = this.props;
    const records = get(resources, 'tags.records', []);
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
    const tags = get(this.props.resources, 'tags.records', []);
    const entityTags = get(this.state.entity, 'tags', [])
      .map(tag => tag.value.toLowerCase());

    return (
      <Pane
        defaultWidth="20%"
        dismissible
        onClose={this.props.onToggle}
        paneSub={<FormattedMessage id="stripes-erm-components.numberOfTags" values={{ count: entityTags.length }} />}
        paneTitle={<FormattedMessage id="stripes-erm-components.tags" />}
      >
        <TagsForm
          entityTags={entityTags}
          onAdd={this.onAdd}
          onRemove={this.onRemove}
          tags={tags}
        />

        <Callout ref={this.calloutRef} />
      </Pane>
    );
  }
}

export default stripesConnect(Tags);
