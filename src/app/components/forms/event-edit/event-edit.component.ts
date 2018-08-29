import { ImageService } from './../../../services/image.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DatabaseService } from '../../../services/database.service';
import { Event } from '../../../models/Event';
import { Image } from '../../../models/Image';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/Router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { PhotodialogComponent } from '../../photodialog/photodialog.component';
import * as _ from 'lodash';
import { EventConfirmDialogComponent } from '../../dialog-modals/event-confirm-dialog/event-confirm-dialog.component';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  @ViewChild('editEventForm')
  toEditId: string;
  toEditEvent: Event;
  title: string;
  start: string;
  end: string;
  tagline: string;
  description: string;
  image: Image;
  attaches: Image[];
  uploadAttachments: Image[];

  hasImage: boolean;

  constructor(
    private db: DatabaseService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public confirm: MatSnackBar,
  private imgsvc: ImageService) {
      this.toEditId = '';
      this.toEditEvent = {
          title: '',
          start: '',
          end: '',
          tagline: '',
          description: ''
        };
        this.image = {};
        this.hasImage = false;
        this.uploadAttachments = [];
     }

  ngOnInit() {
   this.toEditId = this.route.snapshot.params['id'];
   let eventSubscription = this.db.getDoc(this.toEditId);
   eventSubscription.subscribe(
      (event) => {
        this.toEditEvent = event;
        if (_.isEmpty(event.image)) {
           this.hasImage = false;
        } else {
           this.hasImage = true;
        }
        this.setFormFields(this.toEditEvent);
       },
      (error) => { console.log(error); },
    );
  }

  setFormFields (editEvent: Event) {
      this.title = editEvent.title;
      this.start = editEvent.start;
      this.end = editEvent.end;
      this.description = editEvent.description;
      this.tagline = editEvent.tagline;
      this.image = editEvent.image;
      this.attaches = editEvent.attachments;
  }

  removeImage() {
    this.image = {};
    this.hasImage = false;
  }

  removeAttach(e: any) {
    let removeUrl = e.target.previousElementSibling.href;
    for (let i = 0; i < this.attaches.length; i++) {
      if (removeUrl === this.attaches[i].url) {
        this.attaches.splice(i, 1);
      }
    }
  }

  onSubmit({value, valid}: {value: any, valid: boolean}) {
    if (valid) {
      value.id = this.toEditId;
      this.image === {} ? this.hasImage = false : value.image = this.image;
      this.attaches.length > 0 ? value.attachments = this.attaches : value.attachments = [];

      let dlogRef = this.dialog.open(EventConfirmDialogComponent, {
        height: '600px',
        width: '500px',
        data: value
      });

      dlogRef.afterClosed().subscribe( returnConfirm => {
        if (returnConfirm.confirm) {
          this.db.updateEvent(value);
          this.confirm.open('Event Successfully Updated', 'Close', {duration: 3000});
        } else {
          this.confirm.open('Update Cancelled', 'Close', {duration: 3000});
          this.imgsvc.deletePhoto(this.uploadAttachments);
        }
      });
    } else {
      this.confirm.open('Invalid Form', 'Close', {duration: 3000});
    }
  }

  selectImage() {
    let dlogRef = this.dialog.open(PhotodialogComponent, {
      width: '700px',
      height: '700px'
    });

   dlogRef.afterClosed().subscribe( returnImg => {
    this.db.getImageRef(returnImg.image).subscribe( incomingRef => {
      this.image = incomingRef;
      this.hasImage = true;
     });
    });
  }


  uploadAttachment(e: any) {
    this.uploadAttachments = e.target.files;
    _.each(this.uploadAttachments, (attach) => {
      this.imgsvc.upload(attach.name, attach).subscribe(url => {
        let uploadRef = {
          name: attach.name,
          url: url,
          createdAt: new Date()
         };
         this.db.addImageRef(uploadRef);

         this.db.getImageDoc('url', url).subscribe( attachRef => {
           _.each(attachRef, (newAttachRef) => {
              this.attaches.push(newAttachRef);
           });
         });
      });
    });

  }

  selectAttachment() {
    let dlogRef = this.dialog.open(PhotodialogComponent, {
      width: '700px',
      height: '700px'
    });

   dlogRef.afterClosed().subscribe( returnImg => {
    this.db.getImageRef(returnImg.image).subscribe( incomingRef => {
      this.attaches.push(incomingRef);
     });
    });
  }

}

