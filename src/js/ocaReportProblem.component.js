/* eslint-disable max-len */
angular.module('reportProblem')
.component('ocaReportProblem', {
  bindings: {
    messageText: '@',
    buttonText: '@',
    reportUrl: '@',
  },
  template: `
    <div ng-if="$ctrl.show" class="bar filter-bar layout-align-center-center layout-row margin-top-medium" layout="row" layout-align="center center">
        <span class="margin-right-small">{{$ctrl.messageText}}</span>
        <a ng-href="{{$ctrl.targetUrl}}" target="_blank">
            <button class="button-with-icon zero-margin md-button md-button-raised md-primoExplore-theme" type="button" aria-label="Report a Problem" style="color: #5c92bd;">
                <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_report_problem_24px"></prm-icon>
                <span style="text-transform: none;">{{$ctrl.buttonText}}</span>
            </button>
        </a>
    </div>`,
  controller: ['$location', '$httpParamSerializer', 'reportProblem', 'reportProblemDefault', function($location, $httpParamSerializer, reportProblem, reportProblemDefault) {
    this.enabled = reportProblem.hasOwnProperty("enabled") ? reportProblem.enabled : reportProblemDefault.enabled
    this.messageText = this.messageText || (reportProblem.hasOwnProperty("messageText") ? reportProblem.messageText : reportProblemDefault.messageText)
    this.buttonText = this.buttonText || (reportProblem.hasOwnProperty("buttonText") ? reportProblem.buttonText : reportProblemDefault.buttonText)
    this.reportUrl = this.reportUrl || (reportProblem.hasOwnProperty("reportUrl") ? reportProblem.reportUrl : reportProblemDefault.reportUrl)
    this.showLocations = [
      '/fulldisplay', // details view
      '/openurl', // services page (link resolver)
    ]
    this.$onInit = function() {
      this.targetUrl = this.reportUrl + $httpParamSerializer($location.search())
      this.show = this.showLocations.includes($location.path()) && this.enabled === true
    }
  }],
}).run(['$templateCache', 'reportProblem', 'reportProblemDefault', function ($templateCache, reportProblem, reportProblemDefault) {
  if(reportProblem.hasOwnProperty("enabledDefault") ? reportProblem.enabledDefault : reportProblemDefault.enabledDefault)
    $templateCache.put('components/search/fullView/fullViewServiceContainer/login-alma-mashup.html', $templateCache.get('components/search/fullView/fullViewServiceContainer/login-alma-mashup.html') + '<oca-report-problem ng-if="$ctrl.index == $ctrl.getIndexFullView()" />');
}])
