
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
import {HttpClientModule} from '@angular/common/http';
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
import {LandingService} from './landing-page/landing.service'

const routes: Routes = [
  {path: '', redirectTo: '/LandingPage', pathMatch: 'full'},
  {path: 'products', component: ProductComponent},
  {path: 'productsPage', component: ProductPageComponent},
  {path: 'LandingPage', component: LandingPageComponent},
  {path: 'categorias', component: CategoriasComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    FooterComponent,
    ProductComponent,
    LandingPageComponent,
    CategoriasComponent,
    ProductPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    RouterModule.forRoot(routes)
  ],
  providers: [LandingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
