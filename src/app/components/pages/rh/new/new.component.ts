import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../../../services/tools.service';
import { AreaService } from '../../../../services/area.service';
import { RolService } from '../../../../services/rol.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { StorageService } from '../../../../services/storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rh-new',
  templateUrl: './new.component.html',
  styles: []
})
export class NewRhComponent implements OnInit {

  previewImg: string;
  imgErr: string;
  areas: Array<any>;
  roles: Array<any>;
  bosses: Array<any>;
  form: FormGroup;
  clicked = false;
  file: Blob;


  constructor(
    public _tools: ToolsService,
    public _area: AreaService,
    public _rol: RolService,
    public _user: UserService,
    public _storage: StorageService,
    public _router: Router,
    public toast: ToastrService
  ) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required] ),
      lastname: new FormControl('', [Validators.required] ),
      username: new FormControl('', [Validators.required] ),
      email: new FormControl('', [Validators.required, Validators.email] ),
      gender: new FormControl('', [Validators.required] ),
      phone: new FormControl(),
      photo: new FormControl('', [Validators.required] ),
      area: new FormControl(0,  [Validators.required] ),
      boss: new FormControl(0,  [Validators.required] ),
      role: new FormControl(0,  [Validators.required] )
    });

    this._area.list()
    .subscribe(
      ( res: any ) => this.areas = res.data,
      ( err: any ) => this.toast.error('Ocurrió un error al obtener las áreas')
    );

    this._rol.list()
    .subscribe(
      ( res: any ) => this.roles = res.data,
      ( err: any ) => this.toast.error('Ocurrió un error al obtener los roles')
    );

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

  save() {
    this.clicked = true;
    if ( this.form.valid ) {

      let data = new FormData();
      data.append('name', this.form.value.name );
      data.append('lastname', this.form.value.lastname );
      data.append('username', this.form.value.username );
      data.append('email', this.form.value.email );
      data.append('gender', this.form.value.gender );
      data.append('role', this.form.value.role );
      data.append('area', this.form.value.area );
      data.append('boss', this.form.value.boss );
      data.append('phone', this.form.value.phone );
      data.append('user', this._storage.getData().id );
      data.append('image', this.file, 'image' );

      this._user.create( data )
      .subscribe(
        () => this._router.navigateByUrl('/rh'),
        ( err: any ) => this.toast.error('Ocurrió un error al salvar al empleado'),
      )
    }
  }

}
