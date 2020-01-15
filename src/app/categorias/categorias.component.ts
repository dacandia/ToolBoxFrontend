import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product/product.service';
import { Product } from '../product/product';
import { ProductCategory } from '../product/productCategory';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  
  categoryName:string;
  products: ProductCategory[];
  constructor( 
    private activatedRoute: ActivatedRoute, 
    private productService: ProductService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params =>{
        this.categoryName = params.get('category');
        this.productService.getProductsByCategory(this.categoryName).subscribe(
          response => {
            this.products = response as ProductCategory[];
            console.log(this.products)
          }
        );
      }
    );
  }

}
