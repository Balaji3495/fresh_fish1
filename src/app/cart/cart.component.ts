import { Component, OnInit } from '@angular/core';
import {PhoneComponent} from "../phone/phone.component"
import { TemplatePortalDirective, ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { RouterModule, Routes, Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  userName:any;
  phoneNumber:any;
  otpvalue:any;
  otpNumber:any;
  cartProduct:any;
  totalAmount:any;
  amt:any;
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: 'my-super-box-class',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
    
    },
  };
  constructor( private overlay: Overlay,private route: Router) { }
  popup:boolean =false;
  otp:boolean=false;
  ngOnInit(): void {
    var log=JSON.parse(sessionStorage.getItem('login')|| '{}');
    if(log==true){
      this.userName=JSON.parse(sessionStorage.getItem('user')|| '{}');

      this.phoneNumber=this.userName['Data'].user_details.user_phone;
      this.otpNumber =this.userName['Data'].user_details.otp;
    }

    this.cartProduct=JSON.parse(sessionStorage.getItem('cart')|| '{}');
    console.log(this.cartProduct)
    this.amountFuction();
    this.amt=this.totalAmount 

 
;
  }
  openComponentOverlay() {
  
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      width: '200px',
      height: '200px'
      
    });

  
    const popupComponentPortal = new ComponentPortal(PhoneComponent);

    overlayRef.attach(popupComponentPortal);
    
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();

    });
  }
  handleFillEvent(value: string): void {
    console.log(value);
    this.otpvalue=value;
  }
  phone()
  {
    this.popup=true;
  }
  save()
  {
    this.popup=false;
    this.otp=true;
  }
  verify(){
    console.log(this.otpNumber)
    console.log(this.otpvalue)
    if(this.otpNumber==this.otpvalue){
      this.otp=false;
      
    }
  }
  remove(){
    this.otp=false;
  }
  location(){
    this.route.navigate(['/map'])
  }
  back(){
    this.route.navigate(['/head'])
  }

  increment(i:any){
    sessionStorage.removeItem('cart')
    console.log(i.quantity)
    
   i.quantity=i.quantity+1;
   var valueAmount= i.product_price;
  i.amount= valueAmount *i.quantity
  
  
  console.log(this.cartProduct)
  
  this.amountFuction();
  this.amt=this.totalAmount;

  }
  decrement(i:any){
    sessionStorage.removeItem('cart')
    i.quantity=i.quantity-1;
    var valueAmount= i.product_price;
    var data=this.totalAmount
    i.amount= valueAmount *i.quantity
    this.totalAmount=data-i.amount
    let dta = this.cartProduct.findIndex((pl:any) => pl.quantity === 0);
    console.log(dta)   
    if (dta > -1) {
       this.cartProduct.splice(dta, 1);
      console.log('remove',this.cartProduct)
  
    }
    this.amountFuction();
  this.amt=this.totalAmount;
  sessionStorage.setItem('cart', JSON.stringify(this.cartProduct));
  }
  amountFuction(){
    var dd=this.cartProduct
   var data =sessionStorage.setItem('cart1', JSON.stringify(dd));
    console.log(data)
    this.totalAmount =  0;
   for(let count=0;count<this.cartProduct.length;count++){
     this.totalAmount +=this.cartProduct[count].amount;
   }
   return this.totalAmount;
   
   
 }
}
