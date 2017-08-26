import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';

// import { iUser } from './iUser';
import * as firebase from 'firebase/app';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

	public currentUser: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    // console.log('Hello AuthService Provider');
    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
  }

  register(email: string, password: string): firebase.Promise<any> {
  	return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string): firebase.Promise<any> {
  	return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signout(): void {
  	this.afAuth.auth.signOut();
  }

  get authenticated(): boolean {
  	return this.currentUser !== null;
  }

  get signedUser(): firebase.User { //utile ?
  	return this.currentUser;
  }

}
