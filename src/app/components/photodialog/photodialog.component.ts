import { EventsFormComponent } from './../forms/events-form/events-form.component';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DatabaseService } from '../../services/database.service';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/Image';

@Component({
  selector: 'app-photodialog',
  templateUrl: './photodialog.component.html',
  styleUrls: ['./photodialog.component.css']
})
export class PhotodialogComponent implements OnInit {
  images: Image[];
  returnImage: Image;
  pdfTest: RegExp;
  constructor(
    public dialogRef: MatDialogRef<EventsFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private afs: DatabaseService,
  ) {   this.pdfTest = /[a-zA-Z0-9-_\\(\\)\\/]+\.pdf/;
        this.images = [];
    }


  ngOnInit() {
     this.afs.getImageRefs().subscribe( imgRefs => {
       for (let ref of imgRefs) {
         if (!this.pdfTest.test(ref.name)) {
           this.images.push(ref);
         }
       }
     });
  }

  setImage(e: any) {
   this.returnImage = e.target.value;
   this.dialogRef.close({ image: this.returnImage});
  }




}
