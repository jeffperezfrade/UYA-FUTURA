import { Component, OnInit } from '@angular/core';
import { Sidenav } from 'materialize-css';
import { Dropdown } from 'materialize-css';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    // Inicializamos los objetos del Sidenav (mobile responsive) y el Dropdown.
    var sidenavElement = document.querySelectorAll('.sidenav');
    var dropdownElement = document.querySelectorAll('.dropdown-trigger');
    var sidenavInstance = M.Sidenav.init(sidenavElement);
    var dropdownInstance = M.Dropdown.init(dropdownElement);
  }
}
