import chunk from 'lodash/chunk';
import { Col, Row } from '@folio/stripes/components';

const MAX_COL = 4;
const FULL_WIDTH = 12;
/*
 * PROPS
 * items: Pass in a list of items to render
 * renderItem: a function to render each item in the list,
 * staticColumns: whether to stick to the same number of columns or dynamically scale down if <4 items, defaults to true
 * maxColumns: the maximum number of columns to allow, defaults to 4
 */
const renderDynamicRows = (items = [], renderItem = () => null, staticColumns = true, maxColumns = MAX_COL) => {
  const maximumColumns = Math.min(maxColumns, MAX_COL);

  // The number of columns rendered should only ever be 1/2/3/4
  const numberOfColumns = (items?.length < maximumColumns && !staticColumns) ? items?.length : maximumColumns;

  const renderArray = [];
  items.forEach((item, index) => renderArray.push(
    <Col key={`dynamic-render-item-${index}`} xs={FULL_WIDTH / numberOfColumns}>
      {renderItem(item)}
    </Col>
  ));

  const rowRenderArray = chunk(renderArray, numberOfColumns);
  return rowRenderArray.map((elements, index) => <Row key={`dynamic-render-item-row-${index}`}>{elements}</Row>);
};

export default renderDynamicRows;
