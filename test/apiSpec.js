import { expect } from 'chai';
import fs from 'fs';
import { authorize, listEvents, createEvent, deleteEvent } from '../lib';

let _AUTH;
let _EVENT_ID;

describe('Calendar API', () => {

  beforeEach((done) => {
    require('dotenv').config();

    authorize((err, auth) => {
      _AUTH = auth;
      done();
    });
  });

  it('should provide client_secret.json file', (done) => {
    fs.readFile('client_secret.json', (err, content) => {
      expect(err).to.be.null;
      expect(content).to.be.an.object;
      done();
    });
  });

  it('authorize() should autozied passed with credentials file', (done) => {
    authorize((err, auth) => {
      expect(err).to.be.null;
      expect(auth.credentials)
        .to.be.an('object')
        .to.have.property('access_token')
        .that.is.a('string');
      done();
    });
  });

  it('listEvents() should show events as items', (done) => {
    listEvents(_AUTH, (err, response) => {
      expect(err).to.be.null;
      expect(response)
        .to.have.property('items')
        .that.is.an('array');
      done();
    })
  });

  it('createEvent() should create new event', (done) => {

    let options = {
      auth: _AUTH,
      event: {
        summary: 'Just test',
        description: 'Just description',
        start: {
          dateTime: '2016-05-15T09:00:00+07:00',
          timeZone: 'Asia/Bangkok'
        },
        end: {
          dateTime: '2016-05-15T18:00:00+07:00',
          timeZone: 'Asia/Bangkok'
        },
        attendees: [
          { email: 'test@example.com' }
        ],
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: 'email', 
              minutes: 24 * 60
            }
          ]
        }
      }
    }
    createEvent(options, (err, response) => {
      expect(err).to.be.null;
      expect(response).to.have.property('htmlLink');
      _EVENT_ID = response.id;
      done();
    });
  });

  after((done) => {

    let options = {
      auth: _AUTH,
      eventId: _EVENT_ID
    };

    deleteEvent(options, (err, response) => {
      expect(err).to.be.null;
      expect(response).to.be.an('undefined');
      done();
    });
  });
});