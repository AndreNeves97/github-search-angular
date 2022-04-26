export class GithubSearchResult {
  avatarUrl: string;
  login: string;
  type: string;

  constructor(avatarUrl: string, login: string, type: string) {
    this.avatarUrl = avatarUrl;
    this.login = login;
    this.type = type;
  }
}
