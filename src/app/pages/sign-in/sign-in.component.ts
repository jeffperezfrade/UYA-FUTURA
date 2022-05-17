import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/compat/app'

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
  // form: FormGroup;
  loadingSpinner = false;
  error: any;
  email: any;
  password: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AngularFireAuth) { 
    // this.form = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required],
    // });
   }

  // signIn() {
  //   console.log(`Email: ${this.form.value.email}`);
  //   console.log(`Password: ${this.form.value.password}`);
  //     this.authService.signIn(this.form.value.email, this.form.value.password).then(res => {
  //       console.log(`Usuario logeado: ${res}`);
  //       //this.router.navigate(['/']);
  //     }).catch(function(e) {
  //       console.log(`${e}`); // "oh, no!"
  //   })
  // }

  async signIn() {
    this.loadingSpinner = true;
    try {
      await this.auth.signInWithEmailAndPassword(this.email, this.password);
      this.loadingSpinner = false;
      this.router.navigate(['/']);
    } catch (err) {
      console.log(`Sign In login Error: ${err}`);
      this.error = err;
      this.loadingSpinner = false;
    }
  }

  async loginWithGoogle() {
    this.loadingSpinner = true;
    try {
      await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.loadingSpinner = false;
      this.router.navigate(['/']);
    } catch (err) {
      console.log(`Google login Error: ${err}`);
      this.error = err;
      this.loadingSpinner = false;
    }
  }

  ngOnInit(): void {}
}
