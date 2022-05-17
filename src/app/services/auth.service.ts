import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth) { }

  async signIn(email: string, password: string) {
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(`Sign In login Error: ${err}`);
      return null;
    }
  }

  async register(email: string, password: string) {
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log(`Sign In login Error: ${err}`);
      return null;
    }
  }

  signOut(){
    localStorage.clear();
    return this.afauth.signOut();
  } 

  getUserLogged() {
    return this.afauth.authState;
  }

  isLogged(){
    if (this.afauth.authState == null) return false;
    return true;
  }
}
