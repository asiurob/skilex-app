import { NgModule } from '@angular/core';
import { RhComponent } from './rh/rh.component';
import { LandingRoutingModule } from './landing-routing.module';
import { CommonModule } from '@angular/common';
import { NewRhComponent } from './rh/new/new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditRhComponent } from './rh/edit/edit.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { NewCampaignComponent } from './campaigns/new/new.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { MongoDatePipe } from '../../pipes/mongo-date.pipe';
import { EditCampaignComponent } from './campaigns/edit/edit.component';

@NgModule({
    declarations: [
        RhComponent,
        NewRhComponent,
        EditRhComponent,
        CampaignsComponent,
        NewCampaignComponent,
        MongoDatePipe,
        EditCampaignComponent
    ],
    exports: [
        RhComponent,
    ],
    imports: [
        LandingRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        NgMultiSelectDropDownModule.forRoot(),
        BrowserAnimationsModule,
    ]
})

export class LandingModule {}