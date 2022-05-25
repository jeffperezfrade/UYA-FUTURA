import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private firebase: AngularFirestore) {}

  addProduct(product: Product, userId: string) {
    console.log(`users/${userId}/shopping_cart/`);
    this.firebase.collection(`users/${userId}/shopping_cart`).doc(product.id).set({
      name: product.name,
      description: product.description,
      price: product.price,
      img_url: product.img_url
    })
    .then(res => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  deleteProduct(userId: string, productId: string) {
    this.firebase.collection(`users/${userId}/shopping_cart`).doc(productId).delete()
      .then(() => {
        console.log('Producto eliminado correctamente.');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getProducts(userId: string): Observable<any> {
    // snapshotChanges() se ejecuta cada vez que detecta un cambio.
    return this.firebase.collection(`users/${userId}/shopping_cart`).snapshotChanges();
  }
}
