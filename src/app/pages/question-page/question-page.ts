import { Component, inject } from '@angular/core';
import { QuestPage } from '../../data/services/quest-page';
import { Quest } from '../../data/interfaces/quest.interface';

@Component({
  selector: 'app-question-page',
  imports: [],
  templateUrl: './question-page.html',
  styleUrl: './question-page.scss'
})
export class QuestionPage {
  QuestPage=inject(QuestPage)
  quests:Quest[]=[]
  constructor(){
    this.QuestPage.getQuestPage().subscribe(val=>{this.quests=val})
  }
}
