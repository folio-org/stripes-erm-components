import React from 'react';
import PropTypes from 'prop-types';

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const getValues = fields => {
  // Get the values from either react-final-form or redux-form
  const values = fields.getAll ? fields.getAll() : fields.value;

  return values || [];
};


export default function withKiwtFieldArray(WrappedComponent) {
  class WithKiwtFieldArray extends React.Component {
    static propTypes = {
      fields: PropTypes.shape({
        getAll: PropTypes.func, // redux-form
        insert: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        push: PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired,
        unshift: PropTypes.func.isRequired,
        update: PropTypes.func, // react-final-form-arrays
        value: PropTypes.array, // react-final-form-arrays
      }).isRequired,
    }

    /*
    This HOC maintains an "end of list" marker in `state. The EOL is actually the end of the visible list -
    that is, fields that aren't marked for deletion. The EOL Marker is updated automatically in
    getDerivedStateFromProps based on actions taken in the handler methods provided to the wrapped
    component.

    The point of this is to ensure that the indices passed to Field by the wrapped component
    always match the indices in the underlying fields. Ie, it allows the wrapped component to simply
    iterate over the `items` it gets and use those indices in the Field `name` prop.
    As a result, edited form values always target the correct index.

    Fields to be saved are only located between indices 0 and the EOL Marker.
    Fields to be deleted are only located after the EOL Marker.

    This was all born out of ERM-420.
    */
    state = {
      endOfList: 0, // Tracks the end of the "real" list that doesn't contain _delete entries.
    }

    static getDerivedStateFromProps(props) {
      const items = getValues(props.fields).filter(line => !line._delete);
      return { endOfList: items.length };
    }

    handleAddField = (field = { _delete: false }) => {
      this.props.fields.insert(this.state.endOfList, field);
    }

    handleDeleteField = (index, field) => {
      this.props.fields.remove(index);
      this.handleMarkForDeletion(field);
    }

    handlePrependField = (field = { _delete: false }) => {
      this.props.fields.unshift(field);
    }

    handleReplaceField = (index, field) => {
      const { fields } = this.props;

      if (fields.update) { // react-final-form-arrays
        fields.update(index, field);
      } else { // redux-form
        setTimeout(() => {
          this.props.fields.remove(index);
          this.props.fields.insert(index, field);
        }, 500);
      }
    }

    handleMarkForDeletion = (field) => {
      if (field && field.id) {
        this.props.fields.push({ id: field.id, _delete: true });
      }
    }

    render() {
      const { fields } = this.props;

      // Only provide the items that aren't marked for deletion.
      const items = getValues(fields).slice(0, this.state.endOfList);

      return (
        <WrappedComponent
          {...this.props}
          items={items}
          name={fields.name}
          onAddField={this.handleAddField}
          onDeleteField={this.handleDeleteField}
          onMarkForDeletion={this.handleMarkForDeletion}
          onPrependField={this.handlePrependField}
          onReplaceField={this.handleReplaceField}
        />
      );
    }
  }

  WithKiwtFieldArray.displayName = `WithKiwtFieldArray(${getDisplayName(WrappedComponent)})`;
  return WithKiwtFieldArray;
}
