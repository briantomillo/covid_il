const request = require('request');
const fs = require('fs');

// Add list of URLs for multiple states?
const url='http://www.dph.illinois.gov/sitefiles/COVIDTestResults.json?nocache=1'

// Determine time for file timestamp and date compare

getStateData(url);

function getStateData(url) {
  request(url, function (error, response, body) {
    if (error) {
      console.error('error:', error);
    };
    if (response.statusCode == 200) {
      // Add date check, ignore file unless newer
      fs.writeFile('dataset.json', body, (error) => {
        if (error) throw error;
        console.log('Data written to file');
      });
    } else {
      console.log('statusCode:', response && response.statusCode);
    };
  });
};
