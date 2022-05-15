import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';
import { AppController } from './app.controller';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatSidenavContent) sidenavContent!: MatSidenavContent;

  title = 'GitHub Users Search';

  constructor(private controller: AppController) {}

  ngAfterViewInit(): void {
    this.controller.scrollToTop$.subscribe(() => {
      this.sidenavContent.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
}
