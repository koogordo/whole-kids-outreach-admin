import { BoardMembersComponent } from './../../forms/board-members/board-members.component';
import { BoardMember } from './../../../models/BoardMember';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'app-board-confirm-dialog',
  templateUrl: './board-confirm-dialog.component.html',
  styleUrls: ['./board-confirm-dialog.component.css']
})
export class BoardConfirmDialogComponent implements OnInit {
  toConfirm: BoardMember;
  constructor(public dialogRef: MatDialogRef<BoardMembersComponent>,
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
