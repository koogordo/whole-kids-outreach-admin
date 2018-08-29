import { ResponsiveService } from './../../services/responsive.service';
import { Component, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Image } from '../../models/Image';
import { ImageService } from '../../services/image.service';
import { DatabaseService } from '../../services/database.service';
import { Upload } from '../../services/upload';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import { FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import {MediaMatcher} from '@angular/cdk/layout';
declare var $: any;
@Component({
  selector: 'app-photo-library',
  templateUrl: './photo-library.component.html',
  styleUrls: ['./photo-library.component.css']
})
export class PhotoLibraryComponent implements OnInit {
  isFiles: boolean;
  currentUpload: Upload;
  selectedFiles: FileList;
  images: Image[];
  attachments: Image[];
  allIncomingFiles: Image[];
  uploadInput: any;
  isSelected: boolean;
  selectedPhotos: any[];
  uploadError: boolean;
  uploadFinish: boolean;
  pdfTest: RegExp = /[a-zA-Z0-9-_\\(\\)\\/]+\.pdf/;
  gridResponse: MediaQueryList;
  private gridResponseListener: () => void;
  numOfCols: number;
  constructor(
    private imageService: ImageService,
    public dialog: MatDialog,
    public confirm: MatSnackBar,
    changeDetectorRef: ChangeDetectorRef,
     media: MediaMatcher,
     private db: DatabaseService,
     private responder: ResponsiveService
    ) {
    this.isFiles = false;
    this.isSelected = false;
    this.selectedPhotos = [];
    this.gridResponse = media.matchMedia('(min-width: 700px)');
    this.gridResponseListener = () => changeDetectorRef.detectChanges();
    this.gridResponse.addListener(this.gridResponseListener);
    this.uploadError = false;
    this.uploadFinish = false;
    this.images = [];
    this.attachments = [];

   }

   ngOnInit() {
    this.db.getImageRefs().subscribe(imgs => {
      this.images = imgs;
    });
      this.numOfCols = this.responder.breakPoint();
      this.responder.screenQuery.subscribe((numCols) => {
      this.numOfCols = numCols;
    });
   }



   detectFiles(e: any) {
    this.selectedFiles = e.target.files;
    this.isFiles = true;
   }

   upload() {
     let files = this.selectedFiles;
     let uploadCount = 0;
     let filesIndex = _.range(files.length);
    _.each(filesIndex, (index) => {
      let error = false;
      let finished = false;
      this.imageService.upload(this.selectedFiles[index].name, this.selectedFiles[index]).subscribe(
         url => {
          let uploadRef = {
            name: this.selectedFiles[index].name,
            url: url,
            createdAt: new Date()
           };
           console.log(uploadRef);
           this.db.addImageRef(uploadRef);
          },
       );
     });
     this.isFiles = false;
   }


   deletePhoto() {
    this.imageService.deletePhoto(this.selectedPhotos);
    this.selectedPhotos = [];
    this.isSelected = false;
   }

   toggleSelected(e: any) {
     let img = {
       'name': e.source.name,
       'key': e.source.value
     };
     let selIndex = _.range(this.selectedPhotos.length);
     let duplicate = false;
     _.each(selIndex, idx => {
       if (img.key === this.selectedPhotos[idx].key) {
         this.selectedPhotos.splice(idx, 1);
         duplicate = true;
         return;
       }
     });
     if (!duplicate) {
      this.selectedPhotos.push(img);
    }
     if (this.selectedPhotos.length === 0) {
       this.isSelected = false;
     } else {
       this.isSelected = true;
     }
     console.log(this.selectedPhotos);
   }

   initDelete() {
      let deleteConfirmation: any = false;
      let dlogRef = this.dialog.open(DialogBoxComponent, {
        width: '250px',
        height: '300px',
      });
      deleteConfirmation = dlogRef.afterClosed().subscribe( result => {
        if (result.confirm) {
          this.deletePhoto();
          this.confirm.open('Photo(s) Deleted', 'Close', {duration: 2000});
        } else {
          this.confirm.open('Delete Cancelled', 'Close', {duration: 2000});
          return;
        }
      });
   }
  }



