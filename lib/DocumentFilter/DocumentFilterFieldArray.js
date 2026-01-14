import { useForm } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import PropTypes from 'prop-types';

import {
  Button,
  Card,
  IconButton,
  Layout,
  Tooltip,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import DocumentFilterField from './DocumentFilterField';

const propTypes = {
  categoryValues: PropTypes.arrayOf(PropTypes.object),
  filterName: PropTypes.string
};

const DocumentFilterFieldArray = ({
  categoryValues,
  filterName
}) => {
  const {
    mutators: { push },
  } = useForm();

  return (
    <>
      <FieldArray name="filters">
        {({ fields }) => fields.map((name, index) => {
          return (
            <div key={`document-filter-field-array-${name}`}>
              <Card
                key={`document-filter-card[${index}]`}
                data-testid={`document-filter-field[${index}]`}
                headerEnd={
                  fields?.length > 1 ? (
                    <Tooltip
                      id={`document-filter-card-delete-[${index}]-tooltip`}
                      text={
                        <FormattedMessage
                          id="stripes-erm-components.documentFilter.deleteFilterIndex"
                          values={{ number: index + 1 }}
                        />
                      }
                    >
                      {({ ref, ariaIds }) => (
                        <IconButton
                          ref={ref}
                          aria-labelledby={ariaIds.text}
                          icon="trash"
                          id={`document-filter-card-delete-[${index}]`}
                          onClick={() => fields.remove(index)}
                        />
                      )}
                    </Tooltip>
                  ) : null
                }
                headerStart={
                  <strong>
                    <FormattedMessage
                      id="stripes-erm-components.documentFilter.documentFilterIndex"
                      values={{ number: index + 1 }}
                    />
                  </strong>
                }
                marginBottom0={index !== fields.length - 1}
              >
                <DocumentFilterField
                  categoryValues={categoryValues}
                  fields={fields}
                  filterName={filterName}
                  index={index}
                  name={name}
                />
              </Card>
              {index < fields.value.length - 1 && (
                <Layout className="textCentered">
                  <FormattedMessage id="stripes-erm-components.OR" />
                </Layout>
              )}
            </div>
          );
        })
        }
      </FieldArray>
      <Button
        onClick={() => push('filters', { rules: [{}] })}
        onMouseDown={(e) => e.preventDefault()}
      >
        <FormattedMessage id="stripes-erm-components.documentFilter.addFilter" />
      </Button>
    </>
  );
};

DocumentFilterFieldArray.propTypes = propTypes;
export default DocumentFilterFieldArray;
