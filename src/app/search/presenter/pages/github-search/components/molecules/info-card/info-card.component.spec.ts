import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InfoMessage } from '../../../models/info-message';
import { InfoMessageType } from '../../../models/info-message-type';

import { InfoCardComponent } from './info-card.component';

describe('InfoCardComponent', () => {
  let component: InfoCardComponent;
  let fixture: ComponentFixture<InfoCardComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoCardComponent],
      imports: [NoopAnimationsModule, MatCardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a mat-card component with data from "infoMessage"', () => {
    const infoMessage = InfoMessage.find(InfoMessageType.INTRODUCTION);
    expect(infoMessage).toBeDefined();

    component.infoMessage = infoMessage;
    fixture.detectChanges();

    const card = debugElement.query(By.css('mat-card'));
    expect(card?.nativeElement).toBeDefined();

    const h2 = card.query(By.css('h2')).nativeElement as HTMLElement;
    const h4 = card.query(By.css('h4')).nativeElement as HTMLElement;
    const img = card.query(By.css('img')).nativeElement as HTMLElement;

    if (infoMessage) {
      expect(h2.textContent).toEqual(infoMessage.title);
      expect(h4.textContent).toEqual(infoMessage.message);
      expect(img.getAttribute('src')).toEqual(infoMessage.img);
    }
  });

  it('should hide mat-card if none infoMessage was set', () => {
    component.infoMessage = undefined;
    fixture.detectChanges();

    const card = debugElement.query(By.css('mat-card'));
    expect(card?.nativeElement).toBeUndefined();
  });
});
