import { StaffConfirmDialogComponent } from './../../dialog-modals/staff-confirm-dialog/staff-confirm-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/Router';
import { DatabaseService } from '../../../services/database.service';
import { Staff } from '../../../models/Staff';
import {NgForm} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.css']
})
export class StaffEditComponent implements OnInit {
  @ViewChild('staffEditForm') form: any;
  fname: string;
  lname: string;
  position: number;
  suffix: string;
  staffEmail: string;
  toEditId: string;
  toEditMember: Staff;
  posOnStaff: string[];
  staffSlots: number[];

  constructor(private db: DatabaseService, private route: ActivatedRoute, public dialog: MatDialog,
    public confirm: MatSnackBar) {
    this.toEditId = '';
    this.toEditMember = {
      id: '',
      fname: '',
      lname: '',
      suffix: '',
      position: 0,
      staffEmail: ''
    };

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
    this.toEditId = this.route.snapshot.params['id'];
  console.log(this.toEditId);
   let staffSubscription = this.db.getStaffDoc(this.toEditId);
   staffSubscription.subscribe(
      (member) => {
        this.toEditMember = member;
        this.fname = this.toEditMember.fname;
        this.lname = this.toEditMember.lname;
        this.position = this.toEditMember.position;
        this.suffix = this.toEditMember.suffix;
        this.staffEmail = this.toEditMember.staffEmail;
       },
      (error) => { console.log(error); },
    );
  }

  submitEditStaff({value, valid}: {value: Staff, valid: boolean}) {
    if (valid) {
      value.id = this.toEditId;
      value.position = this.position;

      let dlogRef = this.dialog.open(StaffConfirmDialogComponent, {
        height: '400px',
        width: '400px',
        data: value
      });

      dlogRef.afterClosed().subscribe( returnConfirm => {
        if (returnConfirm.confirm) {
          this.db.updateStaff(value);
          this.confirm.open('Staff Member Updated', 'Close', {duration: 300});
        } else {
          this.confirm.open('Update Cancelled', 'Close', {duration: 300});
        }
      });

    } else {
      this.confirm.open('Invalid Form', 'Close', {duration: 300});
    }
  }

}
