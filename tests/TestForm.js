/*
  Basic harness prop for testing stripes-final-form functionality
  children should be a <Field> component with the tested component passed
  as the 'component' prop.
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';


export default class TestForm extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <Form
        onSubmit={() => {}}
        mutators={arrayMutators}
      >
        {props => (
          <form onSubmit={props.onSubmit}>
            {this.props.children}
          </form>
        )}
      </Form>
    );
  }
}
