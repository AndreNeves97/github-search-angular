import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { firstValueFrom, Subject, takeUntil, timer } from 'rxjs';
import { GithubUser } from 'src/app/search/domain/entities/github-user';
import { GithubSearchController } from '../../../github-search.controller';
import { InfoMessage } from '../../../models/info-message';
import { GithubSearchSearchResultsTableDataSource } from './github-search-search-results-table-datasource';

@Component({
  selector: 'app-github-search-search-results',
  templateUrl: './github-search-search-results.component.html',
  styleUrls: ['./github-search-search-results.component.scss'],
})
export class GithubSearchSearchResultsComponent
  implements AfterViewInit, OnDestroy
{
  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<GithubUser>;
  dataSource: GithubSearchSearchResultsTableDataSource;

  displayedColumns = ['avatarImg', 'login', 'type', 'htmlUrl'];

  infoMessage!: InfoMessage | null;

  constructor(public controller: GithubSearchController) {
    this.dataSource = new GithubSearchSearchResultsTableDataSource(controller);
    this.listenToStatesChanges();
  }

  async ngAfterViewInit(): Promise<void> {
    await firstValueFrom(timer(100));

    this.setDefaultSorting();
    this.connnectDataSource();
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

  buildInfoCardMessage(): InfoMessage | null {
    const filterState = this.controller.filterState$.value;
    const dataState = this.controller.dataState$.value;

    if (filterState.searchTerm === '') {
      return InfoMessage.introduction();
    }

    if (dataState.hasError) {
      return InfoMessage.searchError();
    }

    if (dataState.data.items.length === 0) {
      return InfoMessage.noSearchResults();
    }

    return null;
  }

  setDefaultSorting() {
    this.sort.sort({ id: 'login', start: 'asc', disableClear: false });
  }

  connnectDataSource() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.table.dataSource = this.dataSource;
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
