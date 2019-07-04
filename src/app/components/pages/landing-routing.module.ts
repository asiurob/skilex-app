import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from '../../components/pages/landing.component';
import { RhComponent } from '../../components/pages/rh/rh.component';
import { AuthGuard } from '../../services/guards/auth.guard';
import { NewRhComponent } from './rh/new/new.component';
import { EditRhComponent } from './rh/edit/edit.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { NewCampaignComponent } from './campaigns/new/new.component';
import { EditCampaignComponent } from './campaigns/edit/edit.component';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: 'rh', component: RhComponent },
      { path: 'rh/new', component: NewRhComponent },
      { path: 'rh/:id', component: EditRhComponent },

      { path: 'campaigns', component: CampaignsComponent },
      { path: 'campaigns/new', component: NewCampaignComponent },
      { path: 'campaigns/:id', component: EditCampaignComponent }
    ]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
