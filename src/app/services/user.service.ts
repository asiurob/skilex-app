import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlservice } from '../global/variables';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient,
    private _storage: StorageService
  ) { }

  list(): Observable<any> {
    return this._http.get( `${ urlservice }/users` );
  }
  create( data: FormData ): Observable<any> {
    return this._http.post(`${ urlservice }/users`, data );
  }

  update( id: string, data: any ): Observable<any> {
    return this._http.put(`${ urlservice }/users/${ id }`, data );
  }

  activeToggle( id: string, param: string ): Observable<any> {
    const obj = {
      token : this._storage.getToken(),
      user  : this._storage.getData().id,
      data  : param };

    return this._http.put( `${ urlservice }/users/${ id }`, obj );
  }

  getBoss( val: any ): Observable<any> {
    return this._http.get(`${ urlservice }/boss/${ val }`);
  }

  getOne( id: string ): Observable<any> {
    return this._http.get( `${ urlservice }/users/${ id }` );
  }

  getChanges( id: string ): Observable<any> {
    return this._http.get( `${ urlservice }/user-changes/${ id }` );
  }
}
