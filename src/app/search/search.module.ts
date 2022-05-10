import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchRepository } from './domain/repositories/search-repository.interface';
import { GithubSearchPageComponent } from './presenter/pages/github-search/github-search-page/github-search-page.component';
import { GithubSearchController } from './presenter/pages/github-search/github-search.controller';
import { SearchRepositoryService } from './infra/repositories/search-repository.service';
import { GithubSearchSearchBoxComponent } from './presenter/pages/github-search/components/organisms/github-search-search-box/github-search-search-box.component';
import { GithubSearchSearchResultsComponent } from './presenter/pages/github-search/components/organisms/github-search-search-results/github-search-search-results.component';
import { FormsModule } from '@angular/forms';
import { GithubSearchUsecase } from './domain/usecases/github-search.usecase';
import { GithubSearchDatasource } from './infra/datasources/github-search-datasource.interface';
import { GithubSearchDatasourceService } from './external/datasources/github-search-datasource.service';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    GithubSearchPageComponent,
    GithubSearchSearchBoxComponent,
    GithubSearchSearchResultsComponent,
  ],
  providers: [
    GithubSearchController,
    GithubSearchUsecase,
    {
      provide: SearchRepository,
      useClass: SearchRepositoryService,
    },
    {
      provide: GithubSearchDatasource,
      useClass: GithubSearchDatasourceService,
    },
  ],
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class SearchModule {}
