import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firebase: AngularFirestore) { }

  saveProduct(product: Product): Promise<any> {
    // Agrega un nuevo usuario a la colección de usuarios.
    // Si la colección no existe la crea y añade el usuario.
    return this.firebase.collection('products').add(product);
  }

  getProducts(): Observable<any> {
    // snapshotChanges() se ejecuta cada vez que detecta un cambio.
    return this.firebase.collection('products').snapshotChanges();
    // return this.firebase.collection('products').get();
  }

}
