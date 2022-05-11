import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { GithubSearchController } from '../../../github-search.controller';

@Component({
  selector: 'app-github-search-search-box',
  templateUrl: './github-search-search-box.component.html',
  styleUrls: ['./github-search-search-box.component.scss'],
})
export class GithubSearchSearchBoxComponent implements AfterViewInit {
  @ViewChild(MatInput) searchInput!: MatInput;

  searchTerm: string = '';

  constructor(private controller: GithubSearchController) {}

  ngAfterViewInit(): void {
    this.controller.focusSearchInput$.subscribe(() => {
      this.searchInput.focus();
    });
  }

  submit(): void {
    this.controller.setPage(0);
    this.controller.setSearchTerm(this.searchTerm);
  }

  clearSearchTerm() {
    this.searchTerm = '';
  }
}
