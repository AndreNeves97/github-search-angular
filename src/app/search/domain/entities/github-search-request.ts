export class GithubSearchRequest {
  query: string | null;
  page: number;
  perPage: number;

  constructor(query: string | null, page: number, perPage: number) {
    this.query = query;
    this.page = page;
    this.perPage = perPage;
  }
}
