import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MiscellaneousService } from 'src/app/core/services/miscellaneous.service';

@Component({
  selector: 'app-create-bulk-notification',
  templateUrl: './create-bulk-notification.component.html',
  styleUrls: ['./create-bulk-notification.component.scss']
})
export class CreateBulkNotificationComponent implements OnInit {

  constructor(
    private misc: MiscellaneousService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  roleList;
  active = 1;
  notificationForm: FormGroup

  submitForm() {

    const notificationMessage = this.notificationForm.value.message;
    const messageSubject = this.notificationForm.value.subject
    const role = this.notificationForm.value.role;

    let finalObj = {
      notification: notificationMessage,
      subject: messageSubject,
      role: role
    }

    console.log(finalObj);
    this.misc.sendBulkNotification(finalObj).subscribe(
      data => {
        console.log(data);
        this.toastr.success(data['message'], "Success")
      },
      error => {
        console.log("Error", error)
        this.toastr.error(error['message'], "Error")
      }
    )
  }

  fetchAllUserRoles() {
    this.misc.fetchUserRoles().subscribe(
      data => {
        console.log("roles:", data);
        this.roleList = data;
      }
    )
  }
  ngOnInit(): void {

    this.notificationForm = this.formbuilder.group({
      message: ['', [Validators.required,]],
      subject: ['', [Validators.required]],
      role: [''],
    })

    this.fetchAllUserRoles();
  }

}
