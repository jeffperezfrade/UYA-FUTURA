import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firebase: AngularFirestore) { }

  saveUser(user: User): Promise<any> {
    // Agrega un nuevo usuario a la colección de usuarios.
    // Si la colección no existe la crea y añade el usuario.
    return this.firebase.collection('user').add(user);
  }

}
