import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  employeeList: Employee[];

  constructor(
    private authServiceService:AuthServiceService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getEmployees();
  }


  getEmployees() {
    const empId = localStorage.getItem('user_id')
    this.authServiceService.getEmployee(empId).subscribe(
      (response) => {
        this.employeeList = response["employeeList"]
        console.log(response["employeeList"]);
      },
      (err) => {
        console.log(err)
      }
    )

  }

  signout(){
    this.authServiceService.logout().subscribe(
      (respone)=>{
        console.log(respone);
        localStorage.removeItem('token')
        this.router.navigate([''])
      },
      (err)=>{
        console.log(err);
      }
    );

  }

}


interface Employee{
  bank: string
  branch: string
  createdAt: string
  email: string
  name:string
  photo: string
  updatedAt: string
  __v: number
  _id: string
}
