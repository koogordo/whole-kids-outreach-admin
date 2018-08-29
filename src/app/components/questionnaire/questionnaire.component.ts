import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { Router } from '@angular/Router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  @ViewChild('questionnaire') form: any;
  age: string;
  occupation: string;
  gender: string;
  exp: string;
  testerCollection: AngularFirestoreCollection<any>;
  userDone: boolean;
  constructor(private afs: AngularFirestore, private conf: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.testerCollection = this.afs.collection('tester');
    this.userDone = false;
  }

  onSubmit({value, valid}: {value: any, valid: boolean}) {
    if (valid) {
      value.createdAt = new Date();
      value.age = this.age;
      value.exp = this.exp;
      this.testerCollection.add(value);
      this.conf.open('Questionnaire Submitted. You may now start test', 'Close', {duration: 3000});
      this.form.resetForm();
      this.router.navigate(['events-form']);
      this.userDone = true;
    } else {
      this.conf.open('Please complete missing info', 'Close', {duration: 3000});
    }
  }

}
