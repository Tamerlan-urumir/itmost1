import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Quest } from '../interfaces/answer.interface';

@Injectable({
  providedIn: 'root'
})
export class Answerpage {
 questHttp=inject(HttpClient)
  constructor() { }
  getQuestPage(){
    return this.questHttp.get<Quest[]>('https://localhost:7164/api/questions')
  }
  
}
