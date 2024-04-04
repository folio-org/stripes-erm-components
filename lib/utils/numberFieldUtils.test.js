import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import user from '@folio/jest-config-stripes/testing-library/user-event';

import { TestForm, TextField, renderWithIntl } from '@folio/stripes-erm-testing';
import { Field } from 'react-final-form';
import { TextField as TFComponent } from '@folio/stripes/components';

import {
  preventMinusKey,
  preventPasteNegative
} from './numberFieldUtils';

import { translationsProperties } from '../../test/jest/helpers';

const fieldLabel = 'TEST FIELD LABEL';
const testId = 'test-field';

const renderTextFieldWithProps = (props) => {
  return renderWithIntl(
    <TestForm onSubmit={jest.fn()}>
      <Field
        component={TFComponent}
        data-testid={testId}
        label={fieldLabel}
        name="testField"
        type="number"
        {...props}
      />
    </TestForm>,
    translationsProperties
  );
};

let renderComponent;
describe('numberFieldUtils', () => {
  describe('preventMinusKey', () => {
    beforeEach(() => {
      renderComponent = renderTextFieldWithProps({
        onKeyDown: preventMinusKey
      });
    });

    test('renders the TextField component', async () => {
      await TextField(fieldLabel).exists();
    });

    test('can enter a positive number', async () => {
      await waitFor(async () => {
        await TextField(fieldLabel).fillIn('20');
      });

      await TextField(fieldLabel).has({ value: '20' });
    });

    test('entering a minus key does not work', async () => {
      await waitFor(async () => {
        await TextField(fieldLabel).fillIn('-');
      });

      await TextField(fieldLabel).has({ value: '' });
    });

    test('can\'t enter a negative number', async () => {
      await waitFor(async () => {
        await TextField(fieldLabel).fillIn('-40');
      });

      await TextField(fieldLabel).has({ value: '40' });
    });
  });

  describe('preventPasteNegative', () => {
    beforeEach(() => {
      renderComponent = renderTextFieldWithProps({
        onPaste: preventPasteNegative
      });
    });

    test('renders the TextField component', async () => {
      await TextField(fieldLabel).exists();
    });

    test('TextField exists by testId', () => {
      const { getByTestId } = renderComponent;

      expect(getByTestId(testId)).toBeInTheDocument();
    });

    test('can paste a positive number', async () => {
      const { getByTestId } = renderComponent;
      const textField = getByTestId(testId);
      await waitFor(async () => {
        // Have to click and then paste
        await user.click(textField);
        await user.paste('20');
      });

      await TextField(fieldLabel).has({ value: '20' });
    });

    test('can\'t paste a negative number', async () => {
      const { getByTestId } = renderComponent;
      const textField = getByTestId(testId);
      await waitFor(async () => {
        // Have to click and then paste
        await user.click(textField);
        await user.paste('-20');
      });

      await TextField(fieldLabel).has({ value: '' });
    });
  });
});
