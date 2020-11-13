import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
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
import { withStripes } from '@folio/stripes/core';

class DocumentCard extends React.Component {
  static propTypes = {
    fileUpload: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    location: PropTypes.string,
    name: PropTypes.string.isRequired,
    note: PropTypes.string,
    onDownloadFile: PropTypes.func,
    url: PropTypes.string,
  };

  renderType = (line) => {
    if (line.location) return <FormattedMessage id="stripes-erm-components.doc.location" />;
    if (line.url) return <FormattedMessage id="stripes-erm-components.doc.url" />;
    if (line.fileUpload) return <FormattedMessage id="stripes-erm-components.doc.file" />;

    // istanbul ignore next
    return null;
  }

  renderUrl = (url) => (
    <a
      data-test-doc-url
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {url}
      <Icon icon="external-link" />
    </a>
  )

  renderLocation = (location) => <span data-test-doc-location>{location}</span>

  renderFile = (file) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      data-test-doc-file
      href="#"
      onClick={(e) => {
        this.props.onDownloadFile(file);
        e.preventDefault();
      }}
      rel="noopener noreferrer"
      target="_blank"
    >
      {file.name}
      <Icon icon="external-link" />
    </a>
  )

  renderReference = (line) => {
    if (line.url) return this.renderUrl(line.url);
    if (line.location) return this.renderLocation(line.location);
    if (line.fileUpload) return this.renderFile(line.fileUpload);

    return null;
  }

  render() {
    const { fileUpload, location, name, note, url } = this.props;
    const category = get(this.props, ['atType', 'label']);

    const contentData = [];
    if (location) contentData.push({ location });
    if (url) contentData.push({ url });
    if (fileUpload) contentData.push({ fileUpload });

    return (
      <Card
        data-test-doc={name}
        headerProps={{ 'data-test-doc-name': name }}
        headerStart={<strong>{name}</strong>}
      >
        <Row>
          <Col xs={category ? 8 : 12}>
            {note ?
              <KeyValue label={<FormattedMessage id="stripes-erm-components.doc.note" />}>
                <div data-test-doc-note style={{ whiteSpace: 'pre-wrap' }}>{note}</div>
              </KeyValue> :
              <NoValue/>
            }
          </Col>
          <Col xs={category ? 4 : 0}>
            {category &&
              <KeyValue label={<FormattedMessage id="stripes-erm-components.doc.category" />}>
                <div data-test-doc-category>{category}</div>
              </KeyValue>
            }
          </Col>
        </Row>
        <MultiColumnList
          columnMapping={{
            type: <FormattedMessage id="stripes-erm-components.doc.type" />,
            reference: <FormattedMessage id="stripes-erm-components.doc.reference" />,
          }}
          contentData={contentData}
          formatter={{
            type: line => this.renderType(line),
            reference: line => this.renderReference(line),
          }}
          interactive={false}
          visibleColumns={['type', 'reference']}
        />
      </Card>
    );
  }
}

export default withStripes(DocumentCard);
