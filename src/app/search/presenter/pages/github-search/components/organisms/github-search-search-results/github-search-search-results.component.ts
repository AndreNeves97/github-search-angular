import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { firstValueFrom, timer } from 'rxjs';
import { GithubUser } from 'src/app/search/domain/entities/github-user';
import { GithubSearchController } from '../../../github-search.controller';
import { GithubSearchSearchResultsTableDataSource } from './github-search-search-results-table-datasource';

@Component({
  selector: 'app-github-search-search-results',
  templateUrl: './github-search-search-results.component.html',
  styleUrls: ['./github-search-search-results.component.scss'],
})
export class GithubSearchSearchResultsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<GithubUser>;
  dataSource: GithubSearchSearchResultsTableDataSource;

  displayedColumns = ['avatarImg', 'login', 'type', 'htmlUrl'];

  constructor(public controller: GithubSearchController) {
    this.dataSource = new GithubSearchSearchResultsTableDataSource(controller);
  }

  async ngAfterViewInit(): Promise<void> {
    await firstValueFrom(timer(100));

    this.setDefaultSorting();
    this.connnectDataSource();
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
