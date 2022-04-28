import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { google } from "google-maps";
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
  place:any;
  markers:any;
  marker:any;
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
    const map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center: { lat: 13.067439 , lng: 80.237617  },
        zoom: 13,
        mapTypeId: "roadmap",
      }
    );
    
    
   
    const input = document.getElementById("pac-input") as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);
    console.log(searchBox);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
    });
    
    let markers: google.maps.Marker[] = [];
    searchBox.addListener("places_changed",()=>
    {
      const places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }
      this.markers.forEach((marker:any) => {
        marker.setMap(null);
      });
      this.markers = [];
  
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place:any)=>
      {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
        const icon = {
          url: place.icon as string,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
        this.markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
      })
    
  
  

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
// declare global {
//   interface Window {
//     initAutocomplete: () => void;
//   }
// }
// window.initAutocomplete = any.initAutocomplete;
