import { expect } from 'chai';
import fs from 'fs';
import { authorize } from '../lib';

describe('Calendar API', () => {
  it('should provide client_secret.json file', (done) => {
    fs.readFile('client_secret.json', (err, content) => {
      expect(err).to.be.null;
      expect(content).to.be.an.object;
      done();
    });
  });

  it('should autozied passed with credentials file', (done) => {
    authorize((err, auth) => {
      expect(err).to.be.null;
      expect(auth.credentials.access_token).to.be.a.string;
      done();
    });
  });
});