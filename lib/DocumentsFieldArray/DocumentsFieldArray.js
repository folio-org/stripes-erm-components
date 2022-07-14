import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Button,
  Layout,
} from '@folio/stripes/components';

import { useKiwtFieldArray } from '@k-int/stripes-kint-components';
import EditCard from '../EditCard';
import DocumentField from './DocumentField';

const DocumentsFieldArray = ({
  addDocBtnLabel,
  deleteBtnTooltipMsgId,
  documentCategories,
  hasDownloadPerm,
  isEmptyMessage,
  fields: { name },
  onDownloadFile,
  onUploadFile
}) => {
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(name, true);

  const renderDocs = () => {
    return items.map((doc, i) => (
      <EditCard
        key={i}
        data-test-document-field
        data-testid={`documentsFieldArray[${i}]`}
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
  };

  const renderEmpty = () => (
    <Layout className="padding-bottom-gutter" data-test-document-field-empty-message>
      {isEmptyMessage}
    </Layout>
  );

  return (
    <div
      data-test-documents-field-array
      data-testid="documentsFieldArray"
    >
      <div>
        {items.length ? renderDocs() : renderEmpty()}
      </div>
      <Button
        data-test-documents-field-array-add-button
        id={`add-${name}-btn`}
        onClick={() => onAddField()}
      >
        {addDocBtnLabel}
      </Button>
    </div>
  );
};

DocumentsFieldArray.propTypes = {
  addDocBtnLabel: PropTypes.node,
  deleteBtnTooltipMsgId: PropTypes.string,
  documentCategories: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  hasDownloadPerm: PropTypes.bool,
  isEmptyMessage: PropTypes.node,
  fields: PropTypes.shape({
    name: PropTypes.string,
  }),
  onDownloadFile: PropTypes.func,
  onUploadFile: PropTypes.func,
};

DocumentsFieldArray.defaultProps = {
  addDocBtnLabel: <FormattedMessage id="stripes-erm-components.doc.addDoc" />,
  hasDownloadPerm: false,
  isEmptyMessage: <FormattedMessage id="stripes-erm-components.doc.noDocs" />,
};

export default DocumentsFieldArray;
