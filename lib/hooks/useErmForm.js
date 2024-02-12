import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import createDecorator from 'final-form-focus';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { LastVisitedContext } from '@folio/stripes/core';
import { ConfirmationModal } from '@folio/stripes/components';

const focusOnErrors = createDecorator();

const useErmForm = ({ navigationCheck = true } = {}) => {
  const [openModal, setOpenModal] = useState(false);
  const [nextLocation, setNextLocation] = useState(null);
  const [dirty, setDirty] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (navigationCheck) {
      const unblock = history.block((nextLoc) => {
        const shouldPrompt = dirty && !nextLoc;

        if (shouldPrompt) {
          setOpenModal(true);
          setNextLocation(nextLoc);
        }
        return !shouldPrompt;
      });
      return unblock;
    }
    return () => { };
  }, [history, navigationCheck, dirty]);

  const continueNavigation = (ctx) => {
    const { pathname, search } = nextLocation;

    ctx.cachePreviousUrl();
    setOpenModal(false);
    history.push(`${pathname}${search}`);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const ERMForm = ({ FormComponent, initialValues, onSubmit, formOptions }) => (
    <LastVisitedContext.Consumer>
      {(ctx) => (
        <>
          <FinalForm
            {...formOptions}
            decorators={[focusOnErrors, ...formOptions.decorators || []]}
            initialValues={initialValues}
            mutators={{ ...formOptions.mutators, ...arrayMutators }}
            onSubmit={onSubmit}
            render={(formProps) => (
              <>
                <FormComponent {...formProps} />
                <FormSpy
                  onChange={(state) => setDirty(state.dirty)}
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
              initialValues: true,
              submitting: true,
              pristine: true,
              ...formOptions.subscription,
            }}
          />
          <ConfirmationModal
            cancelLabel={<FormattedMessage id="stripes-form.closeWithoutSaving" />}
            confirmLabel={<FormattedMessage id="stripes-form.keepEditing" />}
            heading={<FormattedMessage id="stripes-form.areYouSure" />}
            id="cancel-editing-confirmation"
            message={<FormattedMessage id="stripes-form.unsavedChanges" />}
            onCancel={() => continueNavigation(ctx)}
            onConfirm={closeModal}
            open={openModal}
          />
        </>
      )}
    </LastVisitedContext.Consumer>
  );

  ERMForm.propTypes = {
    FormComponent: PropTypes.elementType.isRequired,
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func,
    formOptions: PropTypes.shape({
      decorators: PropTypes.arrayOf(PropTypes.object),
      mutators: PropTypes.object,
      subscription: PropTypes.object,
    }),
  };

  return { ERMForm };
};

useErmForm.propTypes = {
  navigationCheck: PropTypes.bool,
};

export default useErmForm;
