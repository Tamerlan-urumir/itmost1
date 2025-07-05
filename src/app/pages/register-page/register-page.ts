import { Component } from '@angular/core';
import {profileService} from '../../data/services/profile';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage {
  regist={
    username:"",
    email:"",
    password:""
  }
  constructor(private profileService: profileService,private route:Router){}
  Registration(email:string,username:string,password:string){
    this.regist={
      username:username,
      email:email,
      password:password
    }
    console.log(this.regist)
    this.profileService.postDate("/account/register",this.regist).subscribe(val=>{

      console.log(this.regist)
    })
  }
  Login(){this.route.navigate(["/login"])}
}
