import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { ReviewData } from '../../providers/ReviewData';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  booksRoot = HomePage;
  wishesRoot = 'WishesPage';
  accountRoot = 'AccountPage';

  bookNbr$: Observable<number>;


  constructor(public navCtrl: NavController, public reviewDataService: ReviewData) {
  }


  ngOnInit() {
    this.bookNbr$ = this.reviewDataService.reviewNbr$;
  }
}
