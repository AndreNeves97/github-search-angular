import { Observable } from 'rxjs';
import { GithubSearchRequest } from '../../domain/entities/github-search-request';
import { GithubSearchResult } from '../../domain/entities/github-search-result';

export abstract class GithubSearchDatasource {
  public abstract fetchSearchResults(
    request: GithubSearchRequest
  ): Observable<GithubSearchResult[]>;
}
