import { Component, OnInit } from '@angular/core';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';

@Component({
  selector: 'app-notification-view',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.scss']
})
export class NotificationViewComponent implements OnInit {

  active = 1;
  readList
  unreadList
  constructor(
    private misc: MiscellaneousService,
  ) { }

  getNotificationsList() {
    this.misc.getNotificationListByStatus("read").subscribe(
      data => {
        this.readList = data;
        console.log("readList", data);

      }
    );
    this.misc.getNotificationListByStatus("unread").subscribe(
      data => {
        this.unreadList = data;
        console.log("unread List", data);
      }
    );
  }

  readNotification(id){
    this.misc.changeNotificationStatus(id).subscribe(
      data => {
        console.log("readNotification", data);
        this.getNotificationsList();
      }
    )
  }
  ngOnInit(): void {
    this.getNotificationsList();
  }

}
