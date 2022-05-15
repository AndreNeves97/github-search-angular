import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { of } from 'rxjs';
import { GithubSearchController } from '../../../github-search.controller';

import { GithubSearchSearchBoxComponent } from './github-search-search-box.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GithubSearchUsecase } from 'src/app/search/domain/usecases/github-search.usecase';
import { GithubSearchResult } from 'src/app/search/domain/entities/github-search-result';

describe('GithubSearchSearchBoxComponent', () => {
  let component: GithubSearchSearchBoxComponent;
  let fixture: ComponentFixture<GithubSearchSearchBoxComponent>;
  let debugElement: DebugElement;

  let controller: GithubSearchController;
  let githubSearchUsecaseSpy: jasmine.SpyObj<GithubSearchUsecase>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('GithubSearchUsecase', ['call']);

    TestBed.configureTestingModule({
      declarations: [GithubSearchSearchBoxComponent],
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
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    controller = TestBed.inject(GithubSearchController);

    githubSearchUsecaseSpy = TestBed.inject(
      GithubSearchUsecase
    ) as jasmine.SpyObj<GithubSearchUsecase>;
  });

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(GithubSearchSearchBoxComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should focus input', () => {
    controller.focusSearchInput$.next();
    fixture.detectChanges();

    const input = debugElement.query(By.css('input[name=searchTerm]'));
    expect(document.activeElement).toEqual(input.nativeElement);
  });

  it('#submit should set the "searchTerm" in "filterState"', waitForAsync(() => {
    const returnValue: GithubSearchResult = GithubSearchResult.empty();
    const stubValue = of(returnValue);
    githubSearchUsecaseSpy.call.and.returnValue(stubValue);

    const input = debugElement.query(By.css('input[name=searchTerm]'));
    const inputElement = input.nativeElement;

    fixture.whenStable().then(() => {
      const searchTerm = 'andre neves';

      inputElement.value = searchTerm;
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.searchTerm)
        .withContext('check "searchTerm" property')
        .toEqual(searchTerm);

      component.submit();

      const searchTermInfilterState = controller.filterState$.value.searchTerm;
      expect(searchTermInfilterState).toEqual(searchTerm);
    });
  }));

  it('#clearSearchTerm should clear "searchTerm" property', waitForAsync(() => {
    const input = debugElement.query(By.css('input[name=searchTerm]'));
    const inputElement = input.nativeElement;

    fixture.whenStable().then(() => {
      const oldSearchTerm = 'andre neves';

      inputElement.value = oldSearchTerm;
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.searchTerm)
        .withContext(`"searchTerm" is ${oldSearchTerm} before`)
        .toEqual(oldSearchTerm);

      component.clearSearchTerm();

      expect(component.searchTerm)
        .withContext(`"searchTerm" was cleared`)
        .toEqual('');
    });
  }));
});
