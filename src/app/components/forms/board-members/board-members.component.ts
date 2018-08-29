import { DialogBoxComponent } from './../../dialog-box/dialog-box.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BoardMember } from '../../../models/BoardMember';
import { Image } from '../../../models/Image';
import { DatabaseService } from '../../../services/database.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { BoardConfirmDialogComponent } from '../../dialog-modals/board-confirm-dialog/board-confirm-dialog.component';

@Component({
  selector: 'app-board-members',
  templateUrl: './board-members.component.html',
  styleUrls: ['./board-members.component.css']
})
export class BoardMembersComponent implements OnInit {
  @ViewChild('boardMemberForm') form: any;
  fname: string;
  lname: string;
  position: number;
  employer: string;
  occupation: string;
  image: Image;
  board: BoardMember[];
  posOnBoard: number;
  presSet: boolean;
  vicePresSet: boolean;
  treasurerSet: boolean;
  recordSecSet: boolean;
  boardPos: string[];
  boardPosNums: number[];
  showAdd: boolean;
  newBoardPos: string;
  newBoardNum: number;
  constructor(private db: DatabaseService, public dialog: MatDialog,
    public confirm: MatSnackBar) {
    this.presSet = false;
    this.vicePresSet = false;
    this.treasurerSet = false;
    this.recordSecSet = false;
    this.boardPos = ['Board President', 'Board Vice President', 'Board Treasurer', 'Board Recording Secretary', 'Board Member'];
    this.boardPosNums = [0, 1, 2, 3, 4];
    this.showAdd = false;
   }

  ngOnInit() {
    this.db.getBoardMembers().subscribe( members => {
      this.board = members;
      for (let mem of this.board) {
        if (mem.position == 0) {
          this.presSet = true;
          console.log(this.presSet);
        }
        if (mem.position == 1) {
          this.vicePresSet = true;
          console.log(this.vicePresSet);
        }
        if (mem.position == 2) {
          this.treasurerSet = true;
          console.log(this.treasurerSet);
        }
        if (mem.position == 3) {
          this.recordSecSet = true;
          console.log(this.recordSecSet);
        }
      }

    });
  }

  submitNewMember({value, valid}: {value: BoardMember, valid: boolean}) {
    console.log(value);
    if (valid) {
      value.position = this.posOnBoard;

      let dlogRef = this.dialog.open(BoardConfirmDialogComponent, {
        height: '400px',
        width: '400px',
        data: value
      });

      dlogRef.afterClosed().subscribe(returnConfirm => {
        if (returnConfirm.confirm) {
          this.db.addBoardMember(value);
          this.form.resetForm();
          this.confirm.open('Board Member Added', 'Close', {duration: 3000});
        } else {
          this.confirm.open('Submission Cancelled', 'Close', {duration: 3000});
        }
      });

    } else {
      this.confirm.open('Invalid Form', 'Close', {duration: 3000});
    }
  }

  deleteMember(e: any) {

    let dlogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      height: '250px',
    });
    dlogRef.afterClosed().subscribe( confirm => {
      if (confirm) {
        let sourceId = e.target.value;
        this.db.deleteBoardmember(sourceId);
        this.confirm.open('Board Member Deleted', 'Close', {duration: 2000});
      } else {
        this.confirm.open('Delete Cancelled', 'Close', {duration: 2000});
      }
    });
  }

  addNewPos(pos, order) {
    order = parseInt(order, 10);
    this.boardPos.splice(order, 0, pos);
    this.boardPosNums.splice(order, 0, order);

    for (let i = order + 1; order < this.boardPosNums.length; i++) {
      console.log('looping...');
      this.boardPosNums.splice(i, 1, this.boardPosNums[i] + 1);
    }

    console.log(this.boardPos);
    console.log(this.boardPosNums);
  }


}
