import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  totalPrice: number = 0;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private auth: AuthService,
    private userService: UserService,
    private toastr: ToastrService) {}

  getProducts() {
    return new Promise((resolve, reject) => {
      this.shoppingCartService.getProducts(this.userCollectionId).subscribe(doc => {
        this.cartProducts = [];
        this.totalPrice = 0;
        doc.forEach((product: any) => {
          this.totalPrice += Number(product.payload.doc.data().price);
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
    if (productId != undefined) {
      this.shoppingCartService.deleteProduct(this.userCollectionId, productId).then(() => {
        this.getProducts().then(res => {
          console.log(res);
        });
      });
    }
  }

  buyCart() {
    this.cartProducts.forEach((product) => {
      if (product.id != undefined) {
        this.shoppingCartService.deleteProduct(this.userCollectionId, product.id).then(() => {});
      }
    });
    this.toastr.success('Productos comprados con éxito!', '', {timeOut: 800});
    this.getProducts().then(res => {
      console.log(res);
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
