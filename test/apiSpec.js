import { expect } from 'chai';
import fs from 'fs';

describe('Calendar API', () => {
  it('should provide client_secret.json file', (done) => {
    fs.readFile('client_secret.json', (err, content) => {
      expect(err).to.be.null;
      expect(content).to.be.an.object;
      done();
    });
  });
});