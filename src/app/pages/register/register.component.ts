import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  error: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    public auth: AngularFireAuth,
    private router: Router
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
  async register() {
    this.loadingSpinner = true;
    await this.auth.createUserWithEmailAndPassword(
        this.form.value.email,
        this.form.value.password
      )
      .then(() => {
        this.toastr.success('Usuario añadido a Firebase!, Tarjeta registrada.');

        this.loadingSpinner = false;
        this.auth.signOut();
        this.router.navigate(['/iniciar-sesion']);
      })
      .catch( (error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/email-already-in-use') {
          this.toastr.error(
            'El email ya existe.',
            'El usuario ya ha sido registrado'
          );
        } else {
          alert(errorMessage);
        }
        console.log(error);
        this.loadingSpinner = false;
        this.form.reset();
      });
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
        resolve(this.emailsDatabase);
      });
    });
  }
  /**
   * Esta función se ejecuta cuando se accede a la pagina.
   */
  ngOnInit() {
    // Carga todos los emails de firebase al entrar en esta pagina.
    this.getEmails().then((data) => {});
  }
}
