import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppController {
  public scrollToTop$: Subject<void>;

  constructor() {
    this.scrollToTop$ = new Subject();
  }
}
