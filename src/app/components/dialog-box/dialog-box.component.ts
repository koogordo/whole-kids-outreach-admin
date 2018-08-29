import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PhotoLibraryComponent } from '../photo-library/photo-library.component';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PhotoLibraryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  confirm() {
    this.dialogRef.close({ confirm: true });
  }

}
