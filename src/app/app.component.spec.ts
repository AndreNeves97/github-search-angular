import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'scalio-challenge'`, () => {
    expect(component.title).toEqual('scalio-challenge');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const title = debugElement.query(By.css('.content span'));
    const titleElement = title.nativeElement as HTMLElement;

    expect(titleElement.textContent).toContain(
      'scalio-challenge app is running!'
    );
  });
});
