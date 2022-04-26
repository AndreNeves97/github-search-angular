import { Observable } from 'rxjs';
import { GithubSearchRequest } from '../entities/github-search-request';
import { GithubSearchResult } from '../entities/github-search-result';

export abstract class SearchRepository {
  public abstract searchOnGithub(
    request: GithubSearchRequest
  ): Observable<GithubSearchResult[]>;
}
