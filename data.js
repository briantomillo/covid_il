const request = require('request');
const fs = require('fs');

// Add list of URLs for multiple states?
const url='http://www.dph.illinois.gov/sitefiles/COVIDTestResults.json?nocache=1'

// Determine time for file timestamp and date compare

getStateData(url);

function getStateData(url) {
  console.log('Retrieving data...')
  request(url, function (error, response, body) {
    if (error) {
      console.error('Retrieval failed with an error...')
      console.error('error:', error);
    };
    if (response.statusCode == 200) {
      console.log('Data retrieved');
      let updateDate = JSON.parse(body)
      let updateDay = updateDate.LastUpdateDate.day;
      let updateMonth = updateDate.LastUpdateDate.month;
      let updateYear = updateDate.LastUpdateDate.year;

      // Add date check, ignore file unless newer

      datestamp = ('0' + updateMonth).slice(-2) + ('0' + updateDay).slice(-2) + updateYear
      filename = './data/dataset-' + datestamp + '.json'
      console.log('filename = ' + filename)

      fs.writeFile(filename, body, (error) => {
        if (error) throw error;
        console.log('Data written to file');
      });
    } else {
      console.log('Retrieval failed with a non-200 status')
      console.log('statusCode:', response && response.statusCode);
    };
  });
};
