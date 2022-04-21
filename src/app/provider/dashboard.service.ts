import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  dashboardList(data:any){
    return this.http.post(environment.baseurl + '/product_details/getproductdetails_list',data,)

  }
  login(data:any){
    return this.http.post(environment.baseurl + '/userdetails/create ',data,)

  }
}
