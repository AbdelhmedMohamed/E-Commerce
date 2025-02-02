import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ProductDetailsComponent } from './product-details/product-details.component' ;
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from './search.pipe';

import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { AddheaderInterceptor } from './addheader.interceptor';
import { PayComponent } from './pay/pay.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandsComponent,
    ProductsComponent,
    CategoriesComponent,
    CartComponent,
    RegisterComponent,
    LoginComponent,
    NotfoundComponent,
    NavbarComponent,
    FooterComponent,
    ProductDetailsComponent,
    SearchPipe,
    PayComponent
  ],
  imports: [
    BrowserModule, FormsModule ,   NgxAwesomePopupModule.forRoot(), 
    DialogConfigModule.forRoot(), 
    ConfirmBoxConfigModule.forRoot(), 
    ToastNotificationConfigModule.forRoot()  ,
    AppRoutingModule ,ReactiveFormsModule ,HttpClientModule ,RouterModule ,BrowserAnimationsModule ,CarouselModule 

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS ,
      useClass :AddheaderInterceptor ,
      multi :true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
