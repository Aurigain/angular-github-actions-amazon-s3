import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-view',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.scss']
})
export class NotificationViewComponent implements OnInit {

  active = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
