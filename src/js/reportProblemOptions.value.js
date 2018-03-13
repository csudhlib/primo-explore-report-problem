angular.module('reportProblem')
.value('reportProblem', {})
.value('reportProblemDefault', {
  //general options
  enabled: true,
  enabledDefault: true,
  reportUrl: 'http://my.library.edu/reportproblem.php?',
  messageText: 'See something that doesn\'t look right?',
  buttonText: 'Report a Problem',
  reportVendor: 'email',
  subject: '',
  //email-specific options
  toEmail: '',
  //libanswers-specific options
  instid: '',
  quid: '',
  qlog: '',
  source: ''
})
