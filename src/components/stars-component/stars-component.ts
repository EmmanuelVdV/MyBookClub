import { Component, Input, OnInit } from '@angular/core';

/*
  Generated class for the StarsComponent component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'stars-component',
  templateUrl: 'stars-component.html'
})
export class StarsComponent implements OnInit {

  @Input() count: number = 5; // defaults to count max to 5 stars
  @Input() rating: number =0;
  stars: string[] = [];

  ngOnInit() {
    for (let i = 1; i <= this.count; i++) {
      if(i <= this.rating) {this.stars.push("md-star");}
      else {this.stars.push("md-star-outline");} 
    }
  }

}
