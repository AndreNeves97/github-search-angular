import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GithubSearchPageComponent } from './presenter/pages/github-search/github-search-page/github-search-page.component';

const routes: Routes = [
  {
    path: '',
    component: GithubSearchPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
