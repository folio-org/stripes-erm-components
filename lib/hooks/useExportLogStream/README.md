# useExportLogStream
This is a small hook which allows for the fetch and download of Log streams from mod-agreements.

## API
useExportLogStream is called with parameters `job`, of type `object` and `type` of type `string`.

### Job
The parameter `job` is expected to contain at a minimum the properties `id` and `name`. It will use the `id` for fetching and the `name` for the eventual downloaded file.

### Type
The parameter `type` is a string referring to the "type" of logs to fetch from mod-agreements, namely
- error
- info
- full

## Result
The hook will fetch the data, and when available download it from the user's browser. It will also handle the triggering of a callout informing the user that said download may take a minute or so.