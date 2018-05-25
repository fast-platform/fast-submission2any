# FAST - Submission2Any

A library to generate a flat Excel (or Others) file from an array of Form.io submissions.
This library is design for those complex Form.io forms with nested objects and arrays
that will simply not translate into a single Excel row.

Submission2Excel will flatten your submissions and give you the right File every time!

```
// You can pass the mapped data object of the submission
let sub = [{
      name: 'John'
      complex : [
        {a:1, b:2},
        {a:3, b:4}
      ]
  },{
      name: 'Pedro'
      complex : [
        {a:5, b:6},
        {a:7, b:8}
      ]
  }]

// Or the full array of Form.io submissions

let sub = [
  {
    "owner": "5a3981489768470001cce4ef",
    "deleted": null,
    "roles": [],
    "_vid": 0,
    "_fvid": 0,
    "state": "submitted",
    "access": [],
    "externalIds": [],
    "externalTokens": [],
    "created": "2018-05-17T17:27:10.485Z",
    "_id": "5afdbb6e3d986958e233f56a",
    "data": {
      name: 'John'
      complex : [
        {a:1, b:2},
        {a:3, b:4}
      ]
  },
    "form": "5afd5bd8b2e21c9fc7286a70",
    "modified": "2018-05-17T17:27:10.486Z",
    "__v": 0
  },
  {
    "owner": "5a3981489768470001cce4ef",
    "deleted": null,
    "roles": [],
    "_vid": 0,
    "_fvid": 0,
    "state": "submitted",
    "access": [],
    "externalIds": [],
    "externalTokens": [],
    "created": "2018-05-17T17:27:17.272Z",
    "_id": "5afdbb753d9869c37e33f56b",
    "data": {
      name: 'Pedro'
      complex : [
        {a:5, b:6},
        {a:7, b:8}
      ]
  },
    "form": "5afd5bd8b2e21c9fc7286a70",
    "modified": "2018-05-17T17:27:17.273Z",
    "__v": 0
  }
]
  // Resulting EXCEL ==> ArrayBuffer
```

This means that 1 submission will always be 1 Excel row

### Installing

To install this package into your project, you can use the following command within your terminal

```
npm install --save fast-submission2any
```

# Usage

Using the Exporter with promises

```javascript
import Exporter from 'fast-submission2any';

file = Exporter.to({
  output,
  options,
  data,
  formioForm,
  translations,
  language,
}).then((output) => {
  // console.log('The file was generated', output)
});
```

Using the Exporter with Await

```javascript
import Exporter from 'fast-submission2any';

output = await Exporter.to({output, options, data, formioForm, translations, language })
  if(output){
    // console.log('The file was generated', output)
  }
```

Supported Output Formats

