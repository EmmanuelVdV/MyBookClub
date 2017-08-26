import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { AuthService } from '../../providers/auth-service';
import * as firebase from 'firebase/app';
// import { iUser } from '../../providers/iUser';

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {

	// public user: iUser;
	public userRef: firebase.User;


	constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public authService: AuthService) {
		// this.user = navParams.data.userInfo;
		this.userRef = authService.signedUser;
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Profile');
	}

	updateProfile() {
		// call à fonction de authService pour update
	}

}
