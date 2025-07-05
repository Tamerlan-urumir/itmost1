import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {QuestPost} from '../interfaces/questpost.interface';

@Injectable({
  providedIn: 'root'
})
export class profileService {
  http =inject(HttpClient)
  baseApiUrl='https://localhost:7164/api'
  userID:number=0;
  constructor() { }
  setToken(token:string){
    this.userID=this.JWTshifr(token);

    console.log(this.userID," ",token);
  }
  getUserId(){return this.userID}
  JWTshifr(token:string){
    try {
      return JSON.parse(atob(token.split('.')[1])).userProfileId;
    } catch (e) {
      return null;
    }
  }
getDate(dopApiUrl:string){
    return this.http.get<any>(`${this.baseApiUrl}${dopApiUrl}`)
  }
  postDate(dopApiUrl:string,data:any){
    console.log(data.categoryIds);
    return this.http.post<any>(`${this.baseApiUrl}${dopApiUrl}`,data)
  }
}
