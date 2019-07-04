import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LoginService } from '../login.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLogged = false;

  constructor( private _login: LoginService,
               private _router: Router,
               private _session: StorageService) {}

  canActivate(): Observable<boolean | UrlTree>| boolean | UrlTree {

    return this._login.isLogged()
    .pipe(
      map( () => true ),
      catchError( () => {
          this._session.deleteData();
          return of(this._router.createUrlTree(['/login']));
        }  
      ) )

  }
}