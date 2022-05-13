import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, merge, Subscription } from 'rxjs';
import { GithubUser } from 'src/app/search/domain/entities/github-user';
import { GithubSearchController } from '../../../github-search.controller';
import { GithubSearchResult } from 'src/app/search/domain/entities/github-search-result';

export class ResultsTableDataSource extends DataSource<GithubUser> {
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  paginatorSubscription: Subscription | undefined;

  constructor(private controller: GithubSearchController) {
    super();
  }

  connect(): Observable<GithubUser[]> {
    if (!this.sort) {
      throw Error('Please set the sort on the data source before connecting.');
    }

    this.subscribeForPaginatorChanges();

    return merge(this.controller.dataState$, this.sort.sortChange).pipe(
      map(() => {
        return this.getSortedData(this.controller.dataState$.value.data);
      })
    );
  }

  disconnect(): void {
    if (!this.paginator) {
      return;
    }

    this.unsubscribeForPaginatorChanges();
  }

  subscribeForPaginatorChanges() {
    if (!this.paginator) {
      return;
    }

    this.unsubscribeForPaginatorChanges();

    this.paginatorSubscription = this.paginator.page.subscribe((page) => {
      this.controller.setPage(page.pageIndex);
    });
  }

  unsubscribeForPaginatorChanges() {
    if (this.paginatorSubscription) {
      this.paginatorSubscription.unsubscribe();
      this.paginatorSubscription = undefined;
    }
  }

  private getSortedData(result: GithubSearchResult): GithubUser[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return result.items;
    }

    return result.items
      .map((item) => item)
      .sort((a: any, b: any) => {
        const activeProperty = this.sort?.active;
        const isAsc = this.sort?.direction === 'asc';

        if (!activeProperty) {
          return 0;
        }

        return this.compare(a[activeProperty], b[activeProperty], isAsc);
      });
  }

  private compare(a: string, b: string, isAsc: boolean): number {
    return new Intl.Collator().compare(a, b) * (isAsc ? 1 : -1);
  }
}
