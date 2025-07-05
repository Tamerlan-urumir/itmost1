import { Component } from '@angular/core';
import {profileService} from '../../data/services/profile';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  login={
    username:"",
    password:""
  }
  constructor(private profileService: profileService){}
  LoginUser(username:string,password:string){
    this.login={
      username:username,
      password:password
    }
    console.log(this.login)
    this.profileService.postDate("/account/login",this.login).subscribe(val=>{

      this.profileService.setToken(val.token);
    })
  }
}
