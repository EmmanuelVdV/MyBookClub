import { Component } from '@angular/core';
import { NavController, ModalController, ItemSliding } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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
  //user: iUser;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public db: AngularFireDatabase, public authService: AuthService) {
    // this.user = authService.currentUser;
    this.reviews = db.list('/reviews/' + authService.signedUser.uid); // ajouter id user from user
  }

  viewReview(review: iReview, slidingItem: ItemSliding) {
    let reviewModal = this.modalCtrl.create(ReviewPage, { review: review });
    reviewModal.onDidDismiss(data => {
      this.reviews.update(data.$key, {
        bookTitle: data.bookTitle,
        bookAuthor: data.bookAuthor,
        bookDescription: data.bookDescription,
        bookPicture: data.bookPicture,
        reviewCategory: data.reviewCategory,
        reviewComment: data.reviewComment,
        reviewRating: data.reviewRating
      }); // Gestion erreur à implémenter
    });
    reviewModal.present();
  }

  deleteReview(review: iReview, slidingItem: ItemSliding) {
    this.reviews.remove(review.$key);
    slidingItem.close();
  }

  addReview() {
    let reviewModal = this.modalCtrl.create(ReviewPage);
    reviewModal.onDidDismiss(data => {
      this.reviews.push(data); // Gestion erreur à implémenter
    });
    reviewModal.present();
  }

  logout() {

  }

}
