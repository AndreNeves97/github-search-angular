import { Component, OnDestroy } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { GithubSearchController } from '../../../github-search.controller';
import { InfoMessage } from '../../../models/info-message';
import { InfoMessageType } from '../../../models/info-message-type';

@Component({
  selector: 'app-github-search-search-results',
  templateUrl: './github-search-search-results.component.html',
  styleUrls: ['./github-search-search-results.component.scss'],
})
export class GithubSearchSearchResultsComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  infoMessage!: InfoMessage | undefined;
  isLoading$!: Observable<boolean>;

  constructor(public controller: GithubSearchController) {
    this.listenToStatesChanges();
    this.createHelperObservables();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  listenToStatesChanges() {
    this.controller.dataState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.onDataStateChange.bind(this));
  }

  createHelperObservables() {
    this.isLoading$ = this.controller.dataState$.pipe(
      map((dataState) => dataState.isLoading)
    );
  }

  onDataStateChange() {
    const dataState = this.controller.dataState$.value;

    if (dataState.isLoading) {
      return;
    }

    this.setInfoCardMessage();
  }

  setInfoCardMessage() {
    this.infoMessage = this.buildInfoCardMessage();
  }

  buildInfoCardMessage(): InfoMessage | undefined {
    const filterState = this.controller.filterState$.value;
    const dataState = this.controller.dataState$.value;

    if (filterState.searchTerm === '') {
      return InfoMessage.find(InfoMessageType.INTRODUCTION);
    }

    if (dataState.hasError) {
      return InfoMessage.find(InfoMessageType.SEARCH_ERROR);
    }

    if (dataState.data.items.length === 0) {
      return InfoMessage.find(InfoMessageType.NO_SEARCH_RESULTS);
    }

    return undefined;
  }

  onInfoCardClick() {
    const dataState = this.controller.dataState$.value;

    if (dataState.hasError) {
      this.controller.load();
      return;
    }

    this.controller.focusSearchInput$.next();
  }
}
