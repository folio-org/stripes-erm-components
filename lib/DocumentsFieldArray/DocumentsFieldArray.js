import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Button,
  Layout,
} from '@folio/stripes/components';

import EditCard from '../EditCard';
import withKiwtFieldArray from '../withKiwtFieldArray';
import DocumentField from './DocumentField';

class DocumentsFieldArray extends React.Component {
  static propTypes = {
    addDocBtnLabel: PropTypes.node,
    // TODO - make the following line work
    // deleteButtonTooltipText: deprecated(PropTypes.node, `Use the "deleteBtnTooltipMsgId" to pass in a translation string instead.`),
    deleteButtonTooltipText: PropTypes.node,
    deleteBtnTooltipMsgId: PropTypes.string,
    documentCategories: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    isEmptyMessage: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string.isRequired,
    onAddField: PropTypes.func.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    onDownloadFile: PropTypes.func,
    onUploadFile: PropTypes.func,
  }

  static defaultProps = {
    addDocBtnLabel: <FormattedMessage id="stripes-erm-components.doc.addDoc" />,
    isEmptyMessage: <FormattedMessage id="stripes-erm-components.doc.noDocs" />,
  }

  renderDocs = () => {
    const {
      deleteButtonTooltipText,
      deleteBtnTooltipMsgId,
      documentCategories,
      items,
      name,
      onDeleteField,
      onDownloadFile,
      onUploadFile
    } = this.props;

    return items.map((doc, i) => (
      <EditCard
        data-test-document-field
        deleteBtnProps={{
          'id': `${name}-delete-${i}`,
          'data-test-delete-field-button': true
        }}
        // deleteButtonTooltipText is deprecated, the below checks if it's being used, and uses it if it is, otherwise uses the new deleteBtnTooltipMsgId prop
        deleteButtonTooltipText={deleteButtonTooltipText ? deleteButtonTooltipText : <FormattedMessage id={deleteBtnTooltipMsgId} values={{ index: i + 1}} />}
        header={<FormattedMessage id="stripes-erm-components.doc.title" values={{ number: i + 1 }} />}
        key={i}
        onDelete={() => onDeleteField(i, doc)}
      >
        <Field
          component={DocumentField}
          documentCategories={documentCategories}
          id={`${name}-${i}`}
          index={i}
          name={`${name}[${i}]`}
          onDownloadFile={onDownloadFile}
          onUploadFile={onUploadFile}
        />
      </EditCard>
    ));
  }

  renderEmpty = () => (
    <Layout data-test-document-field-empty-message className="padding-bottom-gutter">
      {this.props.isEmptyMessage}
    </Layout>
  )

  render() {
    const { items, name, onAddField } = this.props;

    return (
      <div data-test-documents-field-array>
        <div>
          {items.length ? this.renderDocs() : this.renderEmpty()}
        </div>
        <Button
          data-test-documents-field-array-add-button
          id={`add-${name}-btn`}
          onClick={() => onAddField()}
        >
          {this.props.addDocBtnLabel}
        </Button>
      </div>
    );
  }
}

export default withKiwtFieldArray(DocumentsFieldArray);
