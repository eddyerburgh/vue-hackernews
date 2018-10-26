module.exports = {
  src_folders: ['e2e/specs'], 
  output_folder: 'e2e/reports', 

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path, 
    host: '127.0.0.1',
    port: 4444, 
    cli_args: {
      'WebDriver.chrome.driver': require('chromedriver').path,
      'WebDriver.gecko.driver': require('geckodriver').path
    }
  },

  test_settings: {
    chrome: { 
      desiredCapabilities: {
        browserName: 'chrome'
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox' 
      }
    }

  }
}
