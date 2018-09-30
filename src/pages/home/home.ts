import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

// import { AngularFireDatabase } from 'angularfire2/database';
// import { Subject } from 'rxjs/Subject';

import { iReview } from '../../providers/iReview';
// import { iUser } from '../../providers/iUser';
import { ReviewData } from '../../providers/ReviewData';

import { AuthService } from '../../providers/auth-service';

import { ReviewPage } from '../review/review';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  reviews: Array<iReview> = [];
  searchQuery: string = '';

  sortParam1: string = 'bookTitle'; // default to sorting by bookTitle
  sortAsc1: number = 1; // default to sorting ascending
  sortParam2: string = 'bookAuthor'; // default to sorting by bookAuthor
  sortAsc2: number = 1; // default to sorting ascending

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public authService: AuthService, public ReviewData: ReviewData) {

    this.ReviewData.getReviews().then(data => {
      this.reviews = data;
      this.sortReviewList();
    }); // ajouter loader "loading data" + gestion erreur */

  }

  viewReview(review: iReview) {
    console.log(review);
    let index = this.reviews.indexOf(review);

    let reviewBeforeChange: iReview;
    reviewBeforeChange = Object.assign({}, review); // clone review before any change in case of cancellation

    let reviewModal = this.modalCtrl.create(ReviewPage, { review: review });

    reviewModal.onDidDismiss(returnData => {
      if (returnData.operation == "save") { // here it's an update
        this.ReviewData.updateReview(returnData.data).then(_ => {
          if (index > -1) {
            this.reviews[index] = review;
            this.sortReviewList();
          } // replaced in local list if correctly saved on DB
        }).catch(err => {
          console.log(err); // MUST add error popup
        });
      }
      else if (returnData.operation == "delete") {
        this.ReviewData.removeReview(review).then(_ => {
          if (index > -1) {
            this.reviews.splice(index, 1);
            this.sortReviewList();
          } // deleted from local list if correctly removed from DB
        }).catch(err => {
          console.log(err); // MUST add error popup
        });
      }
      else if (returnData.operation == "cancel") {
        this.reviews[index] = reviewBeforeChange;
        this.sortReviewList();
      }
    });

    reviewModal.present();
  }

  addReview() {
    let reviewModal = this.modalCtrl.create(ReviewPage);
    reviewModal.onDidDismiss(returnData => {
      if (returnData.operation == "save") {
        this.ReviewData.pushReview(returnData.data).then(p => {
          // console.log(p);

          let newReview: iReview;
          newReview = returnData.data as iReview;
          newReview.$key = p.key;

          this.reviews.push(newReview); // added to local list if correctly saved on DB
          this.sortReviewList();
        }).catch(err => {
          console.log(err);
        });
      }
    });

    reviewModal.present();
  }

  sortReviewList() {

    // console.log("sorting on " + this.sortParam1 + " " + this.sortParam2);

    this.reviews.sort((a, b) => {
      if (a[this.sortParam1].toLowerCase() < b[this.sortParam1].toLowerCase()) return (-1 * this.sortAsc1);
      if (a[this.sortParam1].toLowerCase() > b[this.sortParam1].toLowerCase()) return (1 * this.sortAsc1);
      if (a[this.sortParam2].toLowerCase() < b[this.sortParam2].toLowerCase()) return (-1 * this.sortAsc2);
      if (a[this.sortParam2].toLowerCase() > b[this.sortParam2].toLowerCase()) return (1 * this.sortAsc2);
      return 0;
    });

  }

  getReviews(event) {
    this.ReviewData.getReviews().then(data => {
      this.reviews = data;
      this.sortReviewList();
    });

    let queryString = event.target.value;

    if (queryString !== undefined) {
      if (queryString.trim() == '') {
        return; // if querystring is empty, do nothing
      }

      this.ReviewData.getFilteredReviews(queryString).then(data => {
        this.reviews = data;
        this.sortReviewList();
      })
    }
    // this.searchSubject.next(queryString);
  }

  resetList(event) {
    this.ReviewData.getReviews().then(data => {
      this.reviews = data;
      this.sortReviewList();
    });
  }


  /* customHeaderFn(record, recordIndex, records) {
    if (recordIndex > 0) {
    if (record.name.charAt(0) !== records[recordIndex-1].name.charAt(0)) {
    return record.name.charAt(0);
    } else {
    return null;
    }
    } else {
    return record.name.charAt(0);
    }
  } */

}
