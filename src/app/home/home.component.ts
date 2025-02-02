import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { Product } from '../product';
import { CartService } from '../cart.service';
import { Subscriber } from 'rxjs';

// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {  customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
   
  },
  nav: true
}

    inputvalue:string ="" ; 

    allProducts:Product[]= [] ;

    constructor(private toastEvokeService: ToastEvokeService , private _CartService:CartService  , private _ProductsService:ProductsService ){}

  ngOnInit(): void {
 
    localStorage.setItem("carrentpage" , "/home") ;


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
