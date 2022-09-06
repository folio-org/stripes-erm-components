/* eslint-disable react/prop-types */
import React from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { Button } from '@folio/stripes/components';

const TestForm = ({
  children,
  mutators,
  ...formProps
}) => {
  return (
    <Form
      mutators={{
        ...arrayMutators,
        ...mutators
      }}
      {...formProps}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {children}
          <Button data-testid="submit" id="submit" type="submit">
            Submit
          </Button>
        </form>
      )}
    </Form>
  );
};
export default TestForm;
