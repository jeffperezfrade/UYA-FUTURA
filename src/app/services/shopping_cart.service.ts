import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private firebase: AngularFirestore) {}

  addProduct(product: Product, userId: string): Promise<any> {
    console.log(`Agregando a ruta -> users/${userId}/shopping_cart/`);
    return this.firebase.collection(`users/${userId}/shopping_cart`).doc(product.id).set({
      name: product.name,
      description: product.description,
      price: product.price,
      img_url: product.img_url
    });
  }

  deleteProduct(userId: string, productId: string): Promise<any> {
    return this.firebase.collection(`users/${userId}/shopping_cart`).doc(productId).delete();
  }

  getProducts(userId: string): Observable<any> {
    // snapshotChanges() se ejecuta cada vez que detecta un cambio.
    return this.firebase.collection(`users/${userId}/shopping_cart`).snapshotChanges();
  }
}
