import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(protected httpClient: HttpClient) { }

 login(body) {
    return this.httpClient.post("/api/signin",body);
  }

  logout(){
    return this.httpClient.get("/api/signout")
  }

  getEmployee(employeeId){
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    }

    return this.httpClient.get(`/api/getAllEmployeeData/${employeeId}`,header);
  }




}
