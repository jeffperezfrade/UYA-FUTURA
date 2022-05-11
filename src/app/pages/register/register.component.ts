import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  onSubmit() {
    const user: User = {
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      email: this.form.value.email,
      password: this.form.value.password,
    }
    console.log(user);
    this.userService.saveUser(user).then(() => {
      console.log('Usuario registrado!');
      // Limpiamos el formulario.
      this.form.reset();
    }, error => {
      console.log(error);
    });
  }

}
