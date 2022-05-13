import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  
  form: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
   }

  signIn() {
    console.log(this.form.value.email);
  }

  ngOnInit(): void {
    
  }

}
