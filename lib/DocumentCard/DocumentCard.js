import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Headline,
  Icon,
  KeyValue,
  Layout,
  MultiColumnList,
} from '@folio/stripes/components';

import css from './DocumentCard.css';

export default class DocumentCard extends React.Component {
  static propTypes = {
    location: PropTypes.string,
    name: PropTypes.string.isRequired,
    note: PropTypes.string,
    url: PropTypes.string,
  };

  renderType = (line) => {
    if (line.location) return <FormattedMessage id="stripes-erm-components.doc.location" />;
    if (line.url) return <FormattedMessage id="stripes-erm-components.doc.url" />;

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

  renderReference = (line) => {
    if (line.url) return this.renderUrl(line.url);
    if (line.location) return this.renderLocation(line.location);

    return null;
  }

  render() {
    const { location, name, note, url } = this.props;

    const contentData = [];
    if (location) contentData.push({ location });
    if (url) contentData.push({ url });

    return (
      <Layout className={`marginTopHalf ${css.docCard}`} data-test-doc={name}>
        <Headline data-test-doc-name={name} margin="none">
          {name}
        </Headline>
        <KeyValue label={<FormattedMessage id="stripes-erm-components.doc.note" />}>
          <div data-test-doc-note>{note}</div>
        </KeyValue>
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
      </Layout>
    );
  }
}
