import { InfoMessageType } from './info-message-type';

export class InfoMessage {
  static messages: InfoMessage[] = [
    new InfoMessage(
      InfoMessageType.INTRODUCTION,
      'Search a GitHub User!',
      'Click here to start.',
      'assets/img/people-search.svg'
    ),
    new InfoMessage(
      InfoMessageType.SEARCH_ERROR,
      'We have an issue to search on GitHub.',
      'Click here to try again.',
      'assets/img/error.svg'
    ),
    new InfoMessage(
      InfoMessageType.NO_SEARCH_RESULTS,
      'No user found on GitHub Search.',
      'Click here to search another user.',
      'assets/img/no-data.svg'
    ),
  ];

  type: InfoMessageType;
  title: string;
  message: string;
  img: string;

  constructor(
    type: InfoMessageType,
    title: string,
    message: string,
    img: string
  ) {
    this.type = type;
    this.title = title;
    this.message = message;
    this.img = img;
  }

  public static find(type: InfoMessageType): InfoMessage | undefined {
    return InfoMessage.messages.find((message) => message.type === type);
  }
}
