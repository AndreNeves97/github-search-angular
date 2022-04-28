import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubSearchController } from '../../../github-search.controller';

import { GithubSearchSearchBoxComponent } from './github-search-search-box.component';

describe('GithubSearchSearchBoxComponent', () => {
  let component: GithubSearchSearchBoxComponent;
  let fixture: ComponentFixture<GithubSearchSearchBoxComponent>;

  let githubSearchControllerSpy: jasmine.SpyObj<GithubSearchController>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GithubSearchController', ['setPage']);

    await TestBed.configureTestingModule({
      declarations: [GithubSearchSearchBoxComponent],
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
    fixture = TestBed.createComponent(GithubSearchSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
