import { EventConfirmDialogComponent } from './../../dialog-modals/event-confirm-dialog/event-confirm-dialog.component';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DatabaseService } from '../../../services/database.service';
import { Event } from '../../../models/Event';
import { Image } from '../../../models/Image';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ImageService } from '../../../services/image.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { PhotodialogComponent } from '../../photodialog/photodialog.component';
import {MediaMatcher} from '@angular/cdk/layout';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';


@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.css']
})
export class EventsFormComponent implements OnInit {
  @ViewChild('newEventForm') form: any;
  events: Event[];
  editId: string;
  editTitle: string;
  editStart: string;
  editEnd: string;
  editDescription: string;
  editPhotoPath: string;

  title: string;
  start: string;
  end: string;
  description: string;
  tagline: string;
  uploadImage: File;
  chosenExistingImage: Image;
  imageSet: boolean;
  showPhotoDialog: boolean;
  uploadSelected: boolean;
  usingExistingImage: boolean;
  editedEvent: Event;
  pdfups: File[];
  pdfurls: string[];
  pdfattaches: Image[];
  gridResponse: MediaQueryList;
  private gridResponseListener: () => void;

  newEvent: Event;
  constructor(
    private db: DatabaseService,
    private flashMessage: FlashMessagesService,
    private imgsvc: ImageService,
    public dialog: MatDialog,
    public confirm: MatSnackBar,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {

    this.title = '';
    this.start = '';
    this.end = '';
    this.description = '';
    this.uploadImage = null;
    this.imageSet = false;
    this.showPhotoDialog = false;
    this.uploadSelected = false;
    this.usingExistingImage = false;
    this.chosenExistingImage = {};
    this.pdfups = [];
    this.pdfurls = [];
    this.pdfattaches = [];
    this.gridResponse = media.matchMedia('(min-width: 700px)');
    this.gridResponseListener = () => changeDetectorRef.detectChanges();
    this.gridResponse.addListener(this.gridResponseListener);
  }

  ngOnInit() {
    this.db.getEvents().subscribe( events => {
      this.events = events;
    });
  }

  deleteEvent(e: any) {

    let dlogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      height: '250px',
    });
    dlogRef.afterClosed().subscribe( confirm => {
      if (confirm) {
        let sourceId = e.target.value;
        this.db.deleteEvent(e.target.value);
        this.confirm.open('Event Deleted', 'Close', {duration: 2000});
      } else {
        this.confirm.open('Delete Cancelled', 'Close', {duration: 2000});
      }
    });
  }



  clearForm() {
    this.start = '';
    this.end = '';
    this.title = '';
    this.description = '';
    this.form.resetForm();
  }

  setUploadTarget(e: any) {
    this.uploadImage = e.target.files[0];
    this.imageSet = true;
  }

  setUploadAttachments(e: any) {

    for (let i = 0; i < e.target.files.length; i++) {
      this.pdfups.push(e.target.files[i]);
    }

    for (let i = 0; i < this.pdfups.length; i++) {
      this.imgsvc.upload(this.pdfups[i].name, this.pdfups[i])
      .subscribe( (url) => {
        let uploadPDFRef = {
          name: this.pdfups[i].name,
          url: url,
          createdAt: new Date()
        };
        this.pdfurls.push(url);
        this.db.addImageRef(uploadPDFRef);
        this.db.getImageDoc('url', url).subscribe(img => {
          this.pdfattaches.push(img[0]);
        });
      });
    }
  }

  selectPhoto() {
    let dlogRef = this.dialog.open(PhotodialogComponent, {
      width: '800px',
      height: '550px'
    });

   dlogRef.afterClosed().subscribe( returnImg => {
     console.log(returnImg.image);
     this.db.getImageRef(returnImg.image).subscribe( incomingRef => {
      this.chosenExistingImage = incomingRef;
      this.usingExistingImage = true;
      console.log(this.chosenExistingImage);
     });
    });
  }

  resetSelectedImg() {
    this.chosenExistingImage = {};
    this.usingExistingImage = false;
  }

  confirmSubmission({value, valid}: {value: Event, valid: boolean}) {
    if (valid) {
      if (this.usingExistingImage) {
        value.image = this.chosenExistingImage;
      } else {
        value.image = this.uploadImage;
      }
          value.createdAt = new Date();
          if (this.pdfattaches) {
            value.attachments = this.pdfattaches;
          }
      let dlogRef = this.dialog.open(EventConfirmDialogComponent, {
        width: '500px',
        height: '500px',
        data: value
      });

      dlogRef.afterClosed().subscribe( returnConfirm => {
          if ( returnConfirm.confirm ) {
            if (this.usingExistingImage) {
              this.db.addEvent(value);
              this.resetSelectedImg();
              this.clearForm();
              this.confirm.open('Event Added Successfully', 'Close');
            } else {

                this.imgsvc.upload(this.uploadImage.name, this.uploadImage)
                .subscribe( res => {
                  console.log('upload image subscription reached');
                  let uploadRef = {
                        name: this.uploadImage.name,
                        url: res,
                        createdAt: new Date()
                        };
                        this.db.addImageRef(uploadRef);
                              this.db.getImageDoc('url', res).subscribe(
                                (img) => {
                                    value.image = img[0];
                                    if (this.pdfattaches) {
                                      value.attachments = this.pdfattaches;
                                    }
                                    this.db.addEvent(value);
                                    this.uploadSelected = false;
                                    this.uploadImage = null;
                                    this.clearForm();
                                    this.confirm.open('Event Added Successfully', 'Close', {duration: 3000});
                                },
                                (error) => { console.log(error);
                              });
                          });
              }

          } else {
            this.confirm.open('Submission Aborted', 'Close', {duration: 3000});
          }
       });
    }
  }
}
