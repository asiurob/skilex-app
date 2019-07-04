import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errMessage: string;
  errOn: string;
  user: User;
  constructor(
    private _login: LoginService,
    private _router: Router,
    private _storage: StorageService
  ) {

  }

  login( form: NgForm ) {
    this.errMessage = null;
    if ( form.valid ) {
      this._login.login( form.value )
      .subscribe(
        ( res: any ) => {
          this.user = {
            name     : res.data[0].name,
            id       : res.data[0]._id,
            lastName : res.data[0].last_name,
            role     : res.data[0].area.name,
            area     : res.data[0].role.name,
            token    : res.token
          };
          this._storage.setData( this.user );
          this._router.navigateByUrl('/');
        },
        ( err: any ) => {
          this.errMessage = err.error.message;
          this.errOn      = 'solicitud';
        }
      );
    } else {
      this.errMessage = 'El usuario y/o contraseña son necesarios';
      this.errOn      = 'aplicación';
    }
  }
}
