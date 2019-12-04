import { Component, OnInit } from '@angular/core';
import { ProductRepositoryService } from '../model/product-repository.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  selectedCategory : string = null;
  productsPerPage : string = "4";
  selectedPage : number = 1;

  constructor(private repository : ProductRepositoryService) { }

  ngOnInit() {
  }

  private getProductsPerPage() : number {
    return parseInt(this.productsPerPage);
  }

  getProducts() {
    const itemsPerPage = parseInt(this.productsPerPage)
    return this.repository.getProducts(this.selectedCategory)
    .slice(
      ((this.selectedPage - 1) * this.getProductsPerPage()),
      (this.selectedPage * this.getProductsPerPage()),
    )
  }
  
  getCategories() {
    return this.repository.getCategories();
  }

  changeCategory(cat: string) {
    this.selectedCategory = cat ? cat : null;
  }

  changePage(page: number) {
    this.selectedPage = page;
  }

  getPages() : number[] {
    const numPages = Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.getProductsPerPage())
    return Array(numPages).fill(0).map((v,i) => i + 1);
  }

  highlightCategory(val: string) : boolean {
    return this.selectedCategory == val;
  }
}
