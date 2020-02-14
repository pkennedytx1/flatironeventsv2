const functions = require('firebase-functions');
const cors = require('cors')({ origin: true })
const admin = require('firebase-admin')
const {google} = require('googleapis')

admin.initializeApp()

exports.onSignIn = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        console.log(req.body.data)
        let firstName = req.body.data.firstName
        var jwt = getJwt();
        var apiKey = getApiKey()
        var spreadsheetId = '1bJqnfZGA1x1r5ZDE9Lb5yQl9_0c4A3Fy3h5hMPtOr-c';
        var range = 'A1';
        var row = [`${req.body.data.event.name}`, `${req.body.data.event.campus}`, `${req.body.data.firstName}`, `${req.body.data.lastName}`, `${req.body.data.email}`, `${req.body.data.event.date}`, `${req.body.data.category}`]
        // var row = [`${data.event.name}`, `${data.event.campus}`, `${data.firstName}`, `${data.lastName}`, `${data.email}`, `${data.event.campus}`, `${data.category}`];
        appendSheetRow(jwt, apiKey, spreadsheetId, range, row);

        res.status(200).json({
            sentData: `${firstName}`
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
