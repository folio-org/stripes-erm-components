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
    hasDownloadPerm: false,
    isEmptyMessage: <FormattedMessage id="stripes-erm-components.doc.noDocs" />,
  }

  renderDocs = () => {
    const {
      deleteBtnTooltipMsgId,
      documentCategories,
      hasDownloadPerm,
      items,
      name,
      onDeleteField,
      onDownloadFile,
      onUploadFile
    } = this.props;

    return items.map((doc, i) => (
      <EditCard
        key={i}
        data-test-document-field
        deleteBtnProps={{
          'id': `${name}-delete-${i}`,
          'data-test-delete-field-button': true
        }}
        deleteButtonTooltipText={(
          deleteBtnTooltipMsgId ?
            <FormattedMessage id={deleteBtnTooltipMsgId} values={{ index: i + 1 }} />
            :
            undefined
        )}
        header={<FormattedMessage id="stripes-erm-components.doc.title" values={{ number: i + 1 }} />}
        onDelete={() => onDeleteField(i, doc)}
      >
        <Field
          component={DocumentField}
          documentCategories={documentCategories}
          hasDownloadPerm={hasDownloadPerm}
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
    <Layout className="padding-bottom-gutter" data-test-document-field-empty-message>
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
