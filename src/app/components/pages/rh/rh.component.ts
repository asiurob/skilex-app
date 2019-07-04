import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/services/lists.service';
import { UserService } from '../../../services/user.service';
import { urlservice } from '../../../global/variables';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrls: []
})
export class RhComponent implements OnInit {

  pag = 0;
  users: Array<any>;
  pages = [];
  url: string;
  constructor(
    public list: ListsService,
    public _user: UserService,
    public toast: ToastrService,
    public _router: Router,
    public _storage: StorageService
  ) { }

  ngOnInit() {
    this.url = urlservice;
    this.list.rhList( this.pag )
    .subscribe(
      ( res: any ) => {
        this.users = res.data;
        this.pages = Array( Math.ceil( res.count / 20 ) ).fill(1);
      },
      ( err: any ) => this.toast.error('Ocurrió un error')
    )
  }


  showUser( id: string ) {
    this._router.navigateByUrl(`/rh/${ id }`);
  }

  update( user: any, el: any ) {
    const key  = el.getAttribute('name');
    const last = user[ key ];
    const now  = el.value;
    const tag  = el.getAttribute('data-tag');

    if ( last !== now ) {
      const obj = {
        data: [ key, last, now, tag ],
        id: user._id,
        user: this._storage.getData().id
      };

      this._user.update( user._id, obj )
      .subscribe(
        () => user[ key ] = now,
        () => this.toast.error('Ocurrió un error actualizando empleado')
      )
    }
  }


}
