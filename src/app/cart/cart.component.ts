import { Component, OnInit } from '@angular/core';
import {PhoneComponent} from "../phone/phone.component"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemplatePortalDirective, ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { RouterModule, Routes, Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
// import {} from 'googlemaps';

import { DashboardService } from 'src/app/provider/dashboard.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  user:any;
  phoneForm:FormGroup;
  userName:any;
  phoneNumber:any;
  otpvalue:any;
  otpNumber:any;
  cartProduct:any;
  totalAmount:any;
  deliveryFee=50;
  packagingFee=0;
  tax=100;
  toPay:any;
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
  constructor( private overlay: Overlay,private dashboardService:DashboardService,private route: Router,private formBuilder:FormBuilder) {
    this.phoneForm = this.formBuilder.group({
 
      user_phone:['',Validators.required],
      ref_code:  [''],
        
    })
   }
  popup:boolean =false;
  otp:boolean=false;
  userId:any;
  userHead:boolean=false;
  ngOnInit(): void {
   
    var log=JSON.parse(sessionStorage.getItem('login')|| '{}');
    if(log==true){
      this.userHead=true;
      this.userName=JSON.parse(sessionStorage.getItem('user')|| '{}');
      console.log(this.userName)
this.user=this.userName['Data'].user_details.first_name;
      this.phoneNumber=this.userName['Data'].user_details.user_phone;
      this.otpNumber =this.userName['Data'].user_details.otp;
    }

    this.cartProduct=JSON.parse(sessionStorage.getItem('cart')|| '{}');
    console.log(this.cartProduct)
    this.amountFuction();
    this.amt=this.totalAmount;
    this.toPayAmount()

 


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
    if (this.phoneForm.valid) {
   
      sessionStorage.setItem('login', JSON.stringify(true));
      this.dashboardService.phoneLogin(this.phoneForm.value).subscribe((data:any)=>{
        if(data['Status']=="Success"){
          this.popup=false;
          this.otp=true;
        
        this.phoneNumber=data['Data'].user_details.user_phone;
        this.otpNumber =data['Data'].user_details.otp;
        this.userName =data['Data'].user_details.first_name;
        this.userId=data['Data'].user_details._id
        sessionStorage.setItem('user', JSON.stringify(data));
        }
      });
    
      this.dashboardService.dashboardList(this.userId).subscribe((data:any) => {
        
      });
    }

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
    
   i.quantity=i.quantity+0.5;
   var valueAmount= i.product_price;
  i.amount= valueAmount *i.quantity
  
  
  console.log(this.cartProduct)
  
  this.amountFuction();

  this.amt=this.totalAmount;
  this.toPayAmount();

  }
  decrement(i:any){
    sessionStorage.removeItem('cart')
    i.quantity=i.quantity-0.5;
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
  this.toPayAmount();
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

 toPayAmount(){
  this.toPay=this.amt+this.deliveryFee+this.tax+this.packagingFee;
  console.log( this.toPay)

 }
 logout(){
  sessionStorage.setItem('login', JSON.stringify(false));
  sessionStorage.removeItem('user');
this.userHead=false;
}
 
}
