import { useIntl } from 'react-intl';

const DocumentFilterRuleConstants = ({filterName = 'docs'}) => {
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

  const attributes = [
    { label: '', value: '' },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.doc.name' }),
      value: `${filterName}.name`,
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.doc.note' }),
      value: `${filterName}.note`,
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.doc.location' }),
      value: `${filterName}.location`,
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.doc.url' }),
      value: `${filterName}.url`,
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.contentType' }),
      value: `${filterName}.fileUpload.fileContentType`,
    },
    {
      label: intl.formatMessage({ id: 'stripes-erm-components.fuf.filename' }),
      value: `${filterName}.fileUpload.fileName`,
    },
  ];

  // Include additional line specific to supplementaryDocs
  if (useSupplementaryDocs) {
    attributes.splice(3, 0, {
      label: intl.formatMessage({ id: 'stripes-erm-components.doc.category' }),
      value: `${filterName}.atType.value`,
    });
  }

  return { operators, attributes };
};

export default DocumentFilterRuleConstants;
