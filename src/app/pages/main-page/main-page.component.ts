import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  productsDatabase: Product[] = [];
  loadingSpinner: boolean = false;

  constructor(private productService: ProductService) { }

  getProducts() {
    return new Promise((resolve, reject) => {
      console.log('Cargando productos de Firebase ...');
      this.productService.getProducts().subscribe((doc) => {
        doc.forEach((product: any) => {
          this.productsDatabase.push(new Product(
            product.payload.doc.data().name,
            product.payload.doc.data().price,
            product.payload.doc.data().description,
            product.payload.doc.data().img_url
          ));
        });
        resolve(this.productsDatabase);
      });
    });
  }

  ngOnInit(): void {
    this.loadingSpinner = true;
    // Carga todos los productos de firebase al entrar en esta pagina.
    this.getProducts().then((data) => {
      console.log(data);
      this.loadingSpinner = false;
    });
  }
}
