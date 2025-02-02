import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
constructor(private _CartService:CartService  , private _AuthService:AuthService , private _Router:Router){}

  cartItemNumberNav: string = "" 
  isLogin:boolean =false ;

  ngOnInit(): void {
    
  this._CartService.cartItemsNumbers.subscribe(()=>{
    this.cartItemNumberNav = this._CartService.cartItemsNumbers.getValue() ;
  })


    this._AuthService.userDataVar.subscribe(()=>{

      if(this._AuthService.userDataVar.getValue() == null ){
        this.isLogin =false ;

      }else{
        this.isLogin = true ;
      }


    })
    
  }






  logout(){
    localStorage.removeItem("usertoken") ;

    this._AuthService.saveDataMethod() ;

    this._Router.navigate(['/login']) ;
    
    localStorage.setItem("usertoken", " ");

  }

}
