import PropTypes from 'prop-types';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import createDecorator from 'final-form-focus';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage, useIntl } from 'react-intl';
import { LastVisitedContext } from '@folio/stripes/core';
import { ConfirmationModal } from '@folio/stripes/components';

import { useErmForm } from '../hooks';

const focusOnErrors = createDecorator();

const ERMForm = ({
  children,
  decorators = [],
  initialValues,
  navigationCheck = true,
  mutators = [],
  onSubmit,
  subscription = {},
  ...formOptions // Any other options we sould pass to final form
}) => {
  const {
    openModal,
    continueNavigation,
    closeModal,
    formSpyRef,
    _isMounted,
  } = useErmForm({ navigationCheck });
  const intl = useIntl();

  return (
    <LastVisitedContext.Consumer>
      {(ctx) => (
        <>
          <FinalForm
            {...formOptions}
            decorators={[focusOnErrors, ...decorators]}
            initialValues={initialValues}
            mutators={{ ...mutators, ...arrayMutators }}
            onSubmit={onSubmit}
            render={(formProps) => (
              <>
                {children(formProps)}
                <FormSpy
                  onChange={(state) => {
                    if (_isMounted.current) {
                      formSpyRef.current = state;
                    }
                  }}
                  subscription={{
                    dirty: true,
                    submitSucceeded: true,
                    invalid: true,
                    submitting: true,
                  }}
                  {...formProps}
                />
              </>
            )}
            subscription={{
              dirty: true,
              submitSucceeded: true,
              invalid: true,
              submitting: true,
              initialValues: true,
              pristine: true,
              ...subscription,
            }}
          />
          <ConfirmationModal
            cancelLabel={<FormattedMessage id="stripes-erm-components.closeWithoutSaving" />}
            confirmLabel={<FormattedMessage id="stripes-erm-components.keepEditing" />}
            heading={intl.formatMessage({ id: 'stripes-erm-components.areYouSure' })}
            id="cancel-editing-confirmation"
            message={<FormattedMessage id="stripes-erm-components.unsavedChanges" />}
            onCancel={() => continueNavigation(ctx)}
            onConfirm={closeModal}
            open={openModal}
          />
        </>
      )}
    </LastVisitedContext.Consumer>
  );
};

ERMForm.propTypes = {
  children: PropTypes.elementType.isRequired,
  decorators: PropTypes.arrayOf(PropTypes.object),
  initialValues: PropTypes.object,
  navigationCheck: PropTypes.bool,
  mutators: PropTypes.object,
  onSubmit: PropTypes.func,
  subscription: PropTypes.object,
};

export default ERMForm;
