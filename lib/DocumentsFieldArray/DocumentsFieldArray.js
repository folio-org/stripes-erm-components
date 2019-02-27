import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  Button,
  Col,
  Layout,
  Row,
  TextArea,
  TextField,
  IconButton,
} from '@folio/stripes/components';

export default class DocumentsFieldArray extends React.Component {
  static propTypes = {
    fields: PropTypes.object,
  }

  static propTypes = {
    addDocBtnLabel: PropTypes.node,
    isEmptyMessage: PropTypes.node,
  }

  static defaultProps = {
    addDocBtnLabel: <FormattedMessage id="stripes-erm-components.doc.addDoc" />,
    isEmptyMessage: <FormattedMessage id="stripes-erm-components.doc.noDocs" />,
  }

  handleDeleteDoc = (index, doc) => {
    const { fields } = this.props;

    fields.remove(index);

    if (doc.id) {
      fields.push({ id: doc.id, _delete: true });
    }
  }

  validateDocIsSpecified = (value, allValues, props, name) => {
    const index = parseInt(/\[([0-9]*)\]/.exec(name)[1], 10);
    const { location, url } = get(allValues, [this.props.fields.name, index], {});
    if (!location && !url) {
      return <FormattedMessage id="stripes-erm-components.doc.error.docsMustHaveLocationOrURL" />;
    }

    return undefined;
  }

  validateURLIsValid = (value) => {
    if (value) {
      try {
        const test = new URL(value); // eslint-disable-line no-unused-vars
      } catch (_) {
        return <FormattedMessage id="stripes-erm-components.doc.error.invalidURL" />;
      }
    }

    return undefined;
  }

  validateRequired = (value) => (
    !value ? <FormattedMessage id="stripes-core.label.missingRequiredField" /> : undefined
  )

  renderDocs = (docs) => {
    const { fields } = this.props;

    return docs.map((doc, i) => (
      <div>
        <Row>
          <Col xs={11}>
            <Field
              component={TextField}
              id="license-doc-name"
              label={<FormattedMessage id="stripes-erm-components.doc.name" />}
              name={`${fields.name}[${i}].name`}
              required
              validate={this.validateRequired}
            />
          </Col>
          <Col xs={1}>
            <IconButton
              icon="trash"
              id={`${fields.name}-delete-${i}`}
              onClick={() => this.handleDeleteDoc(i, doc)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={11}>
            <Field
              component={TextArea}
              id="license-doc-note"
              label={<FormattedMessage id="stripes-erm-components.doc.note" />}
              name={`${fields.name}[${i}].note`}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={11}>
            <Field
              component={TextField}
              id="license-doc-location"
              label={<FormattedMessage id="stripes-erm-components.doc.location" />}
              name={`${fields.name}[${i}].location`}
              validate={this.validateDocIsSpecified}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={11}>
            <Field
              component={TextField}
              id="license-doc-url"
              label={<FormattedMessage id="stripes-erm-components.doc.url" />}
              name={`${fields.name}[${i}].url`}
              validate={[
                this.validateDocIsSpecified,
                this.validateURLIsValid,
              ]}
            />
          </Col>
        </Row>
      </div>
    ));
  }

  renderEmpty = () => (
    <Layout className="padding-bottom-gutter">
      { this.props.isEmptyMessage }
    </Layout>
  )

  render() {
    const { fields } = this.props;
    const docs = (fields.getAll() || [])
      .filter(d => d._delete !== true);

    return (
      <div>
        <div>
          { docs.length ? this.renderDocs(docs) : this.renderEmpty() }
        </div>
        <Button id={`add-${fields.name}-btn`} onClick={() => fields.push({})}>
          { this.props.addDocBtnLabel }
        </Button>
      </div>
    );
  }
}
