import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Quest } from '../interfaces/quest.interface';
import {profileService} from './profile';

@Injectable({
  providedIn: 'root'
})
export class QuestPage {
  questHttp=inject(HttpClient)
  constructor(private profileservise:profileService) { }
  getQuestPage(){
    return this.questHttp.get<Quest[]>(`https://localhost:7164/api/questions/${this.profileservise.getUserId()}`)
  }

}
