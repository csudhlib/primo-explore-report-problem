'use strict';

angular.module('reportProblem', []);

angular.module('reportProblem').component('ocaReportProblem', {
  bindings: {
    messageText: '@',
    buttonText: '@',
    reportUrl: '@',
    reportVendor: '@',
    parentCtrl: '<'
  },
  require: {
    itemCtrl: '^prmFullViewServiceContainer'
  },
  template: '\n    <div ng-if="$ctrl.show" class="bar filter-bar layout-align-center-center layout-row margin-top-medium" layout="row" layout-align="center center">\n      <span class="margin-right-small">{{$ctrl.messageText}}</span>\n      <button class="button-with-icon zero-margin md-button md-button-raised md-primoExplore-theme" type="button" aria-label="Report a Problem" style="color: #5c92bd;" ng-click="$ctrl.showReportForm()">\n        <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_report_problem_24px"></prm-icon>\n        <span style="text-transform: none;">{{$ctrl.buttonText}}</span>\n      </button>\n    </div>\n    <div ng-if="$ctrl.showRPForm" class="send-actions-content-item" layout="row">\n      <md-content layout-wrap layout-padding layout-fill>\n        <form name="$ctrl.reportForm" novalidate layout="column" layout-align="center center" (submit)="$ctrl.submitReport();">\n          <div layout="row" class="layout-full-width" layout-align="center center">\n            <div flex="20" flex-sm="10" hide-xs></div>\n            <div class="form-focus service-form" layout-padding flex>\n              <div layout-margin>\n                <div layout="column">\n                  <h4 class="md-subhead">Report Your Problem here:</h4>\n                  <md-input-container class="underlined-input">\n                    <label>Name:</label>\n                    <input ng-model="$ctrl.name" name="name" type="text" >\n                    <div ng-messages="reportForm.name.$error">\n                      <div ng-message="required">please enter your name</div>\n                    </div>\n                  </md-input-container>\n                  <md-input-container class="underlined-input md-required">\n                    <label>Email:</label>\n                    <input ng-model="$ctrl.email" name="email" type="text" required >\n                    <div ng-messages="reportForm.email.$error">\n                      <div ng-message="pattern, required ">email is invalid</div>\n                    </div>\n                  </md-input-container>\n                  <md-input-container class="underlined-input">\n                    <label>Phone:</label>\n                    <input ng-model="$ctrl.phoneNumber" name="phoneNumber" type="text" >\n                    <div ng-messages="reportForm.phoneNumber.$error">\n                      <div ng-message="pattern, required">please enter your phone number</div>\n                    </div>\n                  </md-input-container>\n                  <md-input-container class="md-required">\n                    <label>Description:</label>\n                    <input ng-model="$ctrl.description" name="description" required>\n                    <div ng-messages="reportForm.description.$error">\n                      <div ng-message="required">please enter your problem description</div>\n                    </div>\n                  </md-input-container>\n                  <md-input-container class="underlined-input" ng-if="$ctrl.isCaptcha">\n                    <div vc-recaptcha key="$ctrl.getCaptchaPublicKey()" on-success="$ctrl.setResponse(response)"></div>\n                    <span class="recaptcha-error-info" ng-show="smsForm.$submitted && ($ctrl.statusCode != 200 || smsForm.recaptchaResponse.$invalid || smsForm.$error.recaptcha.length)">\n                      <span translate="captcha.notselected"></span>\n                    </span>\n                  </md-input-container>\n                </div>\n              </div>\n            </div>\n            <div flex="20" flex-sm="10" hide-xs></div>\n          </div>\n          <div layout="row">\n            <div layout="row" layout-align="center" layout-fill>\n              <md-button type="submit" class="button-with-icon button-large button-confirm" aria-label="Submit Report">\n                <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="send"></prm-icon>\n                <span translate="report"></span>\n              </md-button>\n            </div>\n          </div>\n        </form>\n      </md-content>\n    </div>',
  controller: ['$location', '$httpParamSerializer', '$http', 'reportProblem', 'reportProblemDefault', function ($location, $httpParamSerializer, $http, reportProblem, reportProblemDefault) {
    var _this = this;

    this.enabled = reportProblem.hasOwnProperty("enabled") ? reportProblem.enabled : reportProblemDefault.enabled;
    this.messageText = this.messageText || (reportProblem.hasOwnProperty("messageText") ? reportProblem.messageText : reportProblemDefault.messageText);
    this.buttonText = this.buttonText || (reportProblem.hasOwnProperty("buttonText") ? reportProblem.buttonText : reportProblemDefault.buttonText);
    this.reportUrl = this.reportUrl || (reportProblem.hasOwnProperty("reportUrl") ? reportProblem.reportUrl : reportProblemDefault.reportUrl);
    this.reportVendor = this.reportVendor || (reportProblem.hasOwnProperty("reportVendor") ? reportProblem.reportVendor : reportProblemDefault.reportVendor);
    this.showLocations = ['/fulldisplay', // details view
    '/openurl'];
    this.$onInit = function () {
      this.targetUrl = this.reportUrl + $httpParamSerializer($location.search());
      this.show = this.showLocations.includes($location.path()) && this.enabled === true;
      this.name = this.email = this.phoneNumber = this.description = this.gCaptchaResponse = this.statusMessage = '';
      this.telRegEx = /^\d{3}( |-)?\d{3}( |-)?\d{4}$/;
      this.emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // see http://emailregex.com/
      this.statusCode = 200;
      this.showRPForm = false;
    };
    this.validate = function () {
      return _this.telRegEx.test(_this.phoneNumber) && _this.name && _this.emailRegEx.test(_this.email) && _this.description && (_this.isCaptcha ? _this.gCaptchaResponse : true);
    };
    this.isCaptcha = window.appConfig['system-configuration']['Activate Captcha [Y/N]'] == 'Y';
    this.getCaptchaPublicKey = function () {
      return window.appConfig['system-configuration']['Public Captcha Key'];
    };
    this.setResponse = function (response) {
      return _this.gCaptchaResponse = response;
    };
    this.setStatusCode = function (code) {
      return _this.statusCode = code;
    };
    this.setStatusMessage = function (message) {
      return _this.statusMessage = message;
    };
    this.showReportForm = function () {
      return _this.showRPForm = !_this.showRPForm;
    };

    this.submitReport = function () {
      if (_this.validate()) {
        var params = {
          'reportVendor': _this.reportVendor,
          'subject': reportProblem.hasOwnProperty("subject") ? reportProblem.subject : reportProblemDefault.subject,
          'name': _this.name,
          'email': _this.email,
          'phone': _this.phoneNumber,
          'description': _this.description,
          'gCaptchaResponse': _this.gCaptchaResponse,
          'urlBase': $location.protocol() + '://' + $location.host() + ($location.port() != 80 ? ':' + $location.port() : '') + '/primo-explore' + $location.path(),
          'urlParams': $location.search(),
          'item': _this.itemCtrl.item
        };
        if (_this.reportVendor === 'libanswers') {
          params.instid = reportProblem.hasOwnProperty("instid") ? reportProblem.instid : reportProblemDefault.instid;
          params.quid = reportProblem.hasOwnProperty("quid") ? reportProblem.quid : reportProblemDefault.quid;
          params.qlog = reportProblem.hasOwnProperty("qlog") ? reportProblem.qlog : reportProblemDefault.qlog;
          params.source = reportProblem.hasOwnProperty("source") ? reportProblem.source : reportProblemDefault.source;
        } else if (_this.reportVendor === 'email') {
          params.toEmail = reportProblem.hasOwnProperty("toEmail") ? reportProblem.toEmail : reportProblemDefault.toEmail;
        }
        $http.post(_this.reportUrl, params).then(function (msg) {
          _this.setStatusCode(msg.status);
          _this.setStatusMessage(msg.statusText);
          console.log('report successfully sent', msg);
        }).catch(function (err) {
          _this.setStatusCode(err.status);
          _this.setStatusMessage(err.statusText);
          _this.setResponse('');
          if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
          console.error('report sending failed', err);
        }).finally(function () {
          if (_this.statusCode == 200) {
            _this.name = _this.email = _this.phoneNumber = _this.description = _this.gCaptchaResponse = _this.statusMessage = '';
            _this.reportForm.$setPristine();
            _this.reportForm.$setUntouched();
            _this.showReportForm();
          }
        });
      }
    };
  }]
}).run(['$templateCache', 'reportProblem', 'reportProblemDefault', function ($templateCache, reportProblem, reportProblemDefault) {
  if (reportProblem.hasOwnProperty("enabledDefault") ? reportProblem.enabledDefault : reportProblemDefault.enabledDefault) {
    $templateCache.put('components/search/fullView/fullViewServiceContainer/full-view-service-container.html', $templateCache.get('components/search/fullView/fullViewServiceContainer/full-view-service-container.html')
      .replace('</prm-login-alma-mashup>', '</prm-login-alma-mashup><oca-report-problem ng-if="$ctrl.index == 1 && $ctrl.service.serviceName===\'activate\'" parent-ctrl="$ctrl"></oca-report-problem>') // get/view it
      .replace('<prm-full-view-service-container-after', '<oca-report-problem ng-if="$ctrl.index == 1 && $ctrl.service.serviceName!==\'activate\'" parent-ctrl="$ctrl"></oca-report-problem><prm-full-view-service-container-after')); // everything else catch-all
  }
}]);

angular.module('reportProblem').value('reportProblem', {}).value('reportProblemDefault', {
  enabled: true,
  enabledDefault: true,
  reportUrl: 'http://my.library.edu/reportproblem.php?',
  messageText: 'See something that doesn\'t look right?',
  buttonText: 'Report a Problem'
});