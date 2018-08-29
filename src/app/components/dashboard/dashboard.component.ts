import { AngularFireAuth } from 'angularfire2/auth';
import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/Router';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 mobileQuery: MediaQueryList;
 desktopQuery: MediaQueryList;
 private mobileQueryListener: () => void;
 private desktopQueryListener: () => void;
 logerr: string;
 private loggedIn: boolean;
 email: string;
 pwd: string;
 user: string;

 constructor(
   changeDetectorRef: ChangeDetectorRef,
   media: MediaMatcher,
   private afAuth: AngularFireAuth,
   private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.desktopQuery = media.matchMedia('(min-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.desktopQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.desktopQuery.addListener(this.desktopQueryListener);
    console.log(this.desktopQuery.matches);
    this.loggedIn = false;
  }

  ngOnInit() {
    this.getAuth().subscribe( auth => {
      if (auth) {
        this.loggedIn = true;
        this.user = auth.email;
      } else {
        this.loggedIn = false;
      }
    });
  }

  login(email: string, pwd: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, pwd).then(
      confirm => {
        this.loggedIn = true;
        this.getAuth().subscribe( auth => {
          if (auth.email === 'test_user@test.com') {
            this.router.navigate(['questionnaire']);
          } else {
            this.router.navigate(['events-form']);
          }

        });
       }).catch(
      err => {
        this.loggedIn = false;
        this.logerr = err.message;
         }
    );
  }

  logout() {
    this.afAuth.auth.signOut().then(
      confirm => {
        this.loggedIn = false;
        this.router.navigate(['/']);
      }
    ).catch(
      err => { console.log(err); }
    );
  }

  getAuth() {
    return this.afAuth.authState.map( auth => auth);
  }

}
