
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { Product } from '../product';
import { CartService } from '../cart.service';
import { Subscriber } from 'rxjs';

// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {


  inputvalue:string ="" ; 

  allProducts:Product[]= [] ;

  constructor(private toastEvokeService: ToastEvokeService , private _CartService:CartService  , private _ProductsService:ProductsService ){}

ngOnInit(): void {

  localStorage.setItem("carrentpage" , "/products")


    this._ProductsService.getProductsAPI().subscribe({
      next :(res) =>{

        this.allProducts = res.data ; 

      } ,
       error: (err) => { }

    })



  
}



addToCartBTN(pID:string){
  this._CartService.addToCartAPI(pID).subscribe({
    next : (res) => {
      
    
       // Type SUCCESS
       this.toastEvokeService.success('Success',res.message ).subscribe();

       this._CartService.cartItemsNumbers.next(res.numOfCartItems)

    },
    error:(err)=>{console.log(err);
     }
  })
}



}
