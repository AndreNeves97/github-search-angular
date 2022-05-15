import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, skip, Subject } from 'rxjs';
import { AppController } from 'src/app/app.controller';
import { GithubSearchRequest } from 'src/app/search/domain/entities/github-search-request';
import { GithubSearchResult } from 'src/app/search/domain/entities/github-search-result';
import { GithubSearchUsecase } from 'src/app/search/domain/usecases/github-search.usecase';
import { GithubSearchDataState } from './states/github-search-data.state';
import { GithubSearchFilterState } from './states/github-search-filter.state';
import { GithubSearchViewState } from './states/github-search-view.state';

@Injectable()
export class GithubSearchController {
  public filterState$: BehaviorSubject<GithubSearchFilterState>;
  public viewState$: BehaviorSubject<GithubSearchViewState>;
  public dataState$: BehaviorSubject<GithubSearchDataState>;
  public focusSearchInput$: Subject<void>;

  loadRequest$: Subject<void>;

  constructor(
    private githubSearchUsecase: GithubSearchUsecase,
    private appController: AppController
  ) {
    this.filterState$ = new BehaviorSubject<GithubSearchFilterState>(
      GithubSearchFilterState.default()
    );

    this.viewState$ = new BehaviorSubject<GithubSearchViewState>(
      GithubSearchViewState.default()
    );

    this.dataState$ = new BehaviorSubject<GithubSearchDataState>(
      GithubSearchDataState.empty()
    );

    this.focusSearchInput$ = new Subject();

    this.loadRequest$ = new Subject<void>();

    this.listenStates();
  }

  public setSearchTerm(searchTerm: string) {
    this.updateFilterState({ searchTerm });
  }

  public setDefaultPage() {
    const defaultViewState = GithubSearchViewState.default();
    this.setPage(defaultViewState.page);
  }

  public setPage(page: number) {
    this.updateViewState({ page });
  }

  private updateFilterState(attributes: GithubSearchFilterState | {}) {
    const filterState = this.filterState$.value;

    this.filterState$.next({
      ...filterState,
      ...attributes,
    });

    this.setDefaultPage();
  }

  private updateViewState(attributes: GithubSearchViewState | {}) {
    const viewState = this.viewState$.value;

    this.viewState$.next({
      ...viewState,
      ...attributes,
    });
  }

  public load() {
    this.loadRequest$.next();
    this.appController.scrollToTop$.next();
  }

  private listenStates() {
    this.listenLoadRequest();
    this.listenFilterState();
    this.listenViewState();
  }

  private listenLoadRequest() {
    this.loadRequest$.pipe(debounceTime(50)).subscribe(() => {
      this.setLoading();

      const request = this.buildRequest();

      this.githubSearchUsecase.call(request).subscribe({
        next: this.setData.bind(this),
        error: this.setError.bind(this),
      });
    });
  }

  private listenFilterState() {
    this.filterState$.pipe(skip(1)).subscribe(() => {
      this.load();
    });
  }

  private listenViewState() {
    this.viewState$.pipe(skip(1)).subscribe(() => {
      this.load();
    });
  }

  private setLoading() {
    const data = this.dataState$.value.data;
    this.dataState$.next(GithubSearchDataState.loading(data));
  }

  private setError() {
    const data = this.dataState$.value.data;
    this.dataState$.next(GithubSearchDataState.error(data));
  }

  private setData(data: GithubSearchResult) {
    this.dataState$.next(GithubSearchDataState.success(data));
  }

  private buildRequest(): GithubSearchRequest {
    const filterState = this.filterState$.value;
    const viewState = this.viewState$.value;
    const perPage = 9;

    return new GithubSearchRequest(
      filterState.searchTerm,
      viewState.page,
      perPage
    );
  }
}
