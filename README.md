# primo-explore-report-problem

[![npm](https://img.shields.io/npm/v/primo-explore-report-problem.svg)](https://www.npmjs.com/package/primo-explore-report-problem)

## Features
A banner with a form to report a problem/bug appears above the "get/view it" section in the details view. The text of the banner is configurable, and clicking the button will open up a form below the banner. The form data is processed using an external php page. _see example at `src/php/report.php`_

### Screenshot
![screenshot](screenshot.png)

## Install
1. Make sure you've installed and configured [primo-explore-devenv](https://github.com/ExLibrisGroup/primo-explore-devenv).
2. Navigate to your template/central package root directory. For example:
    ```
    cd primo-explore/custom/MY_VIEW_ID
    ```
3. If you do not already have a `package.json` file in this directory, create one:
    ```
    npm init -y
    ```
4. Install this package:
    ```
    npm install primo-explore-report-problem
    ```

Alternatively, just copy `dist/module.js` into your package's `custom.js` file.

## Usage
Once this package is installed, add `reportProblem` as a dependency for your custom module definition.

```js
var app = angular.module('viewCustom', ['reportProblem'])
```

Activate the customization by setting `reportProblem.enabled` to `true`
```js
app.value('reportProblem', {
  enabled: true
})
```

#### Configuration
The banner can be configured using the `reportProblem` option object.  
Default options are provided in a 'Default' variant of the option object, as shown below. _Only override the non-default object_

You can also configure the banner by passing in attributes to the `oca-report-problem` element. The `report-url` property is required.  
The `reportProblem.enabled` property is still required to enable the module

##### reportProblem / reportProblemDefault

| name                          | type           | usage                                                                 |
|-------------------------------|----------------|-----------------------------------------------------------------------|
| `enabled`                     | boolean        | enables the reportProblem module                                      |
| `enabledDefault`              | boolean        | enables the default reportProblem banner                              |
| `reportUrl`                   | string (url)   | url to external form processor _see `src/php/report.php` for example_ |
| `messageText`                 | string         | banner message text                                                   |
| `buttonText`                  | string         | banner button message text                                            |
| `reportVendor`                | string         | which vendor-specific properties to use                               |
| `subject`                     | string         | subject of the problem report email/ticket                            |
|                               |                |                                                                       |
| _email-specific options_      |                |                                                                       |
| `toEmail`                     | string (email) | email which the problem report will be sent to                        |
|                               |                |                                                                       |
| _libanswers-specific options_ |                |                                                                       |
| `instid`                      | string         | institution id                                                        |
| `quid`                        | string         | queue id                                                              |
| `qlog`                        | string         | should be set to 0                                                    |
| `source`                      | string         | should be set to 4                                                    |

##### banner attributes

| name            | type         | usage                                                                 |
|-----------------|--------------|-----------------------------------------------------------------------|
| `message-text`  | string       | banner message text                                                   |
| `button-text`   | string       | banner button message text                                            |
| `report-url`    | string (url) | url to external form processor _see `src/php/report.php` for example_ |
| `report-vendor` | string       | which vendor-specific properties to use (email, libanswers)           |

### Example

```js
// uses the default banner location and sends an email upon submit

var app = angular.module('viewCustom', ['reportProblem'])

app.value('reportProblem', {
  //general options
  enabled: true,
  reportUrl: 'http://my.library.edu/report.php?',
  messageText: 'Would you like to report an issue with this record?',
  buttonText: 'Submit issue',
  reportVendor: 'email',
  subject: 'Report A Problem Test',
  
  //email-specific options
  toEmail: 'reportproblem@my.library.edu'
})
```

```js
// disables the default banner and places a custom banner in the prm-action-list-after element; submits a ticket to a libanswers queue

var app = angular.module('viewCustom', ['reportProblem'])

app.value('reportProblem', {
  //general options
  enabled: true,
  enabledDefault: false,
  subject: 'Report A Problem Test',
  
  //libanswers-specific options
  instid: '000',
  quid: '0000',
  qlog: '0',
  source: '4'
})

app.component('prmActionListAfter', {template: '<oca-report-problem report-url="http://my.library.edu/reportproblem.php?" message-text="Want to report a problem?" button-text="Submit report" report-vendor="libanswers" />'})
```

<!-- ## Running tests
1. Clone the repo
2. Run `npm install`
3. Run `npm test` -->
