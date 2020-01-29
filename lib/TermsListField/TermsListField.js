import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { IntlConsumer } from '@folio/stripes/core';
import {
  Button,
  Col,
  KeyValue,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import { isEmpty } from 'lodash';

import EditCard from '../EditCard';

const TERM_TYPE_TEXT = 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'; // eslint-disable-line no-unused-vars
const TERM_TYPE_NUMBER = 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger';
const TERM_TYPE_SELECT = 'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata';

export default class TermsListField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      onChange: PropTypes.func,
    }),
    meta: PropTypes.object,
    availableTerms: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string,
      label: PropTypes.string.isRequired,
      options: PropTypes.array,
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      defaultInternal: PropTypes.bool,
    })).isRequired,
  };

  state = {
    terms: [], // This is the list of terms we're currently displaying for edit.
    errors: {},
  }

  static getDerivedStateFromProps(props, state) {
    const {
      input: { value },
      meta: { pristine },
      availableTerms = [],
    } = props;

    // When the user loads this form, we want to init the list of terms
    // we're displaying (state.terms) with the list of terms that have been set
    // either via defaults or previously-saved data. Since that data may come in
    // _after_ we have mounted this component, we need to check if new data has come in
    // while the form is still marked as pristine.
    //
    // final-form unsets `pristine` after its `onChange` is called, but we also dirty
    // the component when we add/remove rows. That happens _before_ `onChange` is called,
    // so internally we use `state.dirtying` to show that we just initiated an action
    // that will result in a dirty component.
    if (pristine && !state.dirtying) {
      return {
        terms: availableTerms.filter(term => value[term.value] !== undefined),
      };
    }

    return null;
  }

  getTerm = (termValue) => {
    return this.props.availableTerms.find(term => term.value === termValue);
  }

  renderTermName = (term, i) => {
    const { availableTerms, input: { onChange, value } } = this.props;

    const unsetTerms = availableTerms.filter(t => {
      const termValue = value[t.value];

      // The term is unset and has no value.
      if (termValue === undefined) return true;

      // The term is set but is marked for deletion. Allow reuse.
      if (termValue[0] && termValue[0]._delete) return true;

      return false;
    });

    const termValue = value[term.value];
    const id = termValue ? termValue[0].id : null;

    return (
      <Select
        autoFocus={!id}
        data-test-term-name
        dataOptions={[term, ...unsetTerms]} // The selected term, and the available unset terms
        id={`edit-term-${i}-name`}
        label={<FormattedMessage id="ui-licenses.prop.termName" />}
        onChange={e => {
          const newValue = e.target.value;

          // Update `state.terms` which controls what terms are being edited.
          this.setState(prevState => {
            const newTerms = [...prevState.terms];
            newTerms[i] = this.getTerm(newValue);

            return { terms: newTerms };
          });

          // Update final-form (which tracks what the values for a given term are) because
          // in essence we're deleting a term and creating a new term.
          // We do this by 1) marking the current term for deletion and 2) initing
          // the new term to an empty object.
          const currentValue = value[term.value] ? value[term.value][0] : {};
          onChange({
            ...value,
            [term.value]: [{
              id: currentValue.id,
              _delete: true,
            }],
            [newValue]: [{}],
          });
        }}
        required
        value={term.value}
      />
    );
  }


  isInvalid = (values) => {
    const errors = {};

    this.state.terms.forEach((term) => {
      const val = values ? values[term.value] : [];
      const { note, publicNote, value } = val ? val[0] : {};

      if (!term.primary && term.value && !value) {
        errors[term.value] = <FormattedMessage id="stripes-core.label.missingRequiredField" />;
      }

      if ((note && !value) || (publicNote && !value)) {
        errors[term.value] = <FormattedMessage id="ui-licenses.errors.termNoteWithoutValue" />;
      }

      if (term.type === TERM_TYPE_NUMBER) {
        const min = Number.MIN_SAFE_INTEGER;
        const max = Number.MAX_SAFE_INTEGER;
        if (value < min || value > max) {
          errors[term.value] = <FormattedMessage id="ui-licenses.errors.termValueNotInRange" values={{ min, max }} />;
        }
      }
    });

    this.setState({ errors });

    return Object.keys(errors).length > 0;
  }

  renderTermValue = (term, i) => {
    const { input: { onChange, value } } = this.props;
    const { errors } = this.state;
    const currentValue = value[term.value] ? value[term.value][0] : {};

    // Initialise to just the value (for text/number values)
    // and then check if it's an object (for Select/refdata values).
    let controlledFieldValue = currentValue.value;
    if (controlledFieldValue && controlledFieldValue.value) {
      controlledFieldValue = controlledFieldValue.value;
    }

    // Figure out which component we're rendering and specify its unique props.
    let FieldComponent = TextArea;
    const fieldProps = {};
    if (term.type === TERM_TYPE_SELECT) {
      FieldComponent = Select;
      fieldProps.dataOptions = term.options;
    }

    if (term.type === TERM_TYPE_NUMBER) {
      FieldComponent = TextField;
      fieldProps.type = 'number';
    }

    const handleChange = e => {
      onChange({
        ...value,
        [term.value]: [{
          ...currentValue,
          _delete: e.target.value === '' ? true : undefined, // Delete term if removing the value.
          value: e.target.value
        }],
      });
    };

    return (
      <FieldComponent
        data-test-term-value
        id={`edit-term-${i}-value`}
        label={<FormattedMessage id="ui-licenses.prop.termValue" />}
        onChange={handleChange}
        value={controlledFieldValue}
        error={!isEmpty(errors) ? errors[term.value] : undefined}
        {...fieldProps}
        required={!term.primary}
      />
    );
  }

  renderTermVisibility = (term, i) => {
    const { input: { onChange, value } } = this.props;
    const termObject = value[term.value] ? value[term.value][0] : {};
    const { internal } = termObject;

    const dataOptions = (intl) => {
      return [
        { value: true, label: intl.formatMessage({ id: 'ui-licenses.term.internalTrue' }) },
        { value: false, label: intl.formatMessage({ id: 'ui-licenses.term.internalFalse' }) }
      ];
    };

    const handleChange = e => {
      onChange({
        ...value,
        [term.value]: [{
          ...termObject,
          internal: e.target.value
        }],
      });
    };

    return (
      /* TODO: Refactor this component to use `injectIntl` when Folio starts using react-intl 3.0 */
      <IntlConsumer>
        {intl => (
          <Select
            data-test-term-visibility
            id={`edit-term-${i}-visibility`}
            dataOptions={dataOptions(intl)}
            label={<FormattedMessage id="ui-licenses.prop.termVisibility" />}
            onChange={handleChange}
            value={internal === undefined ? term.defaultInternal : internal}
          />
        )}
      </IntlConsumer>
    );
  }

  handleDeleteTerm = (term, i) => {
    const { input: { onChange, value } } = this.props;
    const currentValue = value[term.value] ? value[term.value][0] : {};

    this.setState(prevState => {
      const newTerms = [...prevState.terms];
      newTerms.splice(i, 1);
      return {
        dirtying: true,
        terms: newTerms
      };
    });

    onChange({
      ...value,
      [term.value]: [{
        ...currentValue,
        _delete: true,
      }],
    });
  }

  renderTermNoteInternal = (term, i) => {
    const { input: { onChange, value } } = this.props;
    const termObject = value[term.value] ? value[term.value][0] : {};
    const { note } = termObject;

    const handleChange = e => {
      onChange({
        ...value,
        [term.value]: [{
          ...termObject,
          note: e.target.value
        }],
      });
    };

    return (
      <TextArea
        data-test-term-note
        id={`edit-term-${i}-internal-note`}
        label={<FormattedMessage id="ui-licenses.term.internalNote" />}
        onChange={handleChange}
        value={note}
      />
    );
  }

  renderTermNotePublic = (term, i) => {
    const { input: { onChange, value } } = this.props;
    const termObject = value[term.value] ? value[term.value][0] : {};
    const { publicNote } = termObject;

    const handleChange = e => {
      onChange({
        ...value,
        [term.value]: [{
          ...termObject,
          publicNote: e.target.value
        }],
      });
    };

    return (
      <TextArea
        data-test-term-public-note
        id={`edit-term-${i}-public-note`}
        onChange={handleChange}
        label={<FormattedMessage id="ui-licenses.term.publicNote" />}
        value={publicNote}
      />
    );
  }

  renderAddTerm = () => {
    return (
      <Button
        id="add-term-btn"
        onClick={() => {
          this.setState(prevState => {
            return {
              dirtying: true,
              terms: [...prevState.terms, {}],
            };
          });
        }}
      >
        <FormattedMessage id="ui-licenses.terms.add" />
      </Button>
    );
  }

  renderTermsList = () => {
    return (
      <div>
        <KeyValue
          label={<FormattedMessage id="ui-licenses.terms.primaryTerms" />}
          value={this.renderTerms('primary')}
        />
        <KeyValue
          label={<FormattedMessage id="ui-licenses.terms.optionalTerms" />}
          value={this.renderTerms('optional')}
        />
      </div>
    );
  }

  renderTerms = (termType) => {
    let optionalTermCounter = 0;

    const termsList = this.state.terms.map((term, i) => {
      if (termType === 'primary' && !term.primary) return undefined;
      if (termType === 'optional' && term.primary) return undefined;

      const deleteBtnProps = termType === 'optional' ? {
        'id': `edit-term-${i}-delete`,
        'data-test-term-delete-btn': true
      } : null;

      const header = termType === 'optional' ?
        <FormattedMessage id="ui-licenses.term.title" values={{ number: optionalTermCounter + 1 }} /> :
        term.label;

      optionalTermCounter += 1;

      return (
        <EditCard
          data-test-term={termType}
          deleteBtnProps={deleteBtnProps}
          deleteButtonTooltipText={<FormattedMessage id="ui-licenses.term.removeTerm" />}
          header={header}
          key={term.value}
          onDelete={termType === 'optional' ? () => this.handleDeleteTerm(term, i) : null}
        >
          {
            termType === 'optional' &&
            <Row>
              <Col xs={12}>
                {this.renderTermName(term, i)}
              </Col>
            </Row>
          }
          <Row>
            <Col xs={12} md={6}>
              {this.renderTermValue(term, i)}
            </Col>
            <Col xs={12} md={6}>
              {this.renderTermNoteInternal(term, i)}
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              {this.renderTermVisibility(term, i)}
            </Col>
            <Col xs={12} md={6}>
              {this.renderTermNotePublic(term, i)}
            </Col>
          </Row>
        </EditCard>
      );
    }).filter(term => term !== undefined);

    return termsList;
  }

  render() {
    return (
      <div>
        {this.renderTermsList()}
        {this.renderAddTerm()}
      </div>
    );
  }
}
