import { Component, OnInit } from '@angular/core';
import { Sidenav } from 'materialize-css';
import { Dropdown } from 'materialize-css';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  userLogged = this.authService.getUserLogged();
  isLogged = this.authService.isLogged();

  constructor(private authService: AuthService) {
    console.log(this.userLogged);
  }

  async signOut(){
    console.log(`Cerrando Sesión ...`);
    this.authService.signOut().then(res => {
      console.log(res);
    })
  }

  ngOnInit(): void {
    // Inicializamos los objetos del Sidenav (mobile responsive) y el Dropdown.
    var sidenavElement = document.querySelectorAll('.sidenav');
    var dropdownElement = document.querySelectorAll('.dropdown-trigger');
    var sidenavInstance = M.Sidenav.init(sidenavElement);
    // Añadimos opciones al Dropdown.
    var dropdownInstance = M.Dropdown.init(dropdownElement, {
      coverTrigger: false,
      closeOnClick: false
    });
  }
}
