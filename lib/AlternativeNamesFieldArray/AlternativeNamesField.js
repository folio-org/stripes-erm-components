import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import { TextField } from '@folio/stripes/components';
import { required } from '../validators';

export default class AlternativeNamesField extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    if (!this.props.input.value && this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  render = () => {
    const {
      id,
      input: { name },
    } = this.props;

    return (
      <Field
        component={TextField}
        data-test-alternative-names-field
        id={id}
        inputRef={this.inputRef}
        maxLength="255"
        name={name}
        validate={required}
      />
    );
  }
}
