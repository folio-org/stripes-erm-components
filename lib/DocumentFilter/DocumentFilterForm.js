import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import arrayMutators from 'final-form-arrays';

import { deparseKiwtQueryFilters, FormModal } from '@k-int/stripes-kint-components';

import { Button } from '@folio/stripes/components';

import DocumentFilterFieldArray from './DocumentFilterFieldArray';

const DocumentFilterForm = ({
  activeFilters,
  categoryValues,
  filterHandlers,
  filterModalProps,
  filterName,
  filters,
}) => {
  // categoryValues are only passed for SupplementaryDocumentFilter
  const [editingFilters, setEditingFilters] = useState(false);
  const openEditModal = () => setEditingFilters(true);
  const closeEditModal = () => setEditingFilters(false);

  const handleSubmit = (values) => {
    // In order to convert the form values into the shape for them to be deparsed we do the inverse of the above
    // Adding a || operator between all elements of the filters array and a && operator between all elements of the nested arrays
    // With special logic to ensure that operators are not added infront of the first elements of any arrays, to ensure no grouping errors
    const kiwtQueryShape = values?.filters?.reduce((acc, curr, index) => {
      let newAcc = [...acc];

      if (index !== 0) {
        newAcc = [...newAcc, '||'];
      }

      newAcc = [
        ...newAcc,
        curr.rules.reduce((a, c, i) => {
          return [
            ...a,
            i !== 0 ? '&&' : null, // Don't group on first entry
            c,
          ].filter(Boolean);
        }, []),
      ];

      return newAcc;
    }, []);

    filterHandlers.state({
      ...activeFilters,
      [filterName]: [
        // Currently the deparse function returns a query string containing whitespace which leads to grouping errors
        // This regex removes all whitespace from the querystring
        deparseKiwtQueryFilters(kiwtQueryShape),
      ],
    });
    closeEditModal();
  };

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
        onSubmit={handleSubmit}
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
  activeFilters: PropTypes.object,
  categoryValues: PropTypes.arrayOf(PropTypes.object),
  filterHandlers: PropTypes.object,
  filterModalProps: PropTypes.object.isRequired,
  filterName: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.object),
  handlers: PropTypes.shape({
    closeEditModal: PropTypes.func.isRequired,
    openEditModal: PropTypes.func.isRequired,
  }),
};
export default DocumentFilterForm;
