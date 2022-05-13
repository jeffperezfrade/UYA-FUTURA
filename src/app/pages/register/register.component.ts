import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  form: FormGroup;
  loadingSpinner = false;
  emailsDatabase: string[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  /**
   * Registra un nuevo usuario a la base de datos.
   */
  onSubmit() {
    const user: User = {
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      email: this.form.value.email,
      password: this.form.value.password,
    };

    console.log(`Usuario a insertar: ${user}`);

    this.loadingSpinner = true;
    // Verificamos si el email ya existe en la base de datos.
    if (this.checkEmailAvailability(user.email)) {
      this.userService.saveUser(user).then(
        () => {
          this.loadingSpinner = false;
          console.log('Usuario registrado!');
          // Toast success
          this.toastr.success(
            'Usuario añadido a Firebase!, Tarjeta registrada.'
          );
          // Limpiamos el formulario.
          this.form.reset();
        },
        (error) => {
          this.loadingSpinner = false;
          this.toastr.error('Ha ocurrido un error.', `${error}`);
          console.log(error);
        }
      );
    } else {
      this.loadingSpinner = false;
      this.toastr.error(
        'El email ya existe.',
        'El usuario ya ha sido registrado'
      );
    }
  }
  /**
   * Indica si el email esta disponible o no.
   * @param email Email a buscar en Firebase.
   * @returns Devuelve un booleano 
   */
  checkEmailAvailability(email: string): boolean {
    let available: boolean = true;
    this.emailsDatabase.forEach((el) => {
      if (el == email) available = false;
    });
    return available;
  }
  /**
   * Este método carga todos los emails de la base de datos al atributo emailsDatabase.
   * @returns Una promesa cuando ya haya cargado todos los emails.
   */
  getEmails() {
    return new Promise((resolve, reject) => {
      console.log('Cargando emails de Firebase ...');
      this.userService.getUsers().subscribe((doc) => {
        doc.forEach((user: any) => {
          this.emailsDatabase.push(user.payload.doc.data().email);
        });
        resolve (this.emailsDatabase);
      })
    });
  }
  /**
   * Esta función se ejecuta cuando se accede a la pagina.
   */
  ngOnInit() {
    // Carga todos los emails de firebase al entrar en esta pagina.
    this.getEmails().then(data => {});
  }
}
