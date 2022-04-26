export class GithubSearchRequest {
  query: string | null;
  page: number;

  constructor(query: string | null, page: number) {
    this.query = query;
    this.page = page;
  }
}
