import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Quest } from '../interfaces/quest.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestPage {
  questHttp=inject(HttpClient)
  constructor() { }
  getQuestPage(){
    return this.questHttp.get<Quest[]>('https://localhost:7164/api/questions')
  }
  
}
