const functions = require('firebase-functions');
const cors = require('cors')({ origin: true })
const {google} = require('googleapis')

exports.onSignIn = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        var jwt = getJwt();
        // var apiKey = getApiKey();
        var apiKey = getApiKey()
        var spreadsheetId = '1bJqnfZGA1x1r5ZDE9Lb5yQl9_0c4A3Fy3h5hMPtOr-c';
        var range = 'A1';
        var row = ['hello'];
        appendSheetRow(jwt, apiKey, spreadsheetId, range, row);

        res.status(200).json({
            message: 'It worked'
        })
    })
})
  
  function getJwt() {
    var credentials = require("./credentials.json");
    return new google.auth.JWT(
      credentials.client_email, null, credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );
  }
  
  function getApiKey() {
    var apiKeyFile = require("./api_key.json");
    return apiKeyFile.key;
  }
  
  function appendSheetRow(jwt, apiKey, spreadsheetId, range, row) {
    const sheets = google.sheets({version: 'v4'});
    sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: range,
      auth: jwt,
      key: apiKey,
      valueInputOption: 'RAW',
      resource: {values: [row]}
    }, function(err, result) {
      if (err) {
        throw err;
      }
      else {
        console.log('Updated sheet: ' + result.data.updates.updatedRange);
      }
    });
  }
