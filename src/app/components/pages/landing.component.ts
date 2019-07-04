import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../../services/modules.service';
import { StorageService } from '../../services/storage.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styles: []
})
export class LandingComponent implements OnInit {

  public modules: Array< any > = [];
  public user: User;
  constructor(
    public _modules: ModulesService,
    public _store: StorageService,
    public _router: Router
  ) { }

  ngOnInit() {
    this.user = this._store.getData();
    this._modules.getModules()
    .subscribe(
        ( res: any ) => {
          this.modules = res.data;
        },

        ( err: any ) => {
          if ( !err.error.response ) {
            this._router.navigateByUrl('/login');
          }
        }
     );
  }

}
