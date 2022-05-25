import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping_cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  
  userCollectionId: string = '';
  cartProducts: Product[] = [];
  loadingSpinner: boolean = false;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private auth: AuthService,
    private userService: UserService) {}

  getProducts() {
    return new Promise((resolve, reject) => {
      this.shoppingCartService.getProducts(this.userCollectionId).subscribe(doc => {
        doc.forEach((product: any) => {
          this.cartProducts.push(new Product(
            product.payload.doc.data().name,
            product.payload.doc.data().price,
            product.payload.doc.data().description,
            product.payload.doc.data().img_url,
            product.payload.doc.id,
          ));
        });
        resolve(this.cartProducts);
      });
    })
  }

  getUserCollectionId() {
    return new Promise((resolve, reject) => {
      this.auth.getUserLogged().subscribe(userLogged => {
        if (userLogged?.email != null) {
          this.userService.getUsers().subscribe((users) => {
            users.forEach((user: any) => {
              if (userLogged.email == user.payload.doc.data().email) {
                this.userCollectionId = user.payload.doc.id;
              }
            });
            resolve(this.userCollectionId);
          });
        }
      });
    });
  }

  deleteProduct(productId: string | undefined) {
    this.cartProducts.forEach((product) => {
      
    });
  }

  ngOnInit(): void {
    this.loadingSpinner = true;
    this.getUserCollectionId().then(() => {
      this.getProducts().then((res) => {
        console.log(res);
        this.loadingSpinner = false;
      })
    })
  }
}
