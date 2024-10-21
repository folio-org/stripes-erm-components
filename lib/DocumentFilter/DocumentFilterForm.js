import PropTypes from 'prop-types';
import { Button } from '@folio/stripes/components';
import arrayMutators from 'final-form-arrays';
import { FormModal } from '@k-int/stripes-kint-components';
import { FormattedMessage } from 'react-intl';
import DocumentFilterFieldArray from './DocumentFilterFieldArray';

const DocumentFilterForm = ({
  categoryValues,
  editingFilters,
  filterModalProps,
  filterName,
  filters,
  handlers: { openEditModal, closeEditModal },
  onSubmit,
}) => {
  return (
    <>
      <Button onClick={openEditModal}>
        <FormattedMessage id="stripes-erm-components.documentFilter.editDocumentFilters" />
      </Button>
      <FormModal
        initialValues={{
          filters: filters?.length ? filters : [{ rules: [{}] }],
        }}
        modalProps={{
          dismissible: true,
          enforceFocus: false,
          label: <FormattedMessage id="stripes-erm-components.documentFilter.documentFilterBuilder" />,
          onClose: closeEditModal,
          open: editingFilters,
          size: 'medium',
          ...filterModalProps
        }}
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
      >
        <DocumentFilterFieldArray
          categoryValues={categoryValues}
          filterName={filterName}
        />
      </FormModal>
    </>
  );
};

DocumentFilterForm.propTypes = {
  categoryValues: PropTypes.arrayOf(PropTypes.object),
  editingFilters: PropTypes.bool,
  filterModalProps: PropTypes.object.isRequired,
  filterName: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.object),
  handlers: PropTypes.shape({
    closeEditModal: PropTypes.func.isRequired,
    openEditModal: PropTypes.func.isRequired,
  }),
  onSubmit: PropTypes.func,
};
export default DocumentFilterForm;
