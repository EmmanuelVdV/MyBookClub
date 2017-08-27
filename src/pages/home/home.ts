import { Component } from '@angular/core';
import { NavController, ModalController, ItemSliding } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

import { iReview } from '../../providers/iReview';
// import { iUser } from '../../providers/iUser';

import { AuthService } from '../../providers/auth-service';

import { ReviewPage } from '../review/review';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  reviews: FirebaseListObservable<any[]>;
  searchQuery: string = '';
  searchSubject: Subject<any>;
  //user: iUser;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public db: AngularFireDatabase, public authService: AuthService) {
    // this.user = authService.currentUser;
    this.searchSubject = new Subject();
    this.reviews = db.list('/reviews/' + authService.signedUser.uid, {
      query: {
        orderByChild: 'bookTitle',
        startAt: this.searchSubject,
        endAt: this.searchSubject // A REVOIR COMPLETEMENT
      }
    });
  }

  viewReview(review: iReview) {
    let reviewModal = this.modalCtrl.create(ReviewPage, { review: review });
    reviewModal.onDidDismiss(returnData => {
      if (returnData.operation == "save") {
      this.reviews.update(returnData.data.$key, {
        bookTitle: returnData.data.bookTitle,
        bookAuthor: returnData.data.bookAuthor,
        bookDescription: returnData.data.bookDescription,
        //bookPicture: data.bookPicture,
        //reviewCategory: data.reviewCategory,
        reviewComment: returnData.data.reviewComment,
        reviewRating: returnData.data.reviewRating
      }); // Gestion erreur à implémenter
    } 
    else if (returnData.operation == "delete") {
      this.reviews.remove(review.$key); // Gestion erreur à implémenter
    }
    });
    reviewModal.present();
  }

  addReview() {
    let reviewModal = this.modalCtrl.create(ReviewPage);
    reviewModal.onDidDismiss(returnData => {
      if (returnData.operation == "save") {
        this.reviews.push(returnData.data);
      } // Gestion erreur à implémenter
    });
    reviewModal.present();
  }

  getReviews(event) {
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
