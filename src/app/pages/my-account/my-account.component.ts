import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { 
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
   }

  signIn() {
    console.log(`Email: ${this.form.value.email}`);
    console.log(`Password: ${this.form.value.password}`);
    this.authService.signIn(this.form.value.email, this.form.value.password).then(res => {
      console.log(`Usuario logeado: ${res}`);
    });
  }

  ngOnInit(): void {
    
  }

}
