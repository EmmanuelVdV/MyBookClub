import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { Profile } from '../pages/profile/profile';

import { AuthService } from '../providers/auth-service';

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
    Login,
    Signup,
    Profile
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    Signup,
    Profile
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
