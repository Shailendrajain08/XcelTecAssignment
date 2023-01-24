import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  showLogin = false;

  constructor(private authService : AuthService,
    private router: Router ){
  }

  onSubmit(data: any) {
    console.log(data)
    this.authService.signUp(data).subscribe(res=>{
      alert("User Register Successfully")
    }, err =>{
      alert("somthing wrong")
    })
  }

  onLogin(data: any) {
    this.authService.signIn(data).subscribe(res =>{
      alert("User Login Successfully")
      this.router.navigate([''])
    }, err =>{
      alert("somthing Wrong")
    })
  }

  openLogin(){
    this.showLogin = true;
  }

  openSignUp(){
    this.showLogin = false;
  }
}