| Ouput String | Description                     |
| ------------ | ------------------------------- |
| csv          | Comma seeparated values         |
| json         | Javascript Object Notation      |
| xlsx         | Excel 2007+ XML Format          |
| xlsm         | Excel 2007+ Macro XML Format    |
| xlsb         | Excel 2007+ Binary Format       |
| biff8        | Excel 97-2004 Workbook Format   |
| biff5        | Excel 5.0/95 Workbook Format    |
| biff2        | Excel 2.0 Worksheet Format      |
| xlml         | Excel 2003-2004                 |
| ods          | OpenDocument Spreadsheet        |
| fods         | Flat OpenDocument Spreadsheet   |
| txt          | UTF-16 Unicode Text (TXT        |
| sylk         | Symbolic Link (SYLK)            |
| html         | HTML Document                   |
| dif          | Data Interchange Format (DIF)   |
| dbf          | dBASE II + VFP Extensions (DBF) |
| rtf          | Rich Text Format (RTF)          |
| prn          | Lotus Formatted Text            |
| eth          | Ethercalc Record Format (ETH)   |

Short Example

```javascript
import Exporter from 'fast-submission2any';

  let output = await  Exporter.to({
          output,           // {String} i.e 'xlsx'
          options,          // {Object} Options object
          data,             // {Array} Form.io submissions
          formioForm,       // {Object} Form.io form
          translations,     // {Object} i18next formatted resource
          language          // {String} 'en' language to export the labels
      }
    );
   //  output => ArrayBuffer
```

Short Example + Download

```javascript
import Exporter from 'fast-submission2any';
import Download from 'fast-downloads';

  let output = await  Exporter.to({
          output,           // {String} i.e 'xlsx'
          options,           // {Object} Options object
          data,             // {Array} Form.io submissions
          formioForm,       // {Object} Form.io form
          translations,     // {Object} i18next formatted resource
          language          // {String} 'en' language to export the labels
      }
    );

  let Download = await Download.file({
            content: output,
            fileName: 'SomeName.xlsx',
            mimeType:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
```

Full Example [(Play with it!)](https://stackblitz.com/edit/fast-submission2csv)

```javascript
import Exporter from 'fast-submission2any';

let translations = {
  en: {
    translation: {
      Name: 'Name',
      Age: 'Age',
      Submit: 'Submit',
      'Owner Email': 'Owner Email'
    }
  },
  de: {
    translation: {
      Name: 'Name',
      Age: 'Alter',
      Submit: 'Einreichen',
      'Owner Email': 'Besitzer E-Mail'
    }
  }
};
let output = 'xlsx';
let data = [{ name: 'John', age: 20 }, { name: 'Pedro', age: 32 }];

let formioForm = {
  "type": "form",
  "tags": [],
  "owner": "5a3981489768470001cce4ef",
  "components": [
    {
      "autofocus": false,
      "input": true,
      "tableView": true,
      "inputType": "text",
      "inputMask": "",
      "label": "Name",
      "key": "name",
      "placeholder": "",
      "prefix": "",
      "suffix": "",
      "multiple": false,
      "defaultValue": "",
      "protected": false,
      "unique": false,
      "persistent": true,
      "hidden": false,
      "clearOnHide": true,
      "spellcheck": true,
      "validate": {
        "required": false,
        "minLength": "",
        "maxLength": "",
        "pattern": "",
        "custom": "",
        "customPrivate": false
      },
      "conditional": { "show": "", "when": null, "eq": "" },
      "type": "textfield",
      "labelPosition": "top",
      "tags": [],
      "properties": {}
    },
    {
      "autofocus": false,
      "input": true,
      "tableView": true,
      "inputType": "number",
      "label": "Age",
      "key": "age",
      "placeholder": "",
      "prefix": "",
      "suffix": "",
      "defaultValue": "",
      "protected": false,
      "persistent": true,
      "hidden": false,
      "clearOnHide": true,
      "validate": {
        "required": false,
        "min": "",
        "max": "",
        "step": "any",
        "integer": "",
        "multiple": "",
        "custom": ""
      },
      "type": "number",
      "labelPosition": "top",
      "tags": [],
      "conditional": { "show": "", "when": null, "eq": "" },
      "properties": {}
    },
    {
      "autofocus": false,
      "input": true,
      "label": "Submit",
      "tableView": false,
      "key": "submit",
      "size": "md",
      "leftIcon": "",
      "rightIcon": "",
      "block": false,
      "action": "submit",
      "disableOnInvalid": false,
      "theme": "primary",
      "type": "button"
    }
  ],
  "revisions": "",
  "_vid": 0,
  "access": [
    {
      "roles": ["5af0a488fb0cd0b4503aab17", "5af0a488fb0cd0bbdd3aab18", "5af0a488fb0cd081a63aab19"],
      "type": "read_all"
    }
  ],
  "submissionAccess": [],
  "created": "2018-05-17T10:39:20.990Z",
  "_id": "5afd5bd8b2e21c9fc7286a70",
  "title": "csvExport",
  "display": "form",
  "settings": {},
  "name": "csvExport",
  "path": "csvexport",
}


  let output = await  Exporter.to({
          output,
          options,
          data,
          formioForm,
          translations,
          language
      }
    );

    //  output ==> ArrayBuffer
```

## Readings

* [This library was created using](http://krasimirtsonev.com/blog/article/javascript-library-starter-using-webpack-es6)
