import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressBarComponent],
      imports: [NoopAnimationsModule, MatProgressBarModule],
    }).compileComponents();
  });

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show progress bar', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const progressBar = debugElement.query(By.css('mat-progress-bar'));
    expect(progressBar?.nativeElement).toBeDefined();
  });

  it('should hide progress bar', () => {
    component.isLoading = false;
    fixture.detectChanges();

    const progressBar = debugElement.query(By.css('mat-progress-bar'));
    expect(progressBar?.nativeElement).toBeUndefined();
  });
});
