import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubSearchSearchResultsComponent } from './github-search-search-results.component';

describe('GithubSearchSearchResultsComponent', () => {
  let component: GithubSearchSearchResultsComponent;
  let fixture: ComponentFixture<GithubSearchSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubSearchSearchResultsComponent ]
    })
    .compileComponents();
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
