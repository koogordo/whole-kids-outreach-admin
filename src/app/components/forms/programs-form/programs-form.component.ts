import { Component, OnInit, ViewChild, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Program } from '../../../models/Program';
import { Image } from '../../../models/Image';
import { PhotodialogComponent } from '../../photodialog/photodialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { ImageService } from '../../../services/image.service';
import { DatabaseService } from '../../../services/database.service';
import * as _ from 'lodash';
import {MediaMatcher} from '@angular/cdk/layout';
import { ResponsiveService } from '../../../services/responsive.service';
import { ProgramConfirmDialogComponent } from '../../dialog-modals/program-confirm-dialog/program-confirm-dialog.component';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';


declare var $: any;
@Component({
  selector: 'app-programs-form',
  templateUrl: './programs-form.component.html',
  styleUrls: ['./programs-form.component.css']
})
export class ProgramsFormComponent implements OnInit {
  @ViewChild('programForm') form: any;
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
  featuredImgSet: boolean;
  hasFeatured: boolean;
  gridResponse: MediaQueryList;
  featuredPhotoResponse: MediaQueryList;
  numOfCols: any;
  private gridResponseListener: () => void;
  private featuredPhotoResponseListener: () => void;
  constructor(
    private imgsvc: ImageService,
    public dialog: MatDialog,
    private db: DatabaseService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private responder: ResponsiveService,
    private confirm: MatSnackBar) {
      this.images = [];
      this.featured = false;
      this.homeVisit = [];
      this.centerFamily = [];
      this.centerKids = [];
      this.featuredSet = false;
      this.featuredImgSet = false;
      this.gridResponse = media.matchMedia('(min-width: 700px)');
      this.featuredPhotoResponse = this.media.matchMedia('(min-width: 995px)');
      this.gridResponseListener = () => this.changeDetectorRef.detectChanges();
      this.gridResponse.addListener(this.gridResponseListener);
      this.featuredPhotoResponse.addListener(this.gridResponseListener);
   }

  ngOnInit() {
    this.numOfCols = this.responder.breakPoint();
    this.db.getPrograms().subscribe( progs => {
      this.allProgs = progs;
      for (let prog of this.allProgs) {
        if (prog.featured) {
          this.featuredSet = true;
          this.featuredprog = prog;
        }
      }
    });
    this.responder.screenQuery.subscribe((numCols) => {
      this.numOfCols = numCols;
    });

  }



  submitNewProgram({value, valid}: {value: Program, valid: boolean}) {
    if (valid) {
      value.category = this.category;
      value.images = this.images;
      value.featuredimg = this.featuredimg;
      this.db.addProgram(value);
      this.cleanForm();
    } else {
      console.log('form invalid');
    }

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

  selectFeaturedImg() {
    let dlogRef = this.dialog.open(PhotodialogComponent, {
      width: '500px',
      height: '500px'
    });

   dlogRef.afterClosed().subscribe( returnImg => {
     console.log(returnImg.image);
      this.db.getImageRef(returnImg.image).subscribe( incomingRef => {
        this.featuredimg = incomingRef;
        this.featuredImgSet = true;
     });
    });
  }

  removeFeaturedImg() {
    this.featuredImgSet = false;
    this.featuredimg = {};
  }

  removeImg(id: string) {
    for (let i = 0; i < this.images.length; i++) {
      if (id === this.images[i].$id) {
        this.images.splice(i, 1);
        break;
      }
    }
  }

  deleteProg(e: any) {

    let dlogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      height: '250px',
    });

    dlogRef.afterClosed().subscribe( confirm => {
      if (confirm) {
        let id = e.target.value;
        this.db.deleteProgram(id);
      for (let i = 0; i < this.allProgs.length; i++) {
        if (id === this.allProgs[i].$id) {
          if (this.allProgs[i].featured) {
          this.featuredSet = false;
          this.featuredprog = {
            $id: '',
            title: '',
            description: '',
            tagline: '',
            featured: false,
            images: []
            };
          }
          this.allProgs.splice(i, 1);
          break;
        }
      }
        this.confirm.open('Program Deleted', 'Close', {duration: 2000});
      } else {
        this.confirm.open('Delete Cancelled', 'Close', {duration: 2000});
      }
    });
  }

  unsetFeatured() {
    let tempProg = {
      title: this.featuredprog.title,
      description: this.featuredprog.description,
      images: this.featuredprog.images,
      tagline: this.featuredprog.tagline,
      category: this.featuredprog.category,
      featuredimg: this.featuredprog.featuredimg,
      featured: false
    };

    this.db.updateProgram(tempProg);
    this.featuredSet = false;
    this.featuredprog = null;
  }

  cleanForm () {
    this.title = '';
    this.category = '';
    this.description = '';
    this.featured = false;
    this.images = [];
    this.tagline = '';
    this.featuredimg = {};
    this.featuredImgSet = false;
    this.form.resetForm();
  }


  confirmSubmission({value, valid}: {value: Program, valid: boolean}) {
    if (valid) {
      value.category = this.category;
      value.images = this.images;
      value.featuredimg = this.featuredimg;
      let dlogRef = this.dialog.open(ProgramConfirmDialogComponent, {
        height: '500px',
        width: '700px',
        data: value
      });

      dlogRef.afterClosed().subscribe( returnConfirm => {
        if (returnConfirm.confirm) {
          this.db.addProgram(value);
          this.cleanForm();
          this.confirm.open('Program Added', 'Close', { duration: 3000});
        } else {
          this.confirm.open('Submission Aborted', 'Close', { duration: 3000});
        }
      });
    } else {
      this.confirm.open('Invalid Form', 'Close', { duration: 3000});
    }
  }
}



