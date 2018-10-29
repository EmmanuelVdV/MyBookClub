import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { BookServiceProvider } from '../../providers/book-service';
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

  reviewForm: FormGroup; // to implement from validation when saving / updating a review
  submitAttempt: boolean = false; // form not submitted yet

  isRemoveHidden: boolean = true; // default to "Remove" button hidden

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public alertCtrl: AlertController, public formBuilder: FormBuilder, private barcodeScanner: BarcodeScanner, private bookService: BookServiceProvider) {

    this.reviewForm = formBuilder.group({
      bookTitle: ['', Validators.compose([Validators.maxLength(256), Validators.required])],
      bookAuthor: ['', Validators.compose([Validators.maxLength(256), Validators.required])],
      bookDescription: [''],
      reviewComment: [''],
      reviewDate: [''],
      reviewRating: ['']
    });

    if (navParams.get('review')) { // updating an existing review
      this.review = navParams.get('review');
      this.isRemoveHidden = false;
    }
    else { // creating a new review
      this.review = <iReview>{};
      this.review.reviewDate = (new Date()).toISOString();
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Review');
  }

  save() {
    this.submitAttempt = true;

    if (this.reviewForm.valid) {
      let returnData = {
        operation: 'save',
        data: null
      };

      returnData.data = this.review;
      console.log(returnData); // debug

      this.viewCtrl.dismiss(returnData);
    }
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

  scan() {
    this.barcodeScanner.scan({
      preferFrontCamera : false, // iOS and Android
      showFlipCameraButton : true, // iOS and Android
      showTorchButton : true, // iOS and Android
      // torchOn: true, // Android, launch with the torch switched on (if available)
      // saveHistory: true, // Android, save scan history (default false)
      // prompt : "Place a barcode inside the scan area", // Android
      // resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      // formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      // orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations : true, // iOS
      disableSuccessBeep: true // iOS and Android
    }).then(barcodeData => {
      console.log('Barcode Data : ', barcodeData);
      this.bookService.search(this.review.bookTitle, this.review.bookAuthor, barcodeData.text).then(
        res => {
          console.log(res);
          this.review.bookTitle = res.title;
          this.review.bookAuthor = res.author;
          this.review.bookDescription = res.description;
          console.log(this.review);
        }
      );
    }).catch(err => {
      console.log('Error', err);
    });
  }

  speech() {

  }

  websearch() {
    
  }

}
