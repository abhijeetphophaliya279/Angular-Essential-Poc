import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from '../product';
import { ProductsService } from '../products.service';


@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle:string = "Product Detail";
  product : IProduct ;
  errorMessage = '';
  imageWidth: number = 200;
  imageHeight: number = 200;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      product => this.product = product,
      error => this.errorMessage = <any>error);
      console.log("Product " + JSON.stringify(this.product) )
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
