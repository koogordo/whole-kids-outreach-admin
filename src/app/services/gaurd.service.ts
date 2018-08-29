import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/Router';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class GaurdService implements CanActivate {

  constructor( private afAuth: AngularFireAuth, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.map(auth => {
      if (auth) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    });
  }

}
