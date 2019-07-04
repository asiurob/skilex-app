import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { ToolsService } from '../../../../services/tools.service';
import { StorageService } from '../../../../services/storage.service';
import { CampaignService } from '../../../../services/campaign.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styles: []
})
export class NewCampaignComponent implements OnInit {

  previewImg: string;
  imgErr: string;
  file: any;
  form: FormGroup;
  userList: Array<any>;
  clicked = false;

  constructor(
    public _user: UserService,
    public _tools: ToolsService,
    public _storage: StorageService,
    public _campaign: CampaignService,
    public _router: Router,
    public _toast: ToastrService
  ) {
    this._user.list()
    .subscribe(
      (res: any) => this.userList = res.data.filter( ( u: any ) => u.status === 'active' )
    );
  }

  ngOnInit() {


    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      noemployees: new FormControl(),
      type: new FormControl(0, [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      people: new FormControl(0, [Validators.required]),
      photo: new FormControl('', [Validators.required]),
      comments: new FormControl()
    });
  }

  save() {
    this.clicked = true;
    if ( this.form.valid && this.file ) {
      let data = new FormData();
      data.append('name', this.form.value.name );
      data.append('contact', this.form.value.contact );
      data.append('phone', this.form.value.phone );
      data.append('email', this.form.value.email );
      data.append('address', this.form.value.address );
      data.append('zip', this.form.value.zip );
      data.append('noemployees', this.form.value.noemployees );
      data.append('type', this.form.value.type );
      data.append('date', this.form.value.date );
      data.append('time', this.form.value.time );
      data.append('people', this.form.value.people );
      data.append('comments', this.form.value.comments );
      data.append('photo', this.file, this.file.name );
      data.append('user', this._storage.getData().id );
      console.log( this.file )
      this._campaign.create( data )
      .subscribe(
        () => this._router.navigateByUrl('/campaigns'),
        () => this._toast.error('Ocurrió un error al crear la campaña'),
      );
    }
  }

  preview( ev: any ) {
    if ( ev.target.files[0] ) {
      this._tools.viewImg( ev.target.files[0], 1024, 900, 900 )
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

}
