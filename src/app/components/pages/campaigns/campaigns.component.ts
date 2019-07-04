import { Component, OnInit } from '@angular/core';
import { ListsService } from '../../../services/lists.service';
import { urlservice } from '../../../global/variables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styles: []
})
export class CampaignsComponent implements OnInit {

  campaigns: Array<any>;
  pages: any[] = [];
  url: string;
  constructor(
    public _campaign: ListsService,
    public _router: Router
  ) { }

  ngOnInit() {
    this.url = urlservice;
    this._campaign.campaingList( 0 )
    .subscribe(
      ( res:any ) => {
        this.campaigns = res.data;
        this.pages = Array( Math.ceil( res.count / 20 ) ).fill(1);
      },
      ( arr:any ) => console.log( arr )
    )
  }

  showCamp( id: string ) {
      this._router.navigateByUrl(`/campaigns/${ id }`);
  }

}
