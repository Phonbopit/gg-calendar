import { expect } from 'chai';
import { eventBuilder } from '../lib';

describe('Utils', () => {
  it('should build event from payload', () => {

    let date = new Date();
    let payload = {
      summary: 'this is summary',
      description: 'description',
      startDate: date,
      endDate: date,
      email: 'email@example.com'
    };
    expect(eventBuilder(payload)).to.eql({
      summary: 'this is summary',
      description: 'description',
      start: {
        dateTime: date,
        timeZone: 'Asia/Bangkok'
      },
      end: {
        dateTime: date,
        timeZone: 'Asia/Bangkok'
      },
      attendees: [
        { email: 'email@example.com' }
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
    })
  });
});