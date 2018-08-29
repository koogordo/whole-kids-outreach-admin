import { EventsFormComponent } from './../../forms/events-form/events-form.component';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Event } from '../../../models/Event';


@Component({
  selector: 'app-event-confirm-dialog',
  templateUrl: './event-confirm-dialog.component.html',
  styleUrls: ['./event-confirm-dialog.component.css']
})
export class EventConfirmDialogComponent implements OnInit {
  toConfirm: Event;
  constructor( public dialogRef: MatDialogRef<EventsFormComponent>,
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
