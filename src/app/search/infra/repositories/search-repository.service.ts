import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubSearchRequest } from '../../domain/entities/github-search-request';
import { GithubSearchResult } from '../../domain/entities/github-search-result';
import { SearchRepository } from '../../domain/repositories/search-repository.interface';
import { GithubSearchDatasource } from '../datasources/github-search-datasource.interface';

@Injectable()
export class SearchRepositoryService implements SearchRepository {
  constructor(private githubSearchDatasource: GithubSearchDatasource) {}

  searchOnGithub(request: GithubSearchRequest): Observable<GithubSearchResult> {
    return this.githubSearchDatasource.fetchSearchResults(request);
  }
}
