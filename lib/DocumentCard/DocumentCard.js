import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Card,
  Col,
  Icon,
  KeyValue,
  MultiColumnList,
  NoValue,
  Row,
} from '@folio/stripes/components';

const DocumentCard = ({
  atType: {
    label: category
  } = {},
  fileUpload,
  hasDownloadPerm = false,
  hideCategory = false,
  location,
  name,
  note,
  onDownloadFile,
  url
}) => {
  const contentData = [];
  if (location) contentData.push({ location });
  if (url) contentData.push({ url });
  if (fileUpload) contentData.push({ fileUpload });

  const renderType = (line) => {
    if (line.location) return <FormattedMessage id="stripes-erm-components.doc.location" />;
    if (line.url) return <FormattedMessage id="stripes-erm-components.doc.url" />;
    if (line.fileUpload) return <FormattedMessage id="stripes-erm-components.doc.file" />;

    // istanbul ignore next
    return null;
  };

  const renderUrl = (theUrl) => (
    <a
      data-test-doc-url
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {theUrl}
      <Icon icon="external-link" />
    </a>
  );

  const renderLocation = (theLocation) => <span data-test-doc-location>{theLocation}</span>;

  const renderFile = (theFile) => {
    if (hasDownloadPerm) {
      return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          data-test-doc-file
          href="#"
          onClick={(e) => {
            onDownloadFile(theFile);
            e.preventDefault();
          }}
          rel="noopener noreferrer"
          target="_blank"
        >
          {theFile.name}
          <Icon icon="download" />
        </a>
      );
    }

    return theFile.name;
  };

  const renderReference = (line) => {
    if (line.url) return renderUrl(line.url);
    if (line.location) return renderLocation(line.location);
    if (line.fileUpload) return renderFile(line.fileUpload);

    return null;
  };

  const categorySection = () => {
    if (!hideCategory) {
      return (
        <KeyValue label={<FormattedMessage id="stripes-erm-components.doc.category" />}>
          {category ? <div data-test-doc-category>{category}</div> : null}
        </KeyValue>
      );
    }

    return null;
  };

  return (
    <Card
      data-test-doc={name}
      headerProps={{ 'data-test-doc-name': name }}
      headerStart={<strong>{name}</strong>}
    >
      <Row>
        <Col xs={8}>
          <KeyValue label={<FormattedMessage id="stripes-erm-components.doc.note" />}>
            {note ?
              <div data-test-doc-note style={{ whiteSpace: 'pre-wrap' }}>{note}</div> :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={4}>
          {categorySection()}
        </Col>
      </Row>
      <MultiColumnList
        columnMapping={{
          type: <FormattedMessage id="stripes-erm-components.doc.type" />,
          reference: <FormattedMessage id="stripes-erm-components.doc.reference" />,
        }}
        contentData={contentData}
        formatter={{
          type: line => renderType(line),
          reference: line => renderReference(line),
        }}
        id="documents-locations"
        interactive={false}
        visibleColumns={['type', 'reference']}
      />
    </Card>
  );
};

DocumentCard.propTypes = {
  atType: PropTypes.shape({
    label: PropTypes.string
  }),
  fileUpload: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  hasDownloadPerm: PropTypes.bool,
  hideCategory: PropTypes.bool,
  location: PropTypes.string,
  name: PropTypes.string.isRequired,
  note: PropTypes.string,
  onDownloadFile: PropTypes.func,
  url: PropTypes.string,
};

export default DocumentCard;
