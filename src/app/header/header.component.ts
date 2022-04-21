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
  phoneNumber:any;
  totalAmount:any;
  otpNumber:any;
  userId:any;
  userName:any;
  otpDAta:any;
  otpvalue:any;
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
      user_email: ['', Validators.required,],
      user_phone:['', Validators.required,],
      last_name: [''],
      date_of_reg:new Date(),
            user_type:  ['1'],
            ref_code:  [''],
    })
  }
  scrollDistance: any;
  target: any;
  use:any;
  userform:any=[];
  bannerImg:any=[];
  menuList:any=[];
  Product_details:any=[];
  elementPosition:any;
  scrollDist:any;
  Recom:any=[];
  ngOnInit(): void {
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
          $('.menu-list li.active').removeClass('active');
          $('.menu-list li').eq(i+1).addClass('active');
      }
     
  });
  
//   obj.elementPosition = $('.header-search').offset();
//   if( obj.scrollDistance> obj.elementPosition.top){
//     $('.header-search').css('position','fixed').css('top','0');
// } else {
//  // $('.header-search').css('position','static');
// }
}).scroll();
// obj.elementPosition = $('.header-search').offset();

// $(window).scroll(function(){
//   obj.scrollDist = $(window).scrollTop();
//   alert("sad")
//         if( obj.scrollDist> obj.elementPosition.top){
//               $('.header-search').css('position','fixed').css('top','0');
//         } else {
//             $('.header-search').css('position','static');
//         }    
// });



// $(window).on('wheel', function(event){
// // $(window).mousewheel(function(){
  
//   obj.sticky = $('.header-search'),
//      obj.scroll = $(window).scrollTop();

//   if (obj.scroll > -100) 
//   {
//    // $(".header-search").css( {"position":'fixed'});
//     obj.sticky.addClass('fixed');

//   }
//   else {
//     alert("anu");
//     obj.sticky.removeClass('fixed');
//   }
// });

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
}

popsignup()
{
  this.signup=true;
}
remove(){
  this.signup=false;
}


continue()
{
  if (this.LoginForm.valid) {
  this.signup=false;
  this.otp=true;
  this.dashboardService.login(this.LoginForm.value).subscribe((data:any)=>{
    this.phoneNumber=data['Data'].user_details.user_phone;
    this.otpNumber =data['Data'].user_details.otp;
    this.userName =data['Data'].user_details.first_name;
    this.userId=data['Data'].user_details._id
    sessionStorage.setItem('user', JSON.stringify(data));

  });

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
  this.otp=true;
}
increment(i:any){
  console.log(i.quantity)

 i.quantity=i.quantity+1;
 this.totalAmount=i.product_price* i.quantity
 

}
decrement(i:any){
  i.quantity=i.quantity-1;
  this.totalAmount=i.product_price* i.quantity
}
addcart(item:any){
 this.quantity=1;
  console.log(item)
  this.totalAmount=item.product_price
  this.cartProduct.push({
   "product_title":item.product_title,
   "product_price":item.product_price,
    "quantity":this.quantity,
   "id":item._id,
  

  });
  console.log(this.cartProduct)
}
}
