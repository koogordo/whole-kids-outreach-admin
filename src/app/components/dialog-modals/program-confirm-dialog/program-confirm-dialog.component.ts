import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Program } from '../../../models/Program';
import { ProgramsFormComponent } from '../../forms/programs-form/programs-form.component';


@Component({
  selector: 'app-program-confirm-dialog',
  templateUrl: './program-confirm-dialog.component.html',
  styleUrls: ['./program-confirm-dialog.component.css']
})
export class ProgramConfirmDialogComponent implements OnInit {
  toConfirm: Program;
  constructor(public dialogRef: MatDialogRef<ProgramsFormComponent>,
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
