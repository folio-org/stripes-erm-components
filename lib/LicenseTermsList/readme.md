# LicenseTermsList
Lists a license and its terms

## Basic Usage
Simply passing a license object and it's terms is all that's required.
```
import { LicenseTermsList } from '@folio/stripes-erm-components';

...
<LicenseTermsList
          license={license}
          terms={terms}
/>
...
```

## Props

| Name | Type | Description | Required | Default |
--- | --- | --- | --- | --- |
| `license` | object | [`License`](https://github.com/folio-org/mod-licenses/blob/master/service/grails-app/domain/org/olf/licenses/License.groovy) | Yes |
| `terms` | array | [Licenses`](https://github.com/folio-org/ui-licenses/blob/master/src/routes/Licenses.js)
```okapi_modules=# \d custom_property_definition;
Table "diku_mod_licenses.custom_property_definition"
     Column     |          Type          | Modifiers
----------------+------------------------+-----------
 pd_id          | character varying(36)  | not null
 version        | bigint                 | not null
 pd_name        | character varying(255) | not null
 pd_type        | character varying(255) | not null
 pd_description | character varying(255) |
 pd_label       | character varying(255) | not null
 pd_weight      | integer                | not null
 pd_primary     | boolean                | not null
Indexes:
    "custom_property_definitionPK" PRIMARY KEY, btree (pd_id)
    "uc_custom_property_definitionpd_name_col" UNIQUE CONSTRAINT, btree (pd_name)
    "td_type_idx" btree (pd_type)
Referenced by:
    TABLE "custom_property" CONSTRAINT "FK36grvth72fb7wu5i5xaeqjitw" FOREIGN KEY (definition_id) REFERENCES custom_property_definition(pd_id)``` | jq -r '.[]'` | Yes |
