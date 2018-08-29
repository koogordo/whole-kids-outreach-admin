
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';


@NgModule ({
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatRadioModule
  ],
  exports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatRadioModule
  ]
})
export class MaterialModule {}
