import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GithubSearchRequest } from '../entities/github-search-request';
import { GithubSearchResult } from '../entities/github-search-result';
import { SearchRepository } from '../repositories/search-repository.interface';

@Injectable()
export class GithubSearchUsecase {
  constructor(private searchRepository: SearchRepository) {}

  public call(request: GithubSearchRequest): Observable<GithubSearchResult> {
    return this.searchRepository.searchOnGithub(request);
  }
}
