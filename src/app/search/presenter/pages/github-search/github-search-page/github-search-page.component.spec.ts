import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GithubSearchUsecase } from 'src/app/search/domain/usecases/github-search.usecase';
import { ProgressBarComponent } from '../components/atoms/progress-bar/progress-bar.component';
import { InfoCardComponent } from '../components/molecules/info-card/info-card.component';
import { ResultsTableComponent } from '../components/molecules/results-table/results-table.component';
import { GithubSearchSearchBoxComponent } from '../components/organisms/github-search-search-box/github-search-search-box.component';
import { GithubSearchSearchResultsComponent } from '../components/organisms/github-search-search-results/github-search-search-results.component';
import { GithubSearchController } from '../github-search.controller';

import { GithubSearchPageComponent } from './github-search-page.component';

describe('GithubSearchPageComponent', () => {
  let component: GithubSearchPageComponent;
  let fixture: ComponentFixture<GithubSearchPageComponent>;

  let controller: GithubSearchController;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GithubSearchUsecase', ['call']);

    await TestBed.configureTestingModule({
      declarations: [
        ProgressBarComponent,
        InfoCardComponent,
        ResultsTableComponent,
        GithubSearchSearchBoxComponent,
        GithubSearchSearchResultsComponent,
        GithubSearchPageComponent,
      ],
      providers: [
        GithubSearchController,
        {
          provide: GithubSearchUsecase,
          useValue: spy,
        },
      ],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatProgressBarModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    controller = TestBed.inject(GithubSearchController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
