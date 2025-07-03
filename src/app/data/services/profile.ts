import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { profile } from '../interfaces/profile.interface';
import {Question} from '../interfaces/quest.interface';

@Injectable({
  providedIn: 'root'
})
export class profileService {
  http =inject(HttpClient)
  baseApiUrl='https://localhost:7164/api'
  constructor() { }
getDate(dopApiUrl:string){
    return this.http.get<any>(`${this.baseApiUrl}${dopApiUrl}`)
  }
  postDate(dopApiUrl:string,data:any){
    console.log("agfasf");
    return this.http.post(`https://localhost:7164/api/questions?userProfileId=1`,data)
  }
}
