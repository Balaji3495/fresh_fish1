import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CartComponent } from './cart/cart.component';
import { MapComponent } from './map/map.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PhoneComponent } from './phone/phone.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxOtpInputModule } from "ngx-otp-input";
// import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    CartComponent,
    MapComponent,
    PhoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    OverlayModule,
    PortalModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxOtpInputModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDap8qav1flUsql0VWUYkjgB0noN0o_U1Y'
    // }),

  ],
  providers:[{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],

})
export class AppModule { }
