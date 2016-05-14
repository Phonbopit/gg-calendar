import { expect } from 'chai';
import fs from 'fs';
import { authorize, listEvents } from '../lib';

let _AUTH;

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
});