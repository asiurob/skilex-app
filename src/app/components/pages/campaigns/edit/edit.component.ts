import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { ToolsService } from '../../../../services/tools.service';
import { StorageService } from '../../../../services/storage.service';
import { CampaignService } from '../../../../services/campaign.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { urlservice } from '../../../../global/variables';

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditCampaignComponent implements OnInit {

  previewImg: string;
  imgErr: string;
  file: any;
  userList: Array<any>;
  modifications: any[] = [];
  clicked = false;
  campaign: any;

  constructor(
    public _user: UserService,
    public _tools: ToolsService,
    public _storage: StorageService,
    public _campaign: CampaignService,
    public _router: Router,
    public _route: ActivatedRoute,
    public _toast: ToastrService,
  ) { }

  async ngOnInit() {

    const id = this._route.snapshot.params.id;

    await this._campaign.getOne( id )
    .subscribe(
      ( res: any ) => {
        this.campaign = res.data[0];
        this.previewImg = `${ urlservice }/campaigns/${ this.campaign.photo }`;
      },
      ( err: any ) => this._toast.error('Ocurrió un error al obtener la información de la campaña')
    )

    await this._campaign.getChanges( id )
    .subscribe(
      ( res: any ) => this.modifications = res.data[0].modification,
      ( err: any ) => this._toast.error('Ocurrió un error al obtener los cambios de la campaña')
    )

    await this._user.list()
    .subscribe(
      (res: any) => this.userList = res.data.filter( ( u: any ) => u.status === 'active' )
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

  update( el: any ) {
    const key  = el.getAttribute('name');
    const last = this.campaign[ key ];
    const now  = el.value;
    const tag  = el.getAttribute('data-tag');
    if ( String(last).trim() !== String(now).trim() ) {
      const obj = {
        data: [ key, last, now, tag ],
        id: this.campaign._id,
        user: this._storage.getData().id
      };

      this._campaign.update( this.campaign._id, obj )
      .subscribe(
        () => {
          this.campaign[ key ] = now;
          this._campaign.getChanges( this.campaign._id )
          .subscribe(
            ( res: any ) => this.modifications = res.data[0].modification,
            ( err: any ) => this._toast.error('Ocurrió un error al obtener los cambios de la campaña')
          )
        },
        ( err: any ) => this._toast.error('Ocurrió un error actualizando la campaña')
      )
    }
  }

}
