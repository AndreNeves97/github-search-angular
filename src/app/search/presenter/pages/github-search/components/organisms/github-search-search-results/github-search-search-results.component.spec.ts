import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { GithubSearchSearchResultsComponent } from './github-search-search-results.component';
import { GithubSearchController } from '../../../github-search.controller';
import { GithubSearchUsecase } from 'src/app/search/domain/usecases/github-search.usecase';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProgressBarComponent } from '../../atoms/progress-bar/progress-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InfoCardComponent } from '../../molecules/info-card/info-card.component';
import { ResultsTableComponent } from '../../molecules/results-table/results-table.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GithubSearchResult } from 'src/app/search/domain/entities/github-search-result';
import { of, Subject, tap } from 'rxjs';
import { InfoMessageType } from '../../../models/info-message-type';

describe('GithubSearchSearchResultsComponent', () => {
  let component: GithubSearchSearchResultsComponent;
  let fixture: ComponentFixture<GithubSearchSearchResultsComponent>;
  let debugElement: DebugElement;

  let controller: GithubSearchController;

  let githubSearchUsecaseSpy: jasmine.SpyObj<GithubSearchUsecase>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GithubSearchUsecase', ['call']);

    await TestBed.configureTestingModule({
      declarations: [
        ProgressBarComponent,
        InfoCardComponent,
        ResultsTableComponent,
        GithubSearchSearchResultsComponent,
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
        MatCardModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    controller = TestBed.inject(GithubSearchController);

    githubSearchUsecaseSpy = TestBed.inject(
      GithubSearchUsecase
    ) as jasmine.SpyObj<GithubSearchUsecase>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubSearchSearchResultsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  beforeEach(() => {});

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should show progress bar when data is loading', fakeAsync(() => {
    const stubValue = new Subject<GithubSearchResult>();
    githubSearchUsecaseSpy.call.and.returnValue(stubValue);

    controller.load();
    tick(2000);

    fixture.detectChanges();
    const progressBar = debugElement.query(
      By.css('app-progress-bar mat-progress-bar')
    );

    expect(progressBar?.nativeElement).toBeDefined();
  }));

  it('should hide progress bar when data has loaded', waitForAsync(() => {
    const stubValue = of(GithubSearchResult.empty());
    githubSearchUsecaseSpy.call.and.returnValue(stubValue);

    controller.load();

    fixture.detectChanges();

    const progressBar = debugElement.query(
      By.css('app-progress-bar mat-progress-bar')
    );

    expect(progressBar?.nativeElement).toBeUndefined();
  }));

  it('should set "introduction" info message on component startup', () => {
    expect(component.infoMessage).toEqual(
      jasmine.objectContaining({
        type: InfoMessageType.INTRODUCTION,
      })
    );
  });

  it('should set "search error" info message when data loading has error', fakeAsync(() => {
    const returnValue: GithubSearchResult = GithubSearchResult.empty();
    const stubValue = of(returnValue).pipe(
      tap(() => {
        throw new Error('');
      })
    );

    githubSearchUsecaseSpy.call.and.returnValue(stubValue);

    controller.setSearchTerm('andre neves');
    tick(3000);

    expect(component.infoMessage).toEqual(
      jasmine.objectContaining({
        type: InfoMessageType.SEARCH_ERROR,
      })
    );
  }));

  it('should set "no search results" info message when data loaded with no user in results', fakeAsync(() => {
    const returnValue: GithubSearchResult = GithubSearchResult.empty();
    const stubValue = of(returnValue);

    githubSearchUsecaseSpy.call.and.returnValue(stubValue);

    controller.setSearchTerm('andre neves');
    tick(3000);

    expect(component.infoMessage).toEqual(
      jasmine.objectContaining({
        type: InfoMessageType.NO_SEARCH_RESULTS,
      })
    );
  }));

  it('should hide info message and show table when data loaded has results', fakeAsync(() => {
    const returnValue: GithubSearchResult = GithubSearchResult.fromList([
      {
        avatarUrl: 'https://avatars.githubusercontent.com/u/16177771?v=4',
        htmlUrl: 'https://github.com/AndreNeves97',
        login: 'AndreNeves97',
        type: 'User',
      },
    ]);

    const stubValue = of(returnValue);

    githubSearchUsecaseSpy.call.and.returnValue(stubValue);

    controller.setSearchTerm('andre neves');
    tick(3000);

    expect(component.infoMessage).toBeUndefined();

    fixture.detectChanges();

    const table = debugElement.query(By.css('app-results-table'));
    expect(table.classes['hidden'])
      .withContext('app-results-table should be shown')
      .toBeUndefined();
  }));

  it('should retry data load on click on info card when had data loading error', fakeAsync(() => {
    const returnValue: GithubSearchResult = GithubSearchResult.empty();
    const stubValue = of(returnValue).pipe(
      tap(() => {
        throw new Error('');
      })
    );

    githubSearchUsecaseSpy.call.and.returnValue(stubValue);

    controller.setSearchTerm('andre neves');
    tick(3000);

    spyOn(controller, 'load').and.callThrough();

    component.onInfoCardClick();
    tick(3000);

    expect(controller.load).toHaveBeenCalled();
  }));

  it("should focus input search on click on info card when haven't data loading error", (done: DoneFn) => {
    controller.focusSearchInput$.subscribe(() => {
      expect().nothing();
      done();
    });

    component.onInfoCardClick();
  });
});
