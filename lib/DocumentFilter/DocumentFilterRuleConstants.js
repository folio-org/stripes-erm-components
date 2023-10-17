import { useIntl } from 'react-intl';

const DocumentFilterRuleConstants = (useSupplementaryDocs) => {
  const intl = useIntl();

  const operators = [
    { label: '', value: '' },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.operator.is' }),
      value: '==',
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.operator.contains' }),
      value: '=~',
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.operator.doesNotContain' }),
      value: '!~',
    },
  ];

  const supplementaryDocs = [
    { label: '', value: '' },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.doc.name' }),
      value: 'supplementaryDocs.name',
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.doc.note' }),
      value: 'supplementaryDocs.note',
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.doc.category' }),
      value: 'supplementaryDocs.atType.value',
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.doc.location' }),
      value: 'supplementaryDocs.location',
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.doc.url' }),
      value: 'supplementaryDocs.url',
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.contentType' }),
      value: 'supplementaryDocs.fileUpload.fileContentType',
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.fuf.filename' }),
      value: 'supplementaryDocs.fileUpload.fileName',
    },
  ];
  const docs = [
    { label: '', value: '' },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.doc.name' }),
      value: 'docs.name',
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.doc.note' }),
      value: 'docs.note',
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.doc.location' }),
      value: 'docs.location',
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.doc.url' }),
      value: 'docs.url',
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.contentType' }),
      value: 'docs.fileUpload.fileContentType',
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.fuf.filename' }),
      value: 'docs.fileUpload.fileName',
    },
  ];

  const attributes = useSupplementaryDocs ? supplementaryDocs : docs;

  return { operators, attributes };
};

export default DocumentFilterRuleConstants;
