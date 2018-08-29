import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import { Http, Response } from '@angular/http';
import { Image } from '../models/Image';
import { FirebaseApp } from 'angularfire2';
import { Upload } from './upload';
import 'firebase/storage';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase';
import { async } from '@angular/core/testing';
import * as _ from 'lodash';
import { DatabaseService } from './database.service';


@Injectable()
export class ImageService {
  uploadModel: Image;
  imageCollection: AngularFirestoreCollection<Image>;
  images: Observable<Image[]>;
  success: Promise<boolean>;
  recentUploadURL: string;
  imageRefs: any[];

  constructor(private fireStorage: AngularFireStorage, private afs: AngularFirestore, private db: DatabaseService) {
    this.imageCollection = this.afs.collection('images');
    this.success = null;
    this.recentUploadURL = '';
    this.db.getImageRefs().subscribe( refs => {
      this.imageRefs = refs;
    });

  }

   upload(path, file): Observable<string> {
    // Upload image to storage
    const uploadfile = file;
    const uploadPath = path;
    let _url = '';
    const task = this.fireStorage.upload(path, file);
    return task.downloadURL();
  }

  uploadPDF(path, file): Observable<string> {
    // Upload image to storage
    let pdfpath = 'event_attachments/';
    const uploadfile = file;
    const uploadPath = path;
    let _url = '';
    const task = this.fireStorage.upload(pdfpath + path, file);
    return task.downloadURL();
  }


  deletePhoto(deleteThese: any) {
    console.log(deleteThese);
   let selIndex = _.range(deleteThese.length);
   let wherePicExists = [];
   _.each(selIndex, idx => {
          for (let ref of this.imageRefs){
            if (ref.name == deleteThese[idx].name ) {

              this.db.deleteImageRef(ref.$id);
            }
          }
          this.fireStorage.ref(deleteThese[idx].name).delete().subscribe( () => {
    });
   });
  }
}


