import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import SafeHTMLMessage from '@folio/react-intl-safe-html';
import { FieldArray } from 'react-final-form-arrays';

import { Callout, Pane } from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import CustomPropertiesConfigListFieldArray from './CustomPropertiesConfigListFieldArray';

class CustomPropertiesConfigForm extends React.Component {
  static propTypes = {
    initialValues: PropTypes.shape({
      customProperties: PropTypes.arrayOf(PropTypes.object),
    }),
    form: PropTypes.shape({
      mutators: PropTypes.object.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      url: PropTypes.string,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    pickLists: PropTypes.arrayOf(PropTypes.object),
  }

  sendCallout = (operation, outcome, error = '') => {
    this.callout.sendCallout({
      type: outcome,
      message: <FormattedMessage id={`stripes-erm-components.${this.getSettingsRoute()}.callout.${operation}.${outcome}`} values={{ error }} />,
      timeout: error ? 0 : undefined, // Don't autohide callouts with a specified error message.
    });
  }

  sendCalloutInUse = () => {
    const translationKey = `stripes-erm-components.customProperties.callout.delete.${(this.getSettingsRoute() === 'terms') ? 'term' : 'supplementaryProperty'}InUse`;

    return (
      this.callout.sendCallout({
        type: 'error',
        message: <SafeHTMLMessage id={translationKey} />,
        timeout: 0,
      })
    );
  }

  getSettingsRoute = () => {
    const { match } = this.props;
    const isLicenseTermsSettings = match?.url.indexOf('terms') !== -1;
    return isLicenseTermsSettings ? 'terms' : 'supplementaryProperties';
  }

  handleDelete = (customProperty) => {
    return this.props.onDelete(customProperty)
      .then(() => this.sendCallout('delete', 'success'))
      .catch(response => {
        // Attempt to show an error message if we got JSON back with a message.
        // If json()ification fails, show the generic error callout.
        response.json()
          .then((error) => {
            const pattern = new RegExp('violates foreign key constraint.*is still referenced from table', 's');
            if (pattern.test(error.message)) {
              this.sendCalloutInUse();
            } else {
              this.sendCallout('delete', 'error', error.message);
            }
          })
          .catch(() => this.sendCallout('delete', 'error'));

        // Return a rejected promise to break any downstream Promise chains.
        return Promise.reject();
      });
  }

  handleSave = (customProperty) => {
    return this.props.onSave(customProperty)
      .then(() => this.sendCallout('save', 'success'))
      .catch(response => {
        // Attempt to show an error message if we got JSON back with a message.
        // If json()ification fails, show the generic error callout.
        response.json()
          .then(error => this.sendCallout('save', 'error', error.message))
          .catch(() => this.sendCallout('save', 'error'));

        // Return a rejected promise to break any downstream Promise chains.
        return Promise.reject();
      });
  }

  render() {
    const {
      form: { mutators },
      pickLists,
    } = this.props;

    const count = get(this.props, 'initialValues.customProperties.length', 0);

    return (
      <Pane
        defaultWidth="fill"
        id={`settings-${this.getSettingsRoute()}`}
        paneTitle={<FormattedMessage id={`stripes-erm-components.section.${this.getSettingsRoute()}`} />}
        paneSub={<FormattedMessage id={`stripes-erm-components.customProperties.${this.getSettingsRoute()}.count`} values={{ count }} />}
      >
        <form>
          <FieldArray
            component={CustomPropertiesConfigListFieldArray}
            mutators={mutators}
            name="customProperties"
            onDelete={(customProperty) => this.handleDelete(customProperty)}
            onSave={(customProperty) => this.handleSave(customProperty)}
            pickLists={pickLists}
            settingsRoute={this.getSettingsRoute()}
          />
        </form>
        <Callout ref={ref => { this.callout = ref; }} />
      </Pane>
    );
  }
}

export default stripesFinalForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
  mutators: {
    setCustomPropertyValue: (args, state, tools) => {
      tools.changeValue(state, args[0], () => args[1]);
    },
  },
  navigationCheck: true,
})(CustomPropertiesConfigForm);
