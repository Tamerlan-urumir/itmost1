import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Question } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class profileService {
  http =inject(HttpClient)
  baseApiUrl='http://localhost:7164/api'
  constructor() { }
  getDate(dopApiUrl:string){
    return this.http.get<any>(`${this.baseApiUrl}${dopApiUrl}`)}}