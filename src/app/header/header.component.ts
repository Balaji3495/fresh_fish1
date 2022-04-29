import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from "jquery";
import { RouterModule, Routes, Router } from '@angular/router';
import { DashboardService } from 'src/app/provider/dashboard.service';
import { NgxOtpInputConfig } from 'ngx-otp-input';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sticky: any;
  scroll: any;
  menubar: boolean=false;
  LoginForm:FormGroup;
  phoneForm:FormGroup;
  phoneNumber:any;
  totalAmount=0;
  log:boolean=false;
  amt:any;
  otpNumber:any;
  userId:any;
  userName:any;
  otpDAta:any;
  otpvalue:any;
  addTotal:any=[];
  quantity : number=0;
  cartProduct:any=[];
  userHead:boolean =false;
  formInput = ['input1', 'input2', 'input3', 'input4', ];
  signup:boolean=false;  otp:boolean=false;
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: 'my-super-box-class',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
    
    },
  };
  constructor(private route:Router,private dashboardService:DashboardService,private formBuilder:FormBuilder) { 
    this.LoginForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      user_phone:['', Validators.required,],
      last_name: [''],
      date_of_reg:new Date(),
            user_type:  ['1'],
            ref_code:  [''],
    });
    this.phoneForm = this.formBuilder.group({
 
      user_phone:['',Validators.required],
      ref_code:  [''],
        
    })
  };
  selectedItem:any ;
  scrollDistance: any;
  target: any;
  use:any;
  user:any
  userform:any=[];
  bannerImg:any=[];
  menuList:any=[];
  Product_details:any=[];
  elementPosition:any;
  scrollDist:any;
  Recom:any=[];
  ngOnInit(): void {
    
    console.log(this.selectedItem)
    var log=JSON.parse(sessionStorage.getItem('login')|| '{}');
    if(log==true){
     
      this.user=JSON.parse(sessionStorage.getItem('user')|| '{}');
      console.log(this.userName)
this.userName=this.user['Data'].user_details.first_name;
      this.phoneNumber=this.user['Data'].user_details.user_phone;
      this.otpNumber =this.user['Data'].user_details.otp;
      this.userHead=true;
    }

var data= JSON.parse(sessionStorage.getItem('cart1')|| '{}');
console.log(data)
if (0<data.length){
  this.cartProduct=data;
  console.log("ssddd",this.cartProduct)
  this.amountFuction();
  this.amt=this.totalAmount;
}
var same=JSON.parse(sessionStorage.getItem('cart')|| '{}');
console.log(same)
if(0<same.length){
  this.cartProduct=same;
  console.log("sddd",this.cartProduct)
  this.amountFuction();
  this.amt=this.totalAmount
}
console.log(data.length)
// sessionStorage.removeItem('cart')
console.log("sd",this.cartProduct)
  
    this.userform.push(
      {
        "user_id":""
      }
      
    )

this.dashboardService.dashboardList(this.userform).subscribe((data:any) => {
  console.log("sda",data)
  this.bannerImg=data['Data'].Banner_details;
  this.menuList=data['Data'].product_cate;
  this.Recom=data['Data'].Recom;
  this.Product_details=data['Data'].Product_details
  console.log("sda",this.bannerImg)
});


    let obj =this;
    var x = 0;
    $(document).ready(function(event){
      $(window ).scroll(function(){
        $(".website-header-main-container").css( {"margin-top":-window.scrollY});
      });
      $('html, body').scrollLeft(4000)
    });
 




$(document).ready(function() {
  
  // $('a[href*=#]').bind('click', function(e) {
  //   alert("i");
  //     e.preventDefault(); // prevent hard jump, the default behavior

  //     obj.target = $(this).attr("href"); // Set the target as variable

  //     // perform animated scrolling by getting top-position of target-element and set it as scroll target
  //     $('html, body').stop().animate({
  //         scrollTop: obj.target.offset().top
  //     }, 600, function() {
  //         location.hash = obj.target; //attach the hash (#jumptarget) to the pageurl
  //     });

  //     return false;
  // });

  
});


$(window).scroll(function() {
  obj.scrollDistance = $(window)?.scrollTop();

  $('.subcategory-items-wrap').each(function(i) {
  
    
      if ($(this).position().top <= obj.scrollDistance) {
        // $('.menu-list li').eq(i).addClass('active');
          $('.menu-list li.active').removeClass('active');
          $('.menu-list li').eq(i).addClass('active');
      }
     
  });
}).scroll();
  






}
showData()
{
  this.menubar=true;
}
closeData()
{
  this.menubar=false;
}
checkout(){
  this.route.navigate(['/cart']);
  sessionStorage.setItem('cart', JSON.stringify(this.cartProduct));

}


