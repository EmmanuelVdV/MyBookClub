import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
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
export class Profile {

	public user: any;


	constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Profile');
	}

}
