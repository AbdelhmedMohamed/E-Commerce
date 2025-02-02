import { Component } from '@angular/core';
import { CartService } from '../cart.service';

import { Product } from '../product';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  constructor(private toastEvokeService: ToastEvokeService ,private _CartService:CartService){}

  cartItem:any ;
  totalPrice: string ="" ;
  cartId :string = "" ;

  ngOnInit(): void {

    this._CartService.getAllCartItemsAPI().subscribe({
      next :(res)=>{
        this.cartItem = res.data.products ;
        this.totalPrice = res.data.totalCartPrice ;
        this.cartId = res.data._id
      
        
      }
    })


 
    localStorage.setItem("carrentpage" , "/cart")

    
  }

  removeItemBtn(pId:string){
    this._CartService.removeItemAPI(pId).subscribe({
      next :(res) => {

          // Type SUCCESS
          this.toastEvokeService.success('Success',"Item Deleted Successfully " ).subscribe();

          this._CartService.cartItemsNumbers.next(res.numOfCartItems)
         this.cartItem = res.data.products ;

      } ,

      error : (err) =>{console.log(err);

      }
      
    })

  }


  upDateQeBtn(whichBtn:string ,pCount:string ,pId:string )
  {
      if(whichBtn == "plus"){
        pCount = (Number(pCount) + 1).toString() ; 
      }else{
        pCount = (Number(pCount) - 1).toString() ; 
        if(Number(pCount) == 0 ){

          this.removeItemBtn(pId) ;
          
        }
      }

      this._CartService.updateCartItemQuAPI(pId , pCount).subscribe({

        next :(res)=>{
          this.cartItem = res.data.products
         } ,
        error :(err)=>{console.log(err);
        }
      })
  }

}
