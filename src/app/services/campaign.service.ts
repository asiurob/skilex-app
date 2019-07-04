import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlservice } from '../global/variables';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(
    private _http: HttpClient
  ) { }

  create( data: FormData ): Observable<any> {
    return this._http.post( `${ urlservice }/campaigns`, data );
  }

  getOne( id: string ): Observable<any> {
    return this._http.get( `${ urlservice }/campaigns/${ id }` );
  }

  update( id: string, obj: any ): Observable<any> {
    return this._http.put( `${ urlservice }/campaigns/${id}`, obj );
  }

  getChanges( id: string ): Observable<any> {
    return this._http.get( `${ urlservice }/campaign-changes/${ id }` );
  }
}
