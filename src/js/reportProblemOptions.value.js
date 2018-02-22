angular.module('reportProblem')
.value('reportProblem', {})
.value('reportProblemDefault', {
  enabled: true,
  enabledDefault: true,
  reportUrl: 'http://my.library.edu/reportproblem.php?',
  messageText: 'See something that doesn\'t look right?',
  buttonText: 'Report a Problem'
})
  