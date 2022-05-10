import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { GithubSearchSearchResultsComponent } from './github-search-search-results.component';
import { GithubSearchController } from '../../../github-search.controller';
import { GithubSearchUsecase } from 'src/app/search/domain/usecases/github-search.usecase';

describe('GithubSearchSearchResultsComponent', () => {
  let component: GithubSearchSearchResultsComponent;
  let fixture: ComponentFixture<GithubSearchSearchResultsComponent>;

  let githubSearchUsecaseSpy: jasmine.SpyObj<GithubSearchUsecase>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GithubSearchUsecase', ['call']);

    await TestBed.configureTestingModule({
      declarations: [GithubSearchSearchResultsComponent],
      providers: [
        GithubSearchController,
        {
          provide: GithubSearchUsecase,
          useValue: spy,
        },
      ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubSearchSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    githubSearchUsecaseSpy = TestBed.inject(
      GithubSearchUsecase
    ) as jasmine.SpyObj<GithubSearchUsecase>;
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
