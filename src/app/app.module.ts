
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterModule, Routes } from '@angular/Router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MaterialModule } from './material.module';
import {MediaMatcher} from '@angular/cdk/layout';



import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PagesComponent } from './components/pages/pages.component';
import { PhotoLibraryComponent } from './components/photo-library/photo-library.component';
import { HomeFormComponent } from './components/home-form/home-form.component';
import { ImpactFormComponent } from './components/forms/impact-form/impact-form.component';
import { ProgramsFormComponent } from './components/forms/programs-form/programs-form.component';
import { EventsFormComponent } from './components/forms/events-form/events-form.component';
import { DatabaseService } from './services/database.service';
import { ImageService } from './services/image.service';
import { PhotoExchangeService } from './services/photo-exchange.service';
import { EventEditComponent } from './components/forms/event-edit/event-edit.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { PhotodialogComponent } from './components/photodialog/photodialog.component';
import { BoardMembersComponent } from './components/forms/board-members/board-members.component';
import { BoardEditComponent } from './components/forms/board-edit/board-edit.component';
import { ProgramEditComponent } from './components/forms/program-edit/program-edit.component';
import { SafePipe } from './pipes/safe.pipe';
import { ResponsiveService } from './services/responsive.service';
import { StaffComponent } from './components/forms/staff/staff.component';
import { StaffEditComponent } from './components/forms/staff-edit/staff-edit.component';
import { EventConfirmDialogComponent } from './components/dialog-modals/event-confirm-dialog/event-confirm-dialog.component';
import { StaffConfirmDialogComponent } from './components/dialog-modals/staff-confirm-dialog/staff-confirm-dialog.component';
import { BoardConfirmDialogComponent } from './components/dialog-modals/board-confirm-dialog/board-confirm-dialog.component';
import { ProgramConfirmDialogComponent } from './components/dialog-modals/program-confirm-dialog/program-confirm-dialog.component';
import { GaurdService } from './services/gaurd.service';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';


const appRoutes: Routes = [
  {path: 'programs-form/program-edit/:id', component: ProgramEditComponent, canActivate: [GaurdService]},
  {path: 'programs-form', component: ProgramsFormComponent, canActivate: [GaurdService]},
  {path: 'impact-form', component: ImpactFormComponent, canActivate: [GaurdService]},
  {path: 'events-form/event-edit/:id', component: EventEditComponent, canActivate: [GaurdService]},
  {path: 'event-edit/:id', component: EventEditComponent, canActivate: [GaurdService]},
  {path: 'events-form', component: EventsFormComponent, canActivate: [GaurdService]},
  {path: 'photo-library', component: PhotoLibraryComponent, canActivate: [GaurdService]},
  {path: 'board-members/board-edit/:id', component: BoardEditComponent, canActivate: [GaurdService]},
  {path: 'board-members', component: BoardMembersComponent, canActivate: [GaurdService]},
  {path: 'staff/staff-edit/:id', component: StaffEditComponent, canActivate: [GaurdService]},
  {path: 'staff', component: StaffComponent, canActivate: [GaurdService]},
  {path: 'questionnaire', component: QuestionnaireComponent, canActivate: [GaurdService]},
  {path: '', component: DashboardComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    PagesComponent,
    PhotoLibraryComponent,
    HomeFormComponent,
    ImpactFormComponent,
    ProgramsFormComponent,
    EventsFormComponent,
    EventEditComponent,
    DialogBoxComponent,
    PhotodialogComponent,
    BoardMembersComponent,
    BoardEditComponent,
    ProgramEditComponent,
    SafePipe,
    StaffComponent,
    StaffEditComponent,
    EventConfirmDialogComponent,
    StaffConfirmDialogComponent,
    BoardConfirmDialogComponent,
    ProgramConfirmDialogComponent,
    QuestionnaireComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true}),
    AngularFireModule.initializeApp(environment.firebase, 'WKO-app'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    MaterialModule,
    AngularFireStorageModule

  ],
  entryComponents: [
    DialogBoxComponent,
    PhotodialogComponent,
    EventConfirmDialogComponent,
    StaffConfirmDialogComponent,
    BoardConfirmDialogComponent,
    ProgramConfirmDialogComponent
  ],
  providers: [
    DatabaseService,
    ImageService,
    MediaMatcher,
    PhotoExchangeService,
    ResponsiveService,
    GaurdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
