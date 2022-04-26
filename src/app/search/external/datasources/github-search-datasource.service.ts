import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from 'src/app/core/external/api/api.service';
import { GithubSearchRequest } from '../../domain/entities/github-search-request';
import { GithubSearchResult } from '../../domain/entities/github-search-result';
import { GithubSearchDatasource } from '../../infra/datasources/github-search-datasource.interface';

@Injectable()
export class GithubSearchDatasourceService implements GithubSearchDatasource {
  constructor() {}

  public fetchSearchResults(
    request: GithubSearchRequest
  ): Observable<GithubSearchResult[]> {
    const params = {
      q: request.query,
      page: request.page,
      per_page: request.perPage,
    };

    console.log(params);

    return of();
  }
}