popsignup()
{
  this.signup=true;
}
remove(){
  this.signup=false;
}
removelog()
{
  this.log=false;
}


continue()

{
  sessionStorage.removeItem('user');
  if (this.LoginForm.valid) {
  this.signup=false;
  this.otp=true;
  sessionStorage.setItem('login', JSON.stringify(true));
  this.dashboardService.login(this.LoginForm.value).subscribe((data:any)=>{
    this.phoneNumber=data['Data'].user_details.user_phone;
    this.otpNumber =data['Data'].user_details.otp;
    this.userName =data['Data'].user_details.first_name;
    this.userId=data['Data'].user_details._id
    sessionStorage.setItem('user', JSON.stringify(data));

  });
console.log(this.userName)
  this.dashboardService.dashboardList(this.userId).subscribe((data:any) => {
    
  });
}
console.log(this.LoginForm.value)
}
verify(){
  console.log(this.otpNumber)
  console.log(this.otpvalue)
  if(this.otpNumber==this.otpvalue){
    this.otp=false;
    this.userHead=true;
  }
}
keyUpEvent(e:any){
  console.log(e)
  this.otpDAta=e;

}
otpremove(){
  
  
  this.otp=false;
}


handleFillEvent(value: string): void {
  console.log(value);
  this.otpvalue=value;
}

//login
poplogin()
{
  this.otpNumber=123456;
  this.log=true;
}
increment(i:any){
  console.log(i)
  // this.quantity= this.quantity+1;
 i.quantity=i.quantity+1;
 var valueAmount= i.product_price;
i.amount= valueAmount *i.quantity


console.log(this.cartProduct)

this.amountFuction();
this.amt=this.totalAmount;
console.log(this.addTotal)

}

decrement(i:any){
  // this.quantity= this.quantity-1;
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
    sessionStorage.setItem('cart', JSON.stringify(this.cartProduct));
    sessionStorage.setItem('cart1', JSON.stringify(this.cartProduct));
  }
  this.amountFuction();
this.amt=this.totalAmount;

}

login(){
  if (this.phoneForm.valid) {
   
    sessionStorage.setItem('login', JSON.stringify(true));
    this.dashboardService.phoneLogin(this.phoneForm.value).subscribe((data:any)=>{
      if(data['Status']=="Success"){
        this.log=false;
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
addcart(item:any ,e:any){
  
   e.target.parentElement.classList.remove('add-quantity-btn')
   e.target.parentElement.parentElement.children[1].classList.remove('datainc')
  console.log(e.target.parentElement.parentElement.children[1].classList)
  const list = e.target.classList;
list.add("myStyle");
console.log("sd",e )
 this.quantity=1;
 

  console.log(item)
  this.totalAmount=item.product_price
  this.cartProduct.push({
   "product_title":item.product_title,
   "product_price":item.product_price,
    "quantity":this.quantity,
   "id":item._id,
   "amount":item.product_price,
  

  });
  this.amountFuction();
  this.amt=this.totalAmount;
    
 console.log (this.amt)
  console.log(this.cartProduct)
}
amountFuction(){

   this.totalAmount =  0;
  for(let count=0;count<this.cartProduct.length;count++){
    this.totalAmount +=this.cartProduct[count].amount;
  }
  return this.totalAmount;
 

}
activemenu(i:any)
{
  console.log("anu",i);
}
logout(){
  sessionStorage.setItem('login', JSON.stringify(false));
  sessionStorage.removeItem('user');
  this.userHead=false;
}
objControl:any
targetLi:any;
list:any
select(item:any,i:any){
  $('.menu-list li.active').removeClass('active');

  this.selectedItem=i;
  // document.getElementById('id').scrollIntoView({
  //   behavior: 'smooth'
  // });
  console.log( this.selectedItem)
  console.log( item.cat_id)
  var aa=document.getElementById(item.cat_id) as HTMLElement
  $('html,body').animate({
    scrollTop: aa.offsetTop},
    'smooth');
  // var aa=document.getElementById(item.cat_id) as HTMLElement ;
  // aa.scrollIntoView({
  //   behavior: 'smooth'
  // });;
  console.log( item.cat_id)
//   this.objControl=document.getElementById(item.cat_id);
// this.objControl.scrollTop = this.objControl.offsetTop;
// console.log( this.objControl.scrollTop)
}
increment1(i:any){
console.log(i)
this.quantity++;
console.log(this.quantity)
}
decrement2(i:any, e:any){
  this.quantity--;
  console.log(this.quantity)
//   if(0==this.quantity){
//     e.target.parentElement.classList.remove('increment-decrement-btn-container md-pc')
//     e.target.parentElement.parentElement.children[0].classList.remove('myStyle')
//    console.log(e.target.parentElement.parentElement.children[1].classList)
//    const list = e.target.classList;
//  list.add("datainc");
//   }
}
}
