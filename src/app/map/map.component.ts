import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare const  google :any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit,AfterViewInit {
  map:any;
  @ViewChild ('mapElement') mapElement :any;
  deliver:boolean =false;
  Latitude: any;
  Longitude: any;
  address: any;
  zoom: number = 8;
  base_lat: number = 11.1271;
  base_lng: number = 78.6569;
  location_lat: number = 11.1271;
  location_lng: number = 78.6569;
  public handleAddressChange(address: any) {
    this.zoom = 15;
    this.location_lat = Number(address.geometry.location.lat());
    this.location_lng = Number(address.geometry.location.lng());
    this.base_lat = this.location_lat;
    this.base_lng = this.location_lng;
    this.Latitude = this.location_lat;
    this.Longitude = this.location_lng;
    this.address = address.formatted_address;
    // this.addVendorForm.patchValue({
    //   bussiness_lat:this.location_lat,
    //   bussiness_long:this.location_lng
    // });
    console.log(this.address);
  }
  constructor(private route: Router) { }
  ngAfterViewInit(): void{
    console.log( "sds")
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center: { lat: 13.067439 , lng: 80.237617  },
        zoom: 13,
        mapTypeId: "roadmap",
      }
    );

  }
  ngOnInit(): void {
  }

  location(){
    this.route.navigate(['/cart'])
    console.log("ss")
  }
  deliverto()
  {
    console.log("sdasd")
    this.deliver=true;
  }
}
