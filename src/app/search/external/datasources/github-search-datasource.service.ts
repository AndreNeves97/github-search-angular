import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ApiService } from 'src/app/core/external/api/api.service';
import { GithubSearchRequest } from '../../domain/entities/github-search-request';
import { GithubSearchResult } from '../../domain/entities/github-search-result';
import { GithubSearchDatasource } from '../../infra/datasources/github-search-datasource.interface';

@Injectable()
export class GithubSearchDatasourceService implements GithubSearchDatasource {
  constructor(private apiService: ApiService) {}

  public fetchSearchResults(
    request: GithubSearchRequest
  ): Observable<GithubSearchResult> {
    if (!request.query) {
      return of(GithubSearchResult.empty());
    }

    const params = {
      q: request.query,
      page: request.page,
      per_page: request.perPage,
    };

    return this.apiService
      .get<any>('search/users', params)
      .pipe(
        map(
          (result) => new GithubSearchResult(result.items, result.total_count)
        )
      );
  }
}
