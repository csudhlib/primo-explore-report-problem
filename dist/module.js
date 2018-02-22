'use strict';

angular.module('reportProblem', []);

angular.module('reportProblem').component('ocaReportProblem', {
  bindings: {
    messageText: '@',
    buttonText: '@',
    reportUrl: '@'
  },
  template: '\n      <div ng-if="$ctrl.show" class="bar filter-bar layout-align-center-center layout-row margin-top-medium" layout="row" layout-align="center center">\n          <span class="margin-right-small">{{$ctrl.messageText}}</span>\n          <a ng-href="{{$ctrl.targetUrl}}" target="_blank">\n              <button class="button-with-icon zero-margin md-button md-button-raised md-primoExplore-theme" type="button" aria-label="Report a Problem" style="color: #5c92bd;">\n                  <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_report_problem_24px"></prm-icon>\n                  <span style="text-transform: none;">{{$ctrl.buttonText}}</span>\n              </button>\n          </a>\n      </div>',
  controller: ['$location', '$httpParamSerializer', function ($location, $httpParamSerializer) {
    this.enabled = reportProblem.hasOwnProperty("enabled") ? reportProblem.enabled : reportProblemDefault.enabled;
    this.messageText = this.messageText || (reportProblem.hasOwnProperty("messageText") ? reportProblem.messageText : reportProblemDefault.messageText);
    this.buttonText = this.buttonText || (reportProblem.hasOwnProperty("buttonText") ? reportProblem.buttonText : reportProblemDefault.buttonText);
    this.reportUrl = this.reportUrl || (reportProblem.hasOwnProperty("reportUrl") ? reportProblem.reportUrl : reportProblemDefault.reportUrl);
    this.showLocations = ['/fulldisplay', '/openurl'];
    this.$onInit = function () {
      this.targetUrl = this.reportUrl + $httpParamSerializer($location.search());
      this.show = this.showLocations.includes($location.path()) && this.enabled === true;
    };
  }]
}).run(['$templateCache', 'reportProblem', 'reportProblemDefault', function ($templateCache, reportProblem, reportProblemDefault) {
  if (reportProblem.hasOwnProperty("enabledDefault") ? reportProblem.enabledDefault : reportProblemDefault.enabledDefault) $templateCache.put('components/search/fullView/fullViewServiceContainer/login-alma-mashup.html', $templateCache.get('components/search/fullView/fullViewServiceContainer/login-alma-mashup.html') + '<oca-report-problem ng-if="$ctrl.index == $ctrl.getIndexFullView()" />');
}]);
angular.module('reportProblem').value('reportProblem', {}).value('reportProblemDefault', {
  enabled: true,
  enabledDefault: true,
  reportUrl: 'http://my.library.edu/reportproblem.php?',
  messageText: 'See something that doesn\'t look right?',
  buttonText: 'Report a Problem'
});