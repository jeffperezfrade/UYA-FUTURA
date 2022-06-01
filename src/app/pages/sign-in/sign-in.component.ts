import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/compat/app';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  loadingSpinner = false;
  error: any;
  email: any;
  password: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AngularFireAuth,
    private toastr: ToastrService
  ) {}

  async signIn() {
    this.loadingSpinner = true;
    //await this.auth.signInWithEmailAndPassword(this.email, this.password);
    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.loadingSpinner = false;
        this.toastr.success('Se ha iniciado sesión!');
        this.router.navigate(['/']).then(() => {});
      })
      .catch((err) => {
        console.log(`Sign In login Error: ${err}`);
        this.error = err;
        this.loadingSpinner = false;
      });
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
