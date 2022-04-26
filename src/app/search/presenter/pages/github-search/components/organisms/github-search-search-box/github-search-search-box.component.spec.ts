import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubSearchSearchBoxComponent } from './github-search-search-box.component';

describe('GithubSearchSearchBoxComponent', () => {
  let component: GithubSearchSearchBoxComponent;
  let fixture: ComponentFixture<GithubSearchSearchBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubSearchSearchBoxComponent ]
    })
    .compileComponents();
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
