import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, ViewController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

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
  reviewPart: string;

  reviewForm: FormGroup; // to implement from validation when saving / updating a review
  submitAttempt: boolean = false; // form not submitted yet

  isRemoveHidden: boolean = true; // default to "Remove" button hidden

  isSpeechAvailable: boolean = false; // default to speech recognition not available
  isListening: boolean = false;
  speechMatches: Array<String> = [];

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public alertCtrl: AlertController, public formBuilder: FormBuilder, 
    private barcodeScanner: BarcodeScanner, private bookService: BookServiceProvider, private speechRecognition: SpeechRecognition,
    private changeDetectorRef: ChangeDetectorRef) {

    this.reviewForm = formBuilder.group({
      bookTitle: ['', Validators.compose([Validators.maxLength(1024), Validators.required])],
      bookAuthor: ['', Validators.compose([Validators.maxLength(256), Validators.required])],
      bookDescription: [''],
      reviewComment: [''],
      reviewDate: [''],
      reviewRating: [''],
      bookPicture: ['']
    });

    if (navParams.get('review')) { // updating an existing review
      this.review = navParams.get('review');
      this.isRemoveHidden = false;
    }
    else { // creating a new review
      this.review = <iReview>{};
      this.review.reviewDate = (new Date()).toISOString();
    }

    this.reviewPart = "main"; // focus on "main" tab

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
      title: 'Suppression',
      message: 'Etes-vous certain de vouloir supprimer ce livre ?',
      buttons: [
        {
          text: 'Annuler'
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
      preferFrontCamera: false, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      // torchOn: true, // Android, launch with the torch switched on (if available)
      // saveHistory: true, // Android, save scan history (default false)
      // prompt : "Place a barcode inside the scan area", // Android
      // resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      // formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      // orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations: true, // iOS
      disableSuccessBeep: true // iOS and Android
    }).then(barcodeData => {
      console.log('Barcode Data : ', barcodeData);
      this.bookService.search('', '', barcodeData.text).then(
        res => {
          console.log(res);
          this.review.bookTitle = res.title;
          this.review.bookAuthor = res.author;
          this.review.bookDescription = res.description;
          this.review.bookPicture = res.picture;
          console.log(this.review);
        }
      );
    }).catch(err => {
      console.log('Error', err);
    });
  }

  speech() {
    if (!this.isSpeechAvailable) {
      this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission()
          .then(
            () => {
              console.log('Granted');
              this.speechRecognition.isRecognitionAvailable().then((available: boolean) => this.isSpeechAvailable = true);
            },
            () => console.log('Denied')
          )
        } else {
          this.speechRecognition.isRecognitionAvailable().then((available: boolean) => this.isSpeechAvailable = true);
        }
      });
    } else {
      this.startListening();
    }
  }

  public startListening(): void {
    this.isListening = true;
    this.speechMatches = [];

    let options ={
      language: 'fr-FR',
      matches: 1,
      prompt: '',      // Android only
      showPopup: false,  // Android only
      showPartial: false
    };

    this.speechRecognition.startListening(options)
    .subscribe(
      (matches: Array<string>) => {
        this.isListening = false;
        this.speechMatches = matches;
        this.changeDetectorRef.detectChanges(); // forces UI refresh
      },
      (onerror) => {
        this.isListening = false;
        this.changeDetectorRef.detectChanges(); // forces UI refresh
        console.log('error:', onerror);
      }
    );
  }

  public stopListening(): void {
    this.isListening = false;
    this.speechRecognition.stopListening();
  }

  websearch() {
    this.bookService.search(this.review.bookTitle, this.review.bookAuthor, '').then(
      res => {
        console.log(res);
        this.review.bookTitle = res.title;
        this.review.bookAuthor = res.author;
        this.review.bookDescription = res.description;
        this.review.bookPicture = res.picture;
        console.log(this.review);
      }
    ).catch(err => {
      console.log('Error', err);
    });
  }
}
