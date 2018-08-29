import { BoardConfirmDialogComponent } from './../../dialog-modals/board-confirm-dialog/board-confirm-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/Router';
import { DatabaseService } from '../../../services/database.service';
import { BoardMember } from '../../../models/BoardMember';
import {NgForm} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-board-edit',
  templateUrl: './board-edit.component.html',
  styleUrls: ['./board-edit.component.css']
})
export class BoardEditComponent implements OnInit {
  @ViewChild('editMemberForm') form: any;
  fname: string;
  lname: string;
  position: number;
  occupation: string;
  employer: string;
  toEditId: string;
  toEditMember: BoardMember;
  constructor(private db: DatabaseService, private route: ActivatedRoute, public dialog: MatDialog,
    public confirm: MatSnackBar) {
    this.toEditId = '';
    this.toEditMember = {
      $id: '',
      fname: '',
      lname: '',
      position: 0,
      occupation: '',
      employer: ''
    };
  }

  ngOnInit() {
  this.toEditId = this.route.snapshot.params['id'];
  console.log(this.toEditId);
   let boardSubscription = this.db.getBoardDoc(this.toEditId);
   boardSubscription.subscribe(
      (member) => {
        this.toEditMember = member;
        this.fname = this.toEditMember.fname;
        this.lname = this.toEditMember.lname;
        this.position = this.toEditMember.position;
        this.occupation = this.toEditMember.occupation;
        this.employer = this.toEditMember.employer;
       },
      (error) => { console.log(error); },
    );
  }

  setFormFields(bm: BoardMember) {
    console.log(bm);

  }

  editMember({value, valid}: {value: BoardMember, valid: boolean}) {
    if (valid) {
      value.$id = this.toEditId;

      let dlogRef = this.dialog.open(BoardConfirmDialogComponent, {
        height: '500px',
        width: '500px',
        data: value
      });

      dlogRef.afterClosed().subscribe( returnConfirm => {
        if (returnConfirm.confirm) {
          this.db.updateMember(value);
          this.confirm.open('Board Member Updated Successfully', 'Close', {duration: 3000});
        } else {
          this.confirm.open('Update Cancelled', 'Close', {duration: 3000});
        }
      });
    } else {
      this.confirm.open('Invalid Form', 'Close', {duration: 3000});
    }

  }

}
