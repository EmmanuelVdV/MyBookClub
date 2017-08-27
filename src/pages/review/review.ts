import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, AlertController } from 'ionic-angular';

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

  isRemoveHidden: boolean = true; // default to "Remove" button hidden

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public alertCtrl: AlertController) {
    if (navParams.get('review')) {
      this.review = navParams.get('review');
      this.isRemoveHidden = false;
    }
    else {
      this.review = <iReview>{};
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Review');
  }

  save() {
    let returnData = {
      operation: 'save',
      data: null
    };

    returnData.data = this.review;
    console.log(returnData); // debug

    this.viewCtrl.dismiss(returnData);
  }

  cancel() {
    let returnData = {
      operation: 'cancel',
      data: null
    };

    this.viewCtrl.dismiss(returnData);
  }

  remove() {
    let returnData = {
      operation: 'delete',
      data: null
    };

    let prompt = this.alertCtrl.create({
      title: 'Delete review',
      message: 'Are you sure you want to delete this review?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this.viewCtrl.dismiss(returnData);
          }
        }]
    });

    prompt.present();

  }

}
