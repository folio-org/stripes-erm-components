import PropTypes from 'prop-types';
import { Button } from '@folio/stripes/components';
import arrayMutators from 'final-form-arrays';
import { FormModal } from '@k-int/stripes-kint-components';
import { FormattedMessage } from 'react-intl';
import DocumentFilterFieldArray from './DocumentFilterFieldArray';

const DocumentFilterForm = ({
  refdataValues,
  editingFilters,
  filters,
  handlers: { openEditModal, closeEditModal },
  onSubmit,
}) => {
  const filterBuilder = refdataValues.length > 0 ? 'supplementaryDocumentFilterBuilder' : 'coreDocumentFilterBuilder';
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
          label: <FormattedMessage id={`stripes-erm-components.documentFilter.${filterBuilder}`} />,
          onClose: closeEditModal,
          open: editingFilters,
          size: 'medium',
        }}
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
      >
        <DocumentFilterFieldArray refdataValues={refdataValues} />
      </FormModal>
    </>
  );
};

DocumentFilterForm.propTypes = {
  refdataValues: PropTypes.arrayOf(PropTypes.object),
  editingFilters: PropTypes.bool,
  filters: PropTypes.arrayOf(PropTypes.object),
  handlers: PropTypes.shape({
    closeEditModal: PropTypes.func.isRequired,
    openEditModal: PropTypes.func.isRequired,
  }),
  onSubmit: PropTypes.func,
};
export default DocumentFilterForm;
