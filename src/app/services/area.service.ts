import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlservice } from '../global/variables';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(
    private _http: HttpClient
  ) { }

  list(): Observable<any> {
    return this._http.get( `${ urlservice }/areas` );
  }
}
