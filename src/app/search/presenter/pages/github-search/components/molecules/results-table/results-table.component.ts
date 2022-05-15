import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { firstValueFrom, map, Observable, timer } from 'rxjs';
import { GithubUser } from 'src/app/search/domain/entities/github-user';
import { GithubSearchController } from '../../../github-search.controller';
import { ResultsTableDataSource } from './results-table-datasource';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
})
export class ResultsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<GithubUser>;
  dataSource: ResultsTableDataSource;

  displayedColumns = ['avatarImg', 'login', 'type', 'htmlUrl'];

  totalCount$!: Observable<number>;
  pageIndex$!: Observable<number>;

  constructor(public controller: GithubSearchController) {
    this.dataSource = new ResultsTableDataSource(controller);
    this.createHelperObservables();
  }

  async ngAfterViewInit(): Promise<void> {
    await firstValueFrom(timer(100));

    this.setDefaultSorting();
    this.connnectDataSource();
  }

  createHelperObservables() {
    this.totalCount$ = this.controller.dataState$.pipe(
      map((dataState) => dataState.data.totalCount)
    );

    this.pageIndex$ = this.controller.viewState$.pipe(
      map((viewState) => viewState.page)
    );
  }

  setDefaultSorting() {
    this.sort.sort({ id: 'login', start: 'asc', disableClear: false });
  }

  connnectDataSource() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.table.dataSource = this.dataSource;
  }
}
