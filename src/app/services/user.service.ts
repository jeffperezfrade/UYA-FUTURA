import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firebase: AngularFirestore) { }

  saveUser(user: User): Promise<any> {
    // Agrega un nuevo usuario a la colección de usuarios.
    // Si la colección no existe la crea y añade el usuario.
    return this.firebase.collection('users').add(user);
  }

  getUsers(): Observable<any> {
    // snapshotChanges() se ejecuta cada vez que detecta un cambio.
    return this.firebase.collection('users').snapshotChanges();
    // return this.firebase.collection('user').get();
  }
}
