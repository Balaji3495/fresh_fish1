import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  providers: [NgbCarouselConfig],
})
export class CarouselComponent implements OnInit {
  images = [
    { name: 'https://picsum.photos/id/700/900/500' },
    { name: 'https://picsum.photos/id/700/900/500' },
  ];
  constructor(config: NgbCarouselConfig) {
    config.interval = 2000;
  config.keyboard = true;
  config.pauseOnHover = true;
   }

  
  ngOnInit(): void {
  }

}
