import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';



@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent {

  carrentCartId : string ="" ;

      constructor(private _OrdersService:OrdersService , private _ActivatedRoute:ActivatedRoute ){}

      ngOnInit(): void {
       this._ActivatedRoute.params.subscribe(
        (p)=>{

       this.carrentCartId = p['id'] ;
       console.log(this.carrentCartId);
       
       
        }
       )
        
      }


  adressForm :FormGroup = new FormGroup({

    details: new FormControl(null) ,
    phone: new FormControl(null) ,
    city: new FormControl(null) ,

  })

  adressFormSubmit(){
    console.log( this.adressForm.value) ;

    this._OrdersService.checkOut(this.carrentCartId , this.adressForm.value).subscribe({
      next : (res)=>{

        window.location.href = res.session.url
        console.log(res.session.url)
      
      
      } ,
      error : (err)=>{console.log(err)   
      }
    })
    

  }

}
