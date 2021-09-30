import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { adminModal, productModal } from '../models/adminUser.model';
// export const httpOptions = {
//   headers: new HttpHeaders({
//     "Content-Type": "application/x-www-form-urlencodedn/json",
//     "Access-Control-Allow-Origin": "*",
//   }),
// };
@Injectable({
  providedIn: 'root',
})
  
export class AdminUseOnlyService {
  public BaseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  addNewAdmin(
    UserInfo
  ): Observable<{
    name: string;
    address: string;
    mobileno: number;
    email: string;
    password: string;
    cpassword: string;
    imgUrl: File;
  }> {
    let formData = new FormData();
    formData.append('name', UserInfo.name);
    formData.append('address', UserInfo.address);
    formData.append('mobile', UserInfo.mobileno);
    formData.append('email', UserInfo.email);
    formData.append('password', UserInfo.password);
    formData.append('cpassword', UserInfo.cpassword);
    formData.append('imgUrl', UserInfo.imgUrl);

    
    const url = this.BaseUrl + `admin/add-admin`;
    return this.http.post<{
      name: string;
      address: string;
      mobileno: number;
      email: string;
      password: string;
      cpassword: string;
      imgUrl: File;
    }>(url, formData);
  }
  findAdminByEmailId(user): Observable<adminModal> {
    const Url = this.BaseUrl + `admin/getAdminByEmail`;
    return this.http.post<adminModal>(Url, user);
  }
  addProducts(product){
    const Url = this.BaseUrl + `admin/add-products`;
    return this.http.post<productModal>(Url,product);
  }
  addSpecification(dataOfallForms) {
    const Url = this.BaseUrl + `admin/addprodSpec`;
    return this.http.post(Url, dataOfallForms);
  }
  getProductSpecification(id) {
    const Url = this.BaseUrl + `admin/getProdSpec/${id}`;
    return this.http.get(Url);
  }
}
