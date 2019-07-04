import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlservice } from '../global/variables';
import { StorageService } from './storage.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _http: HttpClient,
    private _user: StorageService
  ) {
    console.log('COSNT AUTH');
   }

  login( user: any ): any {
    return  this._http.post( `${ urlservice }/login`, user );
  }

  isLogged() {
    return this._http.get(`${ urlservice }/login/${ this._user.getData().token }`);
  }
}
