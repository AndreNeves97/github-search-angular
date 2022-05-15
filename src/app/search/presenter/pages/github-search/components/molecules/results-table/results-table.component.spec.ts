import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { ResultsTableComponent } from './results-table.component';
import { GithubSearchUsecase } from 'src/app/search/domain/usecases/github-search.usecase';
import { GithubSearchController } from '../../../github-search.controller';
import { DebugElement } from '@angular/core';
import { GithubSearchResult } from 'src/app/search/domain/entities/github-search-result';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ResultsTableComponent', () => {
  let component: ResultsTableComponent;
  let fixture: ComponentFixture<ResultsTableComponent>;
  let debugElement: DebugElement;

  let controller: GithubSearchController;
  let githubSearchUsecaseSpy: jasmine.SpyObj<GithubSearchUsecase>;

  let returnValue: GithubSearchResult;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsTableComponent],
      providers: [
        GithubSearchController,
        {
          provide: GithubSearchUsecase,
          useValue: jasmine.createSpyObj('GithubSearchUsecase', ['call']),
        },
      ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.inject(GithubSearchController);

    githubSearchUsecaseSpy = TestBed.inject(
      GithubSearchUsecase
    ) as jasmine.SpyObj<GithubSearchUsecase>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsTableComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  beforeEach(() => {
    returnValue = GithubSearchResult.fromList([
      {
        avatarUrl: 'https://avatars.githubusercontent.com/u/16177771?v=4',
        htmlUrl: 'https://github.com/AndreNeves97',
        login: 'AndreNeves97',
        type: 'User',
      },
      {
        avatarUrl: 'https://avatars.githubusercontent.com/u/78?v=4',
        htmlUrl: 'https://github.com/indirect',
        login: 'indirect',
        type: 'User',
      },
    ]);
    const stubValue = of(returnValue);
    githubSearchUsecaseSpy.call.and.returnValue(stubValue);
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should render returned data', (done: DoneFn) => {
    controller.setSearchTerm('andre neves');

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      let tableRows = debugElement.queryAll(By.css('tbody tr'));

      expect(tableRows.length).toBe(
        controller.dataState$.value.data.items.length
      );

      done();
    });
  });

  it('should show correct list when disable sorting', (done: DoneFn) => {
    controller.setSearchTerm('andre neves');

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      component.sort.sort({ id: '', start: '', disableClear: false });
      fixture.detectChanges();

      const unsortedFirstRow = debugElement.query(
        By.css('tbody tr')
      ).nativeElement;

      expect(unsortedFirstRow.textContent).toContain(
        returnValue.items[0].login
      );

      done();
    });
  });
});
