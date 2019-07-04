import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlservice } from '../global/variables';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(
    private _http: HttpClient
  ) { }

  rhList( pag: number, filters?: any ) {
    return this._http.post( `${ urlservice }/user-list/${ pag }`, filters );
  }

  campaingList( pag: number, filters?: any ): Observable<any> {
    return this._http.post(`${ urlservice }/campaign-list/${ pag }`, filters );
  }
}
