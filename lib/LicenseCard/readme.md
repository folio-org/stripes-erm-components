# LicenseCard

Renders a card displaying information about licenses of the type [`License`](https://github.com/folio-org/mod-licenses/blob/master/service/grails-app/domain/org/olf/licenses/License.groovy) implemented by the `licenses` Okapi interface.


## Basic Usage
Simply passing a license object is all that's required.
```
return <LicenseCard license={license} />;
```

## Props

| Name | Type | Description | Required | Default |
--- | --- | --- | --- | --- |
| `className` | string |
| `license` | object | [`License`](https://github.com/folio-org/mod-licenses/blob/master/service/grails-app/domain/org/olf/licenses/License.groovy) | Yes |
| `renderName` | bool | Set to `false` to turn off rendering the license name  | | `true` |

