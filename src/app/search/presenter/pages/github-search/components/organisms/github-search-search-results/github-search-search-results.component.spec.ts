import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubSearchController } from '../../../github-search.controller';

import { GithubSearchSearchResultsComponent } from './github-search-search-results.component';

describe('GithubSearchSearchResultsComponent', () => {
  let component: GithubSearchSearchResultsComponent;
  let fixture: ComponentFixture<GithubSearchSearchResultsComponent>;

  let githubSearchControllerSpy: jasmine.SpyObj<GithubSearchController>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GithubSearchController', ['setPage']);

    await TestBed.configureTestingModule({
      declarations: [GithubSearchSearchResultsComponent],
      providers: [
        {
          provide: GithubSearchController,
          useValue: spy,
        },
      ],
    }).compileComponents();

    githubSearchControllerSpy = TestBed.inject(
      GithubSearchController
    ) as jasmine.SpyObj<GithubSearchController>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubSearchSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
