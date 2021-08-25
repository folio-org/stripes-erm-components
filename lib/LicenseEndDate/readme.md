# LicenseEndDate

Renders the effective end date of a license. This can differ due to fields such as `openEnded`.


## Basic Usage
Simply passing a license object is all that's required.
```
return <LicenseEndDate license={license} />;
```

## Props

| Name | Type | Description | Required | Default |
--- | --- | --- | --- | --- |
| `license` | object | [`License`](https://github.com/folio-org/mod-licenses/blob/master/service/grails-app/domain/org/olf/licenses/License.groovy) | Yes |
| `renderNullIfEmpty` | bool | Renders null, specificaly used when empty cell is to be renderd in an MCL instead of a hyphen | No | false
