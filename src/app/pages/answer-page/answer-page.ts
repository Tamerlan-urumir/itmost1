import { Component, inject } from '@angular/core';
import { QuestPage } from '../../data/services/quest-page';
import { Quest } from '../../data/interfaces/quest.interface';
import {QuestionService} from '../../data/services/qa';
import {Router} from '@angular/router';

@Component({
  selector: 'app-answer-page',
  imports: [],
  templateUrl: './answer-page.html',
  styleUrl: './answer-page.scss'
})
export class AnswerPage {
QuestPage=inject(QuestPage)
  quests:Quest[]=[]
  constructor(private questionService:QuestionService, private router:Router){
    this.QuestPage.getQuestPage().subscribe(val=>{this.quests=val})
  }
  Route(id:number){
    this.questionService.setId(id);
    this.router.navigate(["/qa"])
  }
}
