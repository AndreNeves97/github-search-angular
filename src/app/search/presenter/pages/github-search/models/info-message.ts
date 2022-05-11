export class InfoMessage {
  title: string;
  message: string;
  img: string;

  constructor(title: string, message: string, img: string) {
    this.title = title;
    this.message = message;
    this.img = img;
  }

  public static introduction(): InfoMessage {
    return new InfoMessage(
      'Search a GitHub User!',
      'Click here to start.',
      'assets/img/people-search.svg'
    );
  }

  public static searchError(): InfoMessage {
    return new InfoMessage(
      'We have an issue to search on GitHub.',
      'Click here to try again.',
      'assets/img/error.svg'
    );
  }

  public static noSearchResults(): InfoMessage {
    return new InfoMessage(
      'No user found on GitHub Search.',
      'Click here to search another user.',
      'assets/img/no-data.svg'
    );
  }
}
