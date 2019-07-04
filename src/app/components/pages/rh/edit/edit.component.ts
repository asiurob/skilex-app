import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../../../services/tools.service';
import { AreaService } from '../../../../services/area.service';
import { RolService } from '../../../../services/rol.service';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from '../../../../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { urlservice } from 'src/app/global/variables';

@Component({
  selector: 'app-rh-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditRhComponent implements OnInit {


  previewImg: string;
  imgErr: string;
  areas: Array<any>;
  roles: Array<any>;
  bosses: Array<any>;
  modifications: Array<any>;
  file: Blob;
  user: any;


  constructor(
    public _tools: ToolsService,
    public _area: AreaService,
    public _rol: RolService,
    public _user: UserService,
    public _storage: StorageService,
    public _router: Router,
    public toast: ToastrService,
    public _route: ActivatedRoute
  ) { }

  async ngOnInit() {

    const id = this._route.snapshot.params.id;

    await this._area.list()
    .subscribe(
      ( res: any ) => this.areas = res.data,
      ( err: any ) => this.toast.error('Ocurrió un error al obtener las áreas')
    );

    await this._rol.list()
    .subscribe(
      ( res: any ) => this.roles = res.data,
      ( err: any ) => this.toast.error('Ocurrió un error al obtener los roles')
    );

    await this._user.getOne( id )
    .subscribe(
      ( res: any ) => {
        this.user = res.data[0];
        this.previewImg = `${ urlservice }/users/${ this.user.photo }`;

        setTimeout( () => {
          document.getElementById('area').dispatchEvent( new Event( 'change', {bubbles: true } ) );
        }, 500 );
      },
      ( err: any ) => this.toast.error('Ocurrió un error al obtener La información del empleado')
    )

    await this._user.getChanges( id )
    .subscribe(
      ( res: any ) => this.modifications = res.data[0].modification,
      ( err: any ) => this.toast.error('Ocurrió un error al obtener los cambios del empleado')
    )

  }

  preview( ev: any ) {
    if ( ev.target.files[0] ) {
      this._tools.viewImg( ev.target.files[0], 250, 300, 300 )
      .then( (res: any ) => {
        this.previewImg = res;
        this.imgErr     = null;
        this.file       = ev.target.files[0];
      })
      .catch( ( err: any ) => {
        this.imgErr     = err;
        this.previewImg = null;
        ev.target.files = null;
        ev.target.value = null;
        this.file       = null;
      });
    }
  }

  getBoss( input: any ) {
    if( input.value ) {
      this._user.getBoss( input.value )
      .subscribe(
        ( res: any ) => this.bosses = res.data,
        ( err: any ) => this.toast.error('Ocurrió un error al obtener los jefes directos')
       )
    }
  }

  update( el: any ) {
    const key  = el.getAttribute('name');
    const last = this.user[ key ];
    const now  = el.value;
    const tag  = el.getAttribute('data-tag');
    if ( last.trim() !== now.trim() ) {
      const obj = {
        data: [ key, last, now, tag ],
        id: this.user._id,
        user: this._storage.getData().id
      };

      this._user.update( this.user._id, obj )
      .subscribe(
        () => {
          this.user[ key ] = now;
          this._user.getChanges( this.user._id )
          .subscribe(
            ( res: any ) => this.modifications = res.data[0].modification,
            ( err: any ) => this.toast.error('Ocurrió un error al obtener los cambios del empleado')
          )
        },
        ( err: any ) => this.toast.error('Ocurrió un error actualizando empleado')
      )
    }
  }

}
