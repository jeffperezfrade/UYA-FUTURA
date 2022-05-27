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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Inicializamos los objetos del Sidenav (mobile responsive).
    var sidenavElement = document.querySelectorAll('.sidenav');
    var sidenavInstance = M.Sidenav.init(sidenavElement);
  }
}
