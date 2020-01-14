import { Component, ViewChild,OnInit } from '@angular/core';
import { Product } from '../product/product';
import { MatSidenav } from '@angular/material/sidenav';
import { ProductService } from '../product/product.service';
import { FormControl } from '@angular/forms';
import { map, flatMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Category } from '../categorias/category';
import { CategoriesService } from '../categorias/categorias.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
   products: Product[];
   autocompleteControl = new FormControl();
   filteredProducts: Observable<Product[]>;
    user:string = "Daniel";
    productCategory:Category[];

    @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
    reason = '';

    constructor(private productService: ProductService, private router:Router, private categoriesService: CategoriesService){}

    ngOnInit(){
      this.filteredProducts = this.autocompleteControl.valueChanges
          .pipe(
              map( value => typeof value === 'string' ? value : value.productName),
              flatMap( value => value ? this._filter(value) : [])
          );
      }

      private _filter(value: string): Observable<Product[]>{
          const filterValue = value.toLowerCase();
          return this.productService.filteredProducts(filterValue);
      }

      showProductName(product ? : Product): string | undefined{
        return product ? product.productName : undefined;
      }

      selectProduct(event: MatAutocompleteSelectedEvent):void{
        let product = event.option.value as Product;
        console.log(product);
        this.autocompleteControl.setValue('');
        event.option.focus();
        event.option.deselect();
        this.router.navigate(['/productsPage/'+product.productId]);
      }

      searchProductByCategory(){
        this.categoriesService.getAllProductByCategory().subscribe(
          (response) =>{
            this.productCategory=response.content as Category[];
          }
        );
      }

    close(reason: string) {
        this.reason = reason;
        this.sidenav.close();
    }
    shouldRun = true;

}
