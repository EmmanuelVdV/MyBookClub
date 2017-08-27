import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
// import { Profile } from '../profile/profile';
import { HomePage } from '../home/home';

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	email: string;
	password: string;
 	username: string;
 	language: string;
	loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

	register(): void {
 
    this.showLoader();
 
    let details = {
        email: this.email,
        password: this.password,
        username: this.username /*,
        language: this.language */
    };
 
    this.authService.register(this.email, this.password).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
        this.loading.dismiss();
    });
  }
 
  showLoader(): void {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
 
    this.loading.present(); 
  }


}
