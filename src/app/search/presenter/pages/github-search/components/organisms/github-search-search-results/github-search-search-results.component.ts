import { Component, OnInit } from '@angular/core';
import { GithubSearchController } from '../../../github-search.controller';

@Component({
  selector: 'app-github-search-search-results',
  templateUrl: './github-search-search-results.component.html',
  styleUrls: ['./github-search-search-results.component.scss'],
})
export class GithubSearchSearchResultsComponent implements OnInit {
  constructor(private controller: GithubSearchController) {}

  ngOnInit(): void {}

  changePage(pageIndex: number) {
    this.controller.setPage(pageIndex);
  }
}
