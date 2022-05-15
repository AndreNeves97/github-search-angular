import { InfoMessage } from './info-message';
import { InfoMessageType } from './info-message-type';

describe('InfoMessage', () => {
  it('should create an instance', () => {
    expect(InfoMessage.find(InfoMessageType.INTRODUCTION)).toBeTruthy();
  });
});
