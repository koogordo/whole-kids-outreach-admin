import { DialogBoxComponent } from './../../dialog-box/dialog-box.component';
import { StaffConfirmDialogComponent } from './../../dialog-modals/staff-confirm-dialog/staff-confirm-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Staff } from '../../../models/Staff';
import { DatabaseService } from '../../../services/database.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  @ViewChild('staffForm') form: any;
  posOnStaff: any;
  staffPosition: number;
  fname: string;
  lname: string;
  suffix: string;
  staffEmail: string;
  increment: number;
  staffSlots: number[];
  staff: Staff[];
  constructor(private db: DatabaseService, public dialog: MatDialog,
    public confirm: MatSnackBar) {
    this.posOnStaff = [
       'Executive Director',
       'Center Director',
       'Nursing Program Coordinator',
       'HFA Director',
       'Development Director',
       'Program Support Coordinator',
       'Administrative Support Coordinator',
       'Finance Coordinator',
       'Outreach Specialist ',
       'Center Staff',
       'IT Specialist'
    ];
    this.staffSlots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  ngOnInit() {
    this.db.getStaffMembers().subscribe( staff => {
      this.staff = staff;
    });
  }



  submitNewStaff({value, valid}: {value: Staff, valid: boolean}) {
    if (valid) {
      value.position = this.staffPosition;
      value.suffix = this.suffix ? this.suffix : '';

      let dlogRef = this.dialog.open(StaffConfirmDialogComponent, {
        height: '400px',
        width: '400px',
        data: value
      });

      dlogRef.afterClosed().subscribe( returnConfirm => {
        if (returnConfirm.confirm) {
          this.db.addStaffMember(value);
          this.form.resetForm();
          this.confirm.open('Staff Successfully Added', 'Close', {duration: 3000});
        } else {
          this.confirm.open('Submission Aborted', 'Close', {duration: 3000});
        }
      });

    } else {
      this.confirm.open('Invalid Form', 'Close', {duration: 3000});
    }
  }

  deleteStaffMember(e: any) {
    let dlogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      height: '250px',
    });
    dlogRef.afterClosed().subscribe( confirm => {
      if (confirm) {
        this.db.deleteStaffMember(e.target.value);
        this.confirm.open('Staff Member Deleted', 'Close', {duration: 2000});
      } else {
        this.confirm.open('Delete Cancelled', 'Close', {duration: 2000});
      }
    });

  }

}
