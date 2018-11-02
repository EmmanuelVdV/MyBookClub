import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	public email: string;
	public password: string;
	public loading: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, public loadingCtrl: LoadingController) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Login');
	}

	login(): void {
		this.showLoader();

		this.authService.login(this.email, this.password).then((result) => {
			this.loading.dismiss();
			console.log(result);
			this.navCtrl.setRoot(HomePage);
		}, (err) => {
			this.loading.dismiss();
			console.log(err);
		});
	}

	launchSignup(): void {
		this.navCtrl.push(SignupPage);
	}

	showLoader(): void {

		this.loading = this.loadingCtrl.create({
			content: 'Authentification en cours...'
		});

		this.loading.present();
	}

}
