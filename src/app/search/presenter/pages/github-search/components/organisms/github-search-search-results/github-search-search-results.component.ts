import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { firstValueFrom, Subject, takeUntil, timer } from 'rxjs';
import { GithubUser } from 'src/app/search/domain/entities/github-user';
import { GithubSearchController } from '../../../github-search.controller';
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

  shouldShowInfoCard: boolean = true;
  shouldShowIntroduction: boolean = true;
  hasData: boolean = false;

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
      .subscribe((dataState) => {
        const filterState = this.controller.filterState$.value;

        if (dataState.isLoading) {
          return;
        }

        if (filterState.searchTerm !== '') {
          this.shouldShowIntroduction = false;
        }

        if (dataState.data.items.length === 0) {
          this.shouldShowInfoCard = true;
          this.hasData = false;
          return;
        }

        this.shouldShowInfoCard = false;
        this.hasData = true;
      });
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
    this.controller.focusSearchInput$.next();
  }
}
