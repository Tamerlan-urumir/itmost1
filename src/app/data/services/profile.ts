import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class profileService {
  http =inject(HttpClient)
  baseApiUrl='https://icherniakov.ru/yt-course/'
  constructor() { }
  getTestAccounts(){
    return this.http.get<profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }
}