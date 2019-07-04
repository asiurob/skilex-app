import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlservice } from '../global/variables';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor(
    private _http: HttpClient,
    private _user: StorageService
  ) { }

  getModules(): Observable<any> {
    return this._http.get(`${ urlservice }/modules/${ this._user.getData().token }/active/`);
  }
}
