# SearchKeyControl

A component designed to leverage the qindex within SASQ to enable/disable individual search keys for a given SASQ search.

## Props

| Name | Type | Description | Required |
--- | --- | --- | --- |
| `options` | Array\<Object> | An array of objects of the shape: `{ label: "Label", key: "Key" }`. The `label`/`key` props are both required, and will be used to display the options and determine if they are in use currently or not. Note, deep values are permitted as the key. | ✓ |
