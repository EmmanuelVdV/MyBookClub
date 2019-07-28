import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from './auth-service';

import { iReview } from './iReview';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ReviewData {

	reviews: FirebaseListObservable<any[]>;
	reviewsArray: Array<iReview> = null;

	private reviewNbr = new Subject<number>();
	reviewNbr$ = this.reviewNbr.asObservable();

	constructor(public db: AngularFireDatabase, public authService: AuthService) { }


	loadReviews(): Promise<any> {

		return new Promise(resolve => {
			this.reviews = this.db.list('/reviews/' + this.authService.signedUser.uid, { preserveSnapshot: true });
			this.reviews.subscribe(items => {

				this.reviewsArray = [];

				items.forEach(item => {
					let r: iReview;
					r = item.val() as iReview;
					r.$key = item.key;
					this.reviewsArray.push(r);
				});

				this.reviewNbr.next(this.reviewsArray.length); // update number of reviews returned

				resolve(this.reviewsArray);
			});

		});
	}

	getReviews(): Promise<any> { // nécessaire ?
		return this.loadReviews().then(data => {
			return data;
		});
	}


	getFilteredReviews(queryString): Promise<any> {
		return this.loadReviews().then(data => {
			let theFilteredReviews: Array<iReview> = [];

			for (let theReview of data) {
				if (theReview.bookTitle.toLowerCase().indexOf(queryString.toLowerCase()) > -1 || theReview.bookAuthor.toLowerCase().indexOf(queryString.toLowerCase()) > -1) {
					theFilteredReviews.push(theReview);
				}
			}

			return theFilteredReviews;
		});
	}


	pushReview(returnReview: iReview) {
		const correctedReview = this.correctReview(returnReview);
		const p = this.reviews.push(correctedReview);
		this.reviewNbr.next(this.reviewsArray.length); // update number of reviews returned
		return p;
	}

	updateReview(returnReview: any) {
		const correctedReview = this.correctReview(returnReview);

		const p = this.reviews.update(correctedReview.$key, {
			bookTitle: correctedReview.bookTitle,
			bookAuthor: correctedReview.bookAuthor,
			bookDescription: correctedReview.bookDescription,
			bookPicture: correctedReview.bookPicture,
			//reviewCategory: data.reviewCategory,
			reviewComment: correctedReview.reviewComment,
			reviewRating: correctedReview.reviewRating,
			reviewDate: correctedReview.reviewDate
		});

		return p;
	}

	removeReview(returnReview: iReview) {
		const p = this.reviews.remove(returnReview.$key);
		this.reviewNbr.next(this.reviewsArray.length); // update number of reviews returned
		return p;
	}

	correctReview(data: iReview) { // used to complete missing fields
		if (!data.bookDescription)
			data.bookDescription = '';
		if (!data.bookPicture)
			data.bookPicture = '';
		if (!data.reviewComment)
			data.reviewComment = '';
		if (!data.reviewDate)
			data.reviewDate = (new Date()).toISOString();
		if (!data.reviewRating)
			data.reviewRating = 0;

		return data;
	}

}
