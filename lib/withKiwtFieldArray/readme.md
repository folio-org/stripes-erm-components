# withKiwtFieldArray

A higher-order component to simplify the interface between redux-form `<FieldArray>` and arrays in a backend module that uses the [K-Int Web Toolkit](https://github.com/k-int/web-toolkit-ce/) to manage its arrays via the [ExtendedWebDataBinder](https://github.com/k-int/web-toolkit-ce/blob/master/src/main/groovy/com/k_int/web/toolkit/databinding/ExtendedWebDataBinder.groovy).

The key difference for UI code talking to those modules instead of classical FOLIO RMB modules, is that when PUTing an updated record with arrays of objects, only the objects that have changed need to sent to minimise payload size.

This also means that when deleting an object from an array, simply omitting the object is not enough. Instead an object should be sent back with the `id` of the object being deleted, and a `_delete` flag set to `true`. Consider the following:

```
{
  items: [
    {
      "id": "a",
      "value": "newValue"
    },
    {
      "id", "c",
      "_delete": true
    }
  ]
}
```

If the `items` array originally included objects with `id`s `a`, `b`, and `c`, the value of `a` would be updated, `b` would remain unchanged, and `c` would be deleted.

Since FOLIO form array components do not natively set a `_delete` flag, the process of marking objects for deletion and filtering out objects marked for deletion when rendering needs to be handled. This [higher-order component](https://reactjs.org/docs/higher-order-components.html) allows developers to abstract this logic away.

## Basic Usage

```
import withKiwtFieldArray from '@folio/stripes-erm-components';

class UsersFieldArray extends React.Component {
  ...

  render() {
    return (
      <React.Fragment>
      { this.props.items.map((item, index) => (
        <Item
          item={item}
          key={index}
          onDelete={() => this.props.onDeleteField(index, item)}
        />
      )); }
      <Button
        onClick={() => { this.props.onAddField({}); } }
      >Add Item<Button>
      </React.Fragment>
    )
  }
}

export default withKiwtFieldArray(UsersFieldArray)
```

## Props Provided to the Wrapped Component
| name | type | description |
| ---- | ---- | ----------- |
| items | array | Array of items to be rendered and not marked for deletion |
| name | string | The `name` provided by a parent component when hooking your component to a redux-form `FieldArray`. Provided here for convenience rather than `fields.name`. |
| onAddField | function (defaultObject = {}) => {} | Should be called when you want to add a new item to the array. Optionally pass in an object with default values for any keys. **Note** that if you pass this to a click-handler without a wrapper function, the click-handler will pass the `event` as the default object. So you should probably always be calling this function yourself rather than passing it somewhere and letting some other code call it. |
| onDeleteField | function (index, objectToBeDeleted) => {} | Should be called when deleting an object from the array. **Both parameters are required.** |
| onReplaceField | function (index, objectToBeInserted) => {} | Should be called when attempting to replace an object in the array with another object. Generally not used since you usually have separate form components that target specific keys within an object, but this can be useful when completely swapping out entries or setting keys in bulk. **Both parameters are required.** |
| fields | object | The redux-form `fields` prop is passed down as-is, in case you need anything from it. Naturally, this requires that you've connected your component to a redux-form `FieldArray`. |
| meta | object | The redux-form `meta` prop is passed down as-is, in case you need anything from it. Naturally, this requires that you've connected your component to a redux-form `FieldArray`. |
| *other* | - | All other props are also passed down. |