import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AngularFireAuth) {
      this.form = this.fb.group({
        name: ['', Validators.required],
      });
    }

  signOut(){
    console.log(`Cerrando Sesión ...`);
    this.auth.signOut();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  saveChanges(){
      // Actualizamos el nombre.
      this.auth.currentUser.then((user) =>{
        user?.updateProfile({
          displayName: this.form.value.name
        }).then(() => {
          console.log('Nombre actualizado');
          this.form.reset();
          })
        }, function(error) {
          // An error happened.
      });
  }

  ngOnInit(): void {
    this.auth.currentUser
  }
}
