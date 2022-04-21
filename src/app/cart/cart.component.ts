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
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
 this.userName=JSON.parse(sessionStorage.getItem('user')|| '{}');
 this.phoneNumber=this.userName['Data'].user_details.user_phone;
 this.otpNumber =this.userName['Data'].user_details.otp;
    console.log(this.userName)
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
}
