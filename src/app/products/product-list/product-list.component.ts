import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { ProductsService } from '../products.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductsService]
})
export class ProductListComponent implements OnInit {

  pageTitle: string = "Product List!";
  clickMessage: string;
  imageWidth: number = 70;
  imageHeight: number = 70;
  showImage: boolean = false;
  filteredProducts: IProduct[];
  products: IProduct[];
  errorMessage: string;

  constructor(private productsService: ProductsService) {
    this.listFilter = '';
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
  }

  

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  toggleImage(): void {
    console.log('Toggle Image');
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1)
  }

  onNotify(message: string): void {
    console.log('Message in product list' + message);
    this.clickMessage = message;
  }

  clearFilter(): void {
    this.listFilter = '';
  }
}
