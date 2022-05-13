import { Component, Input, OnInit } from '@angular/core';
import { InfoMessage } from '../../../models/info-message';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent implements OnInit {
  @Input()
  infoMessage!: InfoMessage | undefined;

  constructor() {}

  ngOnInit(): void {}
}
