import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemsNumbers:BehaviorSubject<any> = new BehaviorSubject(null)

  baseURL: string = "https://ecommerce.routemisr.com";

  constructor(private _HttpClient:HttpClient) { }

  userHeader:any = {token : localStorage.getItem("usertoken") }

 
   addToCartAPI(pId:string):Observable<any>
   {
    return this._HttpClient.post(`${this.baseURL}/api/v1/cart`,{ productId : pId } ,{

      headers :this.userHeader  ,

    })
   }




   updateCartItemQuAPI(pId:string ,pCount:string):Observable<any>
   {
    return this._HttpClient.put(`${this.baseURL}/api/v1/cart/${pId}`, {count:pCount} ,{
      headers:this.userHeader ,
    })
   }


   getAllCartItemsAPI():Observable<any>
   {
    return this._HttpClient.get(`${this.baseURL}/api/v1/cart`,{

      headers :this.userHeader 

    }) 
   }


   
   removeItemAPI(pId:string):Observable<any>
   {
    return this._HttpClient.delete(`${this.baseURL}/api/v1/cart/${pId}`,{

      headers :this.userHeader  ,

    })
   }



   clearCartAPI():Observable<any>
   {
    return this._HttpClient.delete(`${this.baseURL}/api/v1/cart`,{

      headers :this.userHeader  ,

    })
   }






}
