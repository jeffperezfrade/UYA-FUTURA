import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping_cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  userCollectionId: string = '';
  productsDatabase: Product[] = [];
  loadingSpinner: boolean = false;

  constructor(
    private productService: ProductService,
    private auth: AuthService,
    private userService: UserService,
    private shoppingCartService: ShoppingCartService,
    private toastr: ToastrService) { }

  getProducts() {
    return new Promise((resolve, reject) => {
      console.log('Cargando productos de Firebase ...');
      this.productService.getProducts().subscribe((doc) => {
        doc.forEach((product: any) => {
          this.productsDatabase.push(new Product(
            product.payload.doc.data().name,
            product.payload.doc.data().price,
            product.payload.doc.data().description,
            product.payload.doc.data().img_url,
            product.payload.doc.id,
          ));
        });
        resolve(this.productsDatabase);
      });
    });
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

  addCart(product: Product) {
    this.shoppingCartService.addProduct(product, this.userCollectionId).then(() => {
      this.toastr.success('Añadido al carrito!', '', {timeOut: 800});
    })
    .catch((err) => {
      console.log(err);
      this.toastr.error('Ha ocurrido un error');
    })
  }

  ngOnInit(): void {
    this.loadingSpinner = true;
    // Carga todos los productos de firebase al entrar en esta pagina.
    this.getProducts().then((data) => {
      console.log(data);
      this.getUserCollectionId().then(() => {});
      this.loadingSpinner = false;
    });

  }
}
