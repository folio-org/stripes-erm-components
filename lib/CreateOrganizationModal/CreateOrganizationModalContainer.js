import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, TextField } from '@folio/stripes/components';

export default class CreateOrganizationModal extends React.Component {
  static manifest = Object.freeze({
    organizations: {
      type: 'okapi',
      path: '!{path}',
      fetch: false,
      accumulate: true,
    }
  })

  static propTypes = {
    id: PropTypes.string,
    mutator: PropTypes.shape({
      organizations: PropTypes.shape({
        GET: PropTypes.func,
        POST: PropTypes.func,
        reset: PropTypes.func,
      })
    }),
    open: PropTypes.bool,
    onClose: PropTypes.func,
    path: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  }

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      name: '',
    };
  }

  createOrganization = () => {
    const { mutator: { organizations } } = this.props;

    this.setState({ error: null });

    organizations.reset();
    organizations
      .GET({ params: { match: 'name', term: this.state.name } })
      .then(results => {
        if (results && results.length) {
          this.setState({ error: <FormattedMessage id="stripes-erm-components.createOrg.alreadyExists" /> });
        } else {
          organizations
            .POST({ name: this.state.name })
            .then(() => { this.props.onClose(); })
            .catch(error => this.setState({ error }));
        }
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    return (
      <Modal
        id={this.props.id}
        dismissible
        label={<FormattedMessage id="stripes-erm-components.createOrg.createNew" />}
        onClose={this.props.onClose}
        open={this.props.open}
        size="small"
      >
        <TextField
          error={this.state.error}
          id="create-org-modal-name-field"
          label={<FormattedMessage id="stripes-erm-components.createOrg.name" />}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <Button
          buttonStyle="primary"
          disabled={!this.state.name}
          id="create-org-modal-submit-btn"
          onClick={e => {
            e.preventDefault();
            this.createOrganization();
          }}
        >
          <FormattedMessage id="stripes-erm-components.createOrg.createNew" />
        </Button>
      </Modal>
    );
  }
}
