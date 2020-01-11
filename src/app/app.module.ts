import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
/**
 * Components
 */
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CategoriasComponent} from './categorias/categorias.component';
import { FormProductComponent } from './product/formproduct.component';
import { PaginatorComponent } from './paginator/paginator.component';
import {ImageProductComponent} from './product/images/imageproduct.component';
/**
 * Services
 */
import { ProductService } from './product/product.service';
/**
 * Material Modules
 */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FileUploadModule} from 'primeng/fileupload';
import {AccordionModule} from 'primeng/accordion';
import {CarouselModule} from 'primeng/carousel';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

const routes: Routes = [
  {path: '', redirectTo: '/LandingPage', pathMatch: 'full'},
  {path: 'products', component: ProductComponent},
  {path: 'productsPage', component: ProductPageComponent},
  {path: 'landing_page', component: LandingPageComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'products/page/:page', component: ProductComponent},
  {path: 'products/form', component: FormProductComponent},
  {path: 'products/form/:id', component: FormProductComponent},
  {path: 'products/upload/:id', component: ImageProductComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    FooterComponent,
    ProductComponent,
    FormProductComponent,
    PaginatorComponent,
    ImageProductComponent,
    LandingPageComponent,
    CategoriasComponent,
    ProductPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    AccordionModule,
    CarouselModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
