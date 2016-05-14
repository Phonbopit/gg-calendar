'use strict';

const google = require('googleapis');
const googleAuth = require('google-auth-library');
const calendar = google.calendar('v3');
const fs = require('fs');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

module.exports = {
  authorize: (callback) => {

    fs.readFile('client_secret.json', (err, content) => {
      if (err) return callback(err);

      let credentials = JSON.parse(content);
      var clientSecret = credentials.installed.client_secret;
      var clientId = credentials.installed.client_id;
      var redirectUrl = credentials.installed.redirect_uris[0];
      var auth = new googleAuth();
      var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return callback(err);

        oauth2Client.credentials = JSON.parse(token);
        return callback(null, oauth2Client);
      });
    });
    
  },

  listEvents: (auth, callback) => {
    calendar.events.list({
      auth: auth,
      calendarId: process.env.CALENDAR_ID || 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 50,
      singleEvents: true,
      orderBy: 'startTime'
    }, (err, response) => {
      if (err) return callback(err);

      return callback(err, response);
    });
  }
}