import { ProgramConfirmDialogComponent } from './../../dialog-modals/program-confirm-dialog/program-confirm-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Program } from '../../../models/Program';
import { Image } from '../../../models/Image';
import { PhotodialogComponent } from '../../photodialog/photodialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { ImageService } from '../../../services/image.service';
import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute, Params } from '@angular/Router';
import * as _ from 'lodash';


@Component({
  selector: 'app-program-edit',
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.css']
})
export class ProgramEditComponent implements OnInit {
  @ViewChild('programEditForm') form: any;
  toEditId: string;
  title: string;
  category: string;
  description: string;
  featured: boolean;
  images: Image[];
  tagline: string;
  featuredimg: Image;
  forwho: string;
  when: string;
  howtoreg: string;

  centerKids: Program[];
  homeVisit: Program[];
  centerFamily: Program[];
  allProgs: Program[];
  featuredprog: Program;
  featuredSet: boolean;


  constructor(
    private imgsvc: ImageService,
    public dialog: MatDialog,
    private db: DatabaseService,
    private route: ActivatedRoute,
    public confirm: MatSnackBar) {

      this.title = '';
      this.category = '';
      this.description = '';
      this.tagline = '';
      this.featuredimg = {};
      this.images = [];
      this.featured = true;
      this.when = '';
      this.forwho = '';
      this.howtoreg = '';

    }

  ngOnInit() {
    this.toEditId = this.route.snapshot.params['id'];
    this.db.getProgramRef(this.toEditId).subscribe(prog => {
      this.title = prog.title;
      this.category = prog.category;
      this.description = prog.description;
      this.tagline = prog.tagline;
      this.images = prog.images;
      this.featuredimg = prog.featuredimg;
      this.featured = prog.featured;
      this.forwho = prog.forwho;
      this.when = prog.when;
      this.howtoreg = prog.howtoreg;
      if (!_.isEmpty(this.featuredimg)) {
        this.featuredSet = true;
      } else {
        this.featuredSet = false;
      }
    });
  }

  selectImages() {

    let dlogRef = this.dialog.open(PhotodialogComponent, {
      width: '500px',
      height: '500px'
    });

   dlogRef.afterClosed().subscribe( returnImg => {
     console.log(returnImg.image);
      this.db.getImageRef(returnImg.image).subscribe( incomingRef => {
        this.images.push(incomingRef);
        console.log(this.images);
     });
    });
  }

  removeImg(id: string) {
    for (let i = 0; i < this.images.length; i++) {
      if (id === this.images[i].$id) {
        this.images.splice(i, 1);
        break;
      }
    }
  }

  editProgram({value, valid}: {value: Program, valid: boolean}) {
    if (valid) {
      value.$id = this.toEditId;
      value.images = this.images;
      value.featuredimg = this.featuredimg;
      value.category = this.category;

      let dlogRef = this.dialog.open(ProgramConfirmDialogComponent, {
        height: '500px',
        width: '500px',
        data: value
      });

      dlogRef.afterClosed().subscribe( returnConfirm => {
        if (returnConfirm.confirm) {
          this.db.updateProgram(value);
          this.confirm.open('Program Successfully Updated', 'Close', {duration: 3000});
        } else {
          this.confirm.open('Update Cancelled', 'Close', {duration: 3000});
        }
      });
    } else {
      this.confirm.open('Invalid Form', 'Close', {duration: 3000});
    }

  }

  selectFeaturedImg() {
    let dlogRef = this.dialog.open(PhotodialogComponent, {
      width: '500px',
      height: '500px'
    });

   dlogRef.afterClosed().subscribe( returnImg => {
     console.log(returnImg.image);
      this.db.getImageRef(returnImg.image).subscribe( incomingRef => {
        this.featuredimg = incomingRef;
        this.featuredSet = true;
     });
    });
  }

  removeFeaturedImg() {
    this.featuredimg = {};
    this.featuredSet = false;
  }

}
