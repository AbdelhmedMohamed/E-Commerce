import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  customOptions: OwlOptions = {
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



   pId:string ="" ;

   oneProduct! : any ;
   

  constructor( private _ToastEvokeService:ToastEvokeService, private _CartService:CartService , private _ActivatedRoute:ActivatedRoute , private _ProductsService:ProductsService){} 

  ngOnInit(): void {



    // =================================================


    this._ActivatedRoute.params.subscribe(
      (p)=>{this.pId =p["id"] ;
    

      this._ProductsService.getSpecProdAPI(this.pId).subscribe({
        next : (res) => {
            this.oneProduct =res.data ; 
            console.log(this.oneProduct);
            
        }
      })
    
    
    
    }    )  

        
  }


  
  addToCartBTN(pID:string){
    this._CartService.addToCartAPI(pID).subscribe({
      next : (res) => {
        
      
         // Type SUCCESS
         this._ToastEvokeService.success('Success',res.message ).subscribe();

         this._CartService.cartItemsNumbers.next(res.numOfCartItems)

      },
      error:(err)=>{console.log(err);
       }
    })
  }


 
}