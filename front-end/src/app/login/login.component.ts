import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: '';
  password: '';
  errMsg;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authServiceService: AuthServiceService) { }

  ngOnInit(): void {
  }

  onSubmit(user) {
    this.errMsg = null;
    const reqbody = {
      email: user.email,
      password: user.password
    }
    this.authServiceService.login(reqbody).subscribe(
      (response) => {
        localStorage.setItem('token', response['token']);
        localStorage.setItem('user_id', response['user']['_id'])
        this.router.navigate(['/home'])
      },
      (err) => {
        console.log(err.error.error)
        this.errMsg = err.error.error;
      }
    )
  }

}
