export class GithubUser {
  avatarUrl: string;
  htmlUrl: string;
  login: string;
  type: string;

  constructor(avatarUrl: string, htmlUrl: string, login: string, type: string) {
    this.avatarUrl = avatarUrl;
    this.htmlUrl = htmlUrl;
    this.login = login;
    this.type = type;
  }
}
