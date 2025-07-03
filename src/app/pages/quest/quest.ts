import {Component, Inject} from '@angular/core';
import {profileService} from '../../data/services/profile';
import {Question} from '../../data/interfaces/quest.interface';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-quest',
  imports: [CommonModule],
  templateUrl: './quest.html',
  styleUrl: './quest.scss'
})
export class Quest {
  profileService=Inject(profileService)
  quests: Question[]=[]
  constructor() {
    this.profileService.getDate("/rating-question/rating-by-question")
      .subscribe((val :any) => {
        for (let i = 0; i < 3; i++) {
          this.quests[i].title = val[i].question.title;
          for (let v = 0; v < val[i].question.category.length; v++) {
            this.quests[i].category[v] = val[i].question.category[v].name;
          }
          for (let v = 0; v < val.tags.length; v++) {
            this.quests[i].tags[v] = val[i].question.tags[v].name;
          }
          this.quests[i].raiting = val[i].ratingResult;
        }
      })
  }
  ngOnInit(){

  }
}
