import { expect } from 'chai';
import { eventBuilder } from '../lib';

describe('Utils', () => {
  it('should build event from payload', () => {
    let payload = {
      email: 'email'
    };
    expect(eventBuilder(payload)).to.eql({});
  });
});