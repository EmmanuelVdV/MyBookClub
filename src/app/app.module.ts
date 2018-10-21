import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { ReviewPage } from '../pages/review/review';

import { AuthService } from '../providers/auth-service';
import { ReviewData } from '../providers/ReviewData';
import { BookServiceProvider } from '../providers/book-service';

import { StarsComponent} from '../components/stars-component/stars-component';

export const firebaseConfig = {
    apiKey: "AIzaSyDAJp2P5ezPoWy3TID19KxsOiHcAj4UZqI",
    authDomain: "mybookclub-f48b1.firebaseapp.com",
    databaseURL: "https://mybookclub-f48b1.firebaseio.com",
    projectId: "mybookclub-f48b1",
    storageBucket: "mybookclub-f48b1.appspot.com",
    messagingSenderId: "1035030233739"
  };

/* export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}; */

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ProfilePage,
    ReviewPage,
    StarsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ProfilePage,
    ReviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ReviewData,
    BarcodeScanner,
    BookServiceProvider
  ]
})
export class AppModule {}
