import React from 'react';
import PropTypes from 'prop-types';

import CustomPropertyFieldEdit from './CustomPropertyFieldEdit';
import CustomPropertyFieldView from './CustomPropertyFieldView';

export default class CustomPropertyField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.shape({ id: PropTypes.string }),
        PropTypes.string,
      ]).isRequired,
    }).isRequired,
    mutators: PropTypes.shape({
      setCustomPropertyValue: PropTypes.func.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const { value } = props.input;

    this.state = {
      editing: !(value && value.id),
      initialValue: value,
    };
  }

  handleEdit = () => {
    this.setState({
      initialValue: this.props.input.value,
      editing: true,
    });
  }

  handleCancel = () => {
    const {
      input: { name, value },
      mutators,
      onDelete,
    } = this.props;

    if (value.id) {
      mutators.setCustomPropertyValue(name, this.state.initialValue);
    } else {
      onDelete();
    }

    this.setState({
      editing: false,
    });
  }

  handleSave = () => {
    this.props.onSave()
      .then(() => this.setState({ editing: false }));
  }

  render() {
    const CustomPropertyComponent = this.state.editing ? CustomPropertyFieldEdit : CustomPropertyFieldView;

    return (
      <CustomPropertyComponent
        {...this.props}
        onCancel={this.handleCancel}
        onDelete={this.props.onDelete}
        onSave={this.handleSave}
        onEdit={this.handleEdit}
      />
    );
  }
}
