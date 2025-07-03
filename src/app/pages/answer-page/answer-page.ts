import { Component, inject } from '@angular/core';
import { QuestPage } from '../../data/services/quest-page';
import { Quest } from '../../data/interfaces/quest.interface';

@Component({
  selector: 'app-answer-page',
  imports: [],
  templateUrl: './answer-page.html',
  styleUrl: './answer-page.scss'
})
export class AnswerPage {
QuestPage=inject(QuestPage)
  quests:Quest[]=[]
  constructor(){
    this.QuestPage.getQuestPage().subscribe(val=>{this.quests=val})
  }
}
