import { Component, OnInit } from '@angular/core';
import { GithubSearchController } from '../../../github-search.controller';

@Component({
  selector: 'app-github-search-search-box',
  templateUrl: './github-search-search-box.component.html',
  styleUrls: ['./github-search-search-box.component.scss'],
})
export class GithubSearchSearchBoxComponent implements OnInit {
  searchTerm: string = '';

  constructor(private controller: GithubSearchController) {}

  ngOnInit(): void {}

  submit(): void {
    this.controller.setSearchTerm(this.searchTerm);
  }
}
