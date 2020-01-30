import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { get } from 'lodash';

import { Field } from 'react-final-form';

import TermsListField from './TermsListField';

class FormTerms extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      terms: PropTypes.array,
    }),
    intl: intlShape.isRequired,
  };

  constructor(props) {
    super(props);
    this.refToTermsListField = React.createRef();
    this.state = {
      terms: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { terms } = props.data;
    if (terms.length !== state.terms.length) {
      return {
        terms: terms.map((term) => {
          let options = get(term.category, ['values']);
          if (options) {
            options = [{
              label: props.intl.formatMessage({ id: 'stripes-erm-components.formTerms.notSet' }),
              value: '',
            },
            ...options];
          }

          return {
            description: term.description,
            label: term.label,
            primary: term.primary,
            type: term.type,
            options,
            value: term.name,
            defaultInternal: term.defaultInternal,
          };
        }),
      };
    }

    return null;
  }

  render() {
    return (
      <Field
        name="customProperties"
        validate={(value) => this.refToTermsListField.current && this.refToTermsListField.current.isInvalid(value)}
        {...this.props}
        render={props => {
          return (
            <TermsListField
              availableTerms={this.state.terms}
              ref={this.refToTermsListField}
              {...props}
            />
          );
        }}
      />
    );
  }
}

export default injectIntl(FormTerms);
