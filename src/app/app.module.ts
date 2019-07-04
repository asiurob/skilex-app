import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LandingModule } from './components/pages/landing.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/pages/landing.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LandingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
