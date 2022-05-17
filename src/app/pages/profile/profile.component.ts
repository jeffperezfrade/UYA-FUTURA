import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private router: Router,
    public auth: AngularFireAuth) {}

  signOut(){
    console.log(`Cerrando Sesión ...`);
    this.auth.signOut();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {}
}
