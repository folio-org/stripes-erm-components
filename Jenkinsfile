
buildNPM {
  publishModDescriptor = false
  runLint = true
  runSonarqube = true
  runScripts = [
    ['formatjs-compile': ''],
  ]
  sonarScanDirs = './lib'
  runTest = 'yes'
  runTestOptions = '--karma.singleRun --karma.browsers ChromeDocker --karma.reporters mocha junit --coverage'
}
