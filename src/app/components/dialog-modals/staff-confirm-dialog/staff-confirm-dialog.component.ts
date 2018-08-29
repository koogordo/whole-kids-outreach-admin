import { Staff } from './../../../models/Staff';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { StaffComponent } from '../../forms/staff/staff.component';

@Component({
  selector: 'app-staff-confirm-dialog',
  templateUrl: './staff-confirm-dialog.component.html',
  styleUrls: ['./staff-confirm-dialog.component.css']
})
export class StaffConfirmDialogComponent implements OnInit {
  toConfirm: Staff;
  constructor(public dialogRef: MatDialogRef<StaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.toConfirm = this.data;
     }

  ngOnInit() {
  }

  closeDialogFalse() {
    this.dialogRef.close({confirm: false});
  }

  closeDialogTrue() {
    this.dialogRef.close({confirm: true});
  }

}
