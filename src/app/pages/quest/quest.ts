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
    for(let i=0;i<3;i++) {
      this.profileService.getDate("questions"+i)
        .subscribe((val: { title: string; category: any; tags: any | any; }) => {
        this.quests[i].title = val.title;
        this.quests[i].category = this.profileService.getDate(`${val.category}`);

        for(let v=0;v<val.tags.length;v++) {
          this.quests[i].tags[v] = this.profileService.getDate(`${val.tags[v]}`);
        }
      })
    }
  }
  ngOnInit(){

  }
}
