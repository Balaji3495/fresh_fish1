import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  deliver:boolean =false;
  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  location(){
    this.route.navigate(['/cart'])
  }
  deliverto()
  {
    console.log("sdasd")
    this.deliver=true;
  }
}
