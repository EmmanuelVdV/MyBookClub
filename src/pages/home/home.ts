import { Component } from '@angular/core';
import { NavController, ModalController, ItemSliding } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
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

  //reviews: FirebaseListObservable<any[]>;
  reviews: Array<iReview> = [];
  searchQuery: string = '';

  sortParam1: string = 'bookTitle'; // default to sorting by bookTitle
  sortAsc1: number = 1; // default to sorting ascending
  sortParam2: string = 'bookAuthor'; // default to sorting by bookAuthor
  sortAsc2:  number = 1; // default to sorting ascending
  //user: iUser;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public db: AngularFireDatabase, public authService: AuthService, public ReviewData: ReviewData) {
    // this.user = authService.currentUser;
    /* this.searchSubject = new Subject();
    this.reviews = db.list('/reviews/' + authService.signedUser.uid, {
      query: {
      orderByChild: 'bookTitle',
      startAt: this.searchSubject,
      endAt: this.searchSubject // A REVOIR COMPLETEMENT
      }
    }); */

    ReviewData.loadReviews().then(data => {
      this.reviews = data; // EN FAIT ON PASSE UN OBSERVABLE !!! D'où les mises à jour automatiques !
      console.log(this.reviews);
      this.sortReviewList();
    }); // ajouter loader "loading data" + gestion erreur

  }

  viewReview(review: iReview) {
    console.log(review);
    // let index = this.reviews.indexOf(review);
    let reviewModal = this.modalCtrl.create(ReviewPage, { review: review });
    reviewModal.onDidDismiss(returnData => {
      if (returnData.operation == "save") { // here it's an update
        this.ReviewData.updateReview(returnData.data).then(_ => {
          // if (index > -1) {this.reviews[index]=review;} // replaced in local list if correctly saved on DB
        }).catch(err => {
          console.log(err); // MUST add error popup
        });
      }
      else if (returnData.operation == "delete") {
        this.ReviewData.removeReview(review).then(_ => {
          // if (index > -1) {this.reviews.splice(index, 1);} // deleted from local list if correctly removed from DB
        }).catch(err => {
          console.log(err); // MUST add error popup
        });
      }
    });

    reviewModal.present();
  }

  addReview() {
    let reviewModal = this.modalCtrl.create(ReviewPage);
    reviewModal.onDidDismiss(returnData => {
      if (returnData.operation == "save") {
        this.ReviewData.pushReview(returnData.data).then(_ => {
          // this.reviews.push(returnData.data); // added to local list if correctly saved on DB
        }).catch(err => {
          console.log(err);
        });
      }
    });

    reviewModal.present();
  }

  sortReviewList() {

    this.reviews.sort((a, b) => {
      if(a[this.sortParam1] < b[this.sortParam1]) return (-1*this.sortAsc1);
      if(a[this.sortParam1] > b[this.sortParam1]) return (1*this.sortAsc1);
      if(a[this.sortParam2] < b[this.sortParam2]) return (-1*this.sortAsc2);
      if(a[this.sortParam2] > b[this.sortParam2]) return (1*this.sortAsc2);
      return 0;
    });

  }

  /*getReviews(event) {
    let queryString = event.target.value;
    if (queryString !== undefined) {
    if (queryString.trim() !== '') {
    this.searchSubject.next(queryString);
    }
    }
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
