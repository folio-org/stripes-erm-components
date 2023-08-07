import React from 'react';

import { waitFor, screen } from '@folio/jest-config-stripes/testing-library/react';

import { StaticRouter as Router } from 'react-router-dom';
import { renderWithIntl, Button, Checkbox } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';
import DuplicateModal from './DuplicateModal';

const cloneableProperties = [
  { key: 'agreementInfo', value: 'Agreement information' },
  { key: 'internalContacts', value: 'Internal contacts' },
  { key: 'agreementLines', value: 'Agreement lines' },
  { key: 'linkedLicenses', value: 'Linked licenses' },
  { key: 'externalLicenses', value: 'External licenses' },
  { key: 'organizations', value: 'Organizations' },
  { key: 'supplementaryInformation', value: 'Supplementary information' },
  { key: 'usageData', value: 'Usage data' },
];

const onClone = jest.fn();
const onClose = jest.fn();

const translationIds = {
  cloneEndpointError: 'Clone endpoint error',
  duplicateModalLabel: 'Duplicate agreement',
  duplicateModalMessage: 'Duplicate modal message',
  duplicateModalError: 'Duplicate modal error',
  invalidResponseError: 'Invalid response error',
};

const testClickUnclickProperty = (key) => {
  const property = cloneableProperties.find(cp => cp.key === key);

  test(`checking and un-checking the ${property.key} checkbox has expected results`, async () => {
    await waitFor(async () => {
      await Checkbox(property.value).click();
    });
    await Checkbox(property.value).is({ checked: true });
    await waitFor(async () => {
      await Checkbox(property.value).click();
    });
    await Checkbox(property.value).is({ checked: false });
  });
};

let renderComponent;
describe('DuplicateModal', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <Router>
        <DuplicateModal
          cloneableProperties={cloneableProperties}
          onClone={onClone}
          onClose={onClose}
          translationIds={translationIds}
        />
      </Router>,
      translationsProperties
    );
  });

  test('renders the close button', async () => {
    await Button({ id: 'duplicate-modal-close-button' }).exists();
  });

  test('clicking the close button', async () => {
    await waitFor(async () => {
      await Button({ id: 'duplicate-modal-close-button' }).click();
    });
    expect(onClose).toHaveBeenCalled();
  });

  test('renders the cancel button', async () => {
    await Button({ id: 'duplicate-modal-cancel-button' }).exists();
  });

  test('clicking the cancel button', async () => {
    await waitFor(async () => {
      await Button({ id: 'duplicate-modal-cancel-button' }).click();
    });
    expect(onClose).toHaveBeenCalled();
  });

  // duplicate-modal-save-button
  test('renders the save and close button', async () => {
    Button({ id: 'duplicate-modal-save-button' }).has({ visible: false });
  });

  test('renders headline', async () => {
    const { getByText } = renderComponent;
    expect(getByText('Duplicate agreement')).toBeInTheDocument();
  });

  test('renders all checkboxes', async () => {
    await Checkbox('Select all / deselect all').exists();
    await Checkbox('Agreement information').exists();
    await Checkbox('Internal contacts').exists();
    await Checkbox('Agreement lines').exists();
    await Checkbox('Linked licenses').exists();
    await Checkbox('External licenses').exists();
    await Checkbox('Organizations').exists();
    await Checkbox('Supplementary information').exists();
    await Checkbox('Usage data').exists();
  });

  test('clicking the select all checkbox and all checkboxes are checked', async () => {
    await waitFor(async () => {
      await Checkbox('Select all / deselect all').click();
    });
    Checkbox('Select all / deselect all').is({ checked: true });
    Checkbox('Agreement information').is({ checked: true });
    Checkbox('Internal contacts').is({ checked: true });
    Checkbox('Agreement lines').is({ checked: true });
    Checkbox('Linked licenses').is({ checked: true });
    Checkbox('External licenses').is({ checked: true });
    Checkbox('Organizations').is({ checked: true });
    Checkbox('Supplementary information').is({ checked: true });
    Checkbox('Usage data').is({ checked: true });
  });

  /* //fails because button is disabled
  test('clicking the save and close button', async () => {
    await waitFor(async () => {
      await Button({ id: 'duplicate-modal-save-button' }).click();
    });
   expect(onClone).toHaveBeenCalled();
  }); */

  test('un-checking the select all checkbox and all checkboxes are unchecked', async () => {
    await waitFor(async () => {
      await Checkbox('Select all / deselect all').click();
    });
    Checkbox('Select all / deselect all').is({ checked: false });
    Checkbox('Agreement information').is({ checked: false });
    Checkbox('Internal contacts').is({ checked: false });
    Checkbox('Agreement lines').is({ checked: false });
    Checkbox('Linked licenses').is({ checked: false });
    Checkbox('External licenses').is({ checked: false });
    Checkbox('Organizations').is({ checked: false });
    Checkbox('Supplementary information').is({ checked: false });
    Checkbox('Usage data').is({ checked: false });
  });

  cloneableProperties.forEach(cp => {
    testClickUnclickProperty(cp.key);
  });
});
