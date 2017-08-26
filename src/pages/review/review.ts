import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

import { iReview } from '../../providers/iReview';

/**
 * Generated class for the Review page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {

	review: iReview;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
  	if (navParams.get('review'))
  		this.review = navParams.get('review');
  	else
  		this.review = <iReview>{};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Review');
  }

  save() {
  	this.viewCtrl.dismiss(this.review);
  }

  cancel() {
  	this.viewCtrl.dismiss();
  }

}
