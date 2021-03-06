import { Component, Input, OnInit } from '@angular/core';
import { AlertMessage } from './alert-message';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.sass']
})
export class AlertMessageComponent implements OnInit {

  @Input() alertMessage: AlertMessage;

  constructor() { }

  ngOnInit() {
  }

}
