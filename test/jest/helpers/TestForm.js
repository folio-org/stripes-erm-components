import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { Button } from '@folio/stripes/components';

const TestForm = ({
  children,
  initialValues,
  onSubmit,
  handleSubmit
}) => {
  return (
    <Form
      initialValues={initialValues}
      mutators={arrayMutators}
      onSubmit={onSubmit}
    >
      {props => (
        <form onSubmit={handleSubmit}>
          {children}
          <Button id="submit" type="submit">
              Submit
          </Button>
        </form>
      )}
    </Form>
  );
};

export default TestForm;
