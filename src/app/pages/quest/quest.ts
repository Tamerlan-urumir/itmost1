import {Component, HostListener, Inject} from '@angular/core';
import {profileService} from '../../data/services/profile';
import {Question} from '../../data/interfaces/questions.interface';
import {CommonModule} from '@angular/common';
import {Tags} from '../../data/interfaces/tags.interface';
import {Category} from '../../data/interfaces/category.interface';
import {concatMap,tap,finalize,Observable,from,toArray,map,last,catchError,filter,throwError,of,defaultIfEmpty} from 'rxjs';
import {  EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, NgForm, Validators} from '@angular/forms';
import {QuestPost} from '../../data/interfaces/questpost.interface';
@Component({
  selector: 'app-quest',
  imports: [CommonModule, FormsModule],
  templateUrl: './quest.html',
  styleUrl: './quest.scss'
})
export class Quest {
  quests: Question[]=[];
  question:number[] | undefined;
  tagsq: Tags[]=[];
  categoryq: Category[]=[];
  tagchek: boolean[]= [];
  tagname:string[]=[];
  tagid:number[]=[];
  catchek: boolean[]= [];
  catname:string[]=[];
  catid:number[]=[];
  squest:number[]=[];
  search:number[]=[];
  showModal = false;
  questionData:QuestPost;
  constructor(private profileService: profileService) {
    this.profileService.getDate("/questions")
      .subscribe((val :Question[]) => {
        this.quests=val;
      });
    this.profileService.getDate("/tags")
      .subscribe((val :Tags[]) => {
        this.tagsq=val;
        for(let i=0;i<val.length;i++){
          this.tagchek.push(false);
          this.tagid.push(val[i].id);
          this.tagname.push(val[i].name);
      }
      });
    this.profileService.getDate("/category")
      .subscribe((val :Category[]) => {
        this.categoryq=val;
        for(let i=0;i<val.length;i++){
          this.catchek.push(false);
          this.catid.push(val[i].id);
          this.catname.push(val[i].name);
        }
      });
    this.questionData= {
      title: "",
      content: "",
      isUrgent: true,
      categoryIds: [],
      tagIds: []
    };
  }
  Search(title:string){
    this.search = [];
    this.squest = []; // Очищаем перед началом
  this.quests=[];
    this.profileService.getDate("/questions?title=" + title).pipe(
      tap((val: Question[]) => {
        for (let i = 0; i < val.length; i++) {
          this.squest.push(val[i].id);
        }
      }),
      concatMap(() => this.SearchTeg()),
      concatMap(() => this.SearchCat()),
      concatMap(() => this.SearchQuest()),
      finalize(() => {
        console.log(this.squest);
        this.squest = []; // Очищаем после завершения всех операций
      })
    ).subscribe();
}
  SearchQuest(): Observable<any> {

    // Преобразуем массив ID в поток запросов
    return from(this.squest).pipe(
      // Выполняем запросы последовательно
      concatMap(questionId =>
        this.profileService.getDate("/questions/" + questionId)
      ),
      // Добавляем каждый результат в массив
      tap((val: Question) => {
        this.quests.push(val);
      }),
      // Завершаем поток когда все запросы выполнены
      toArray(),
      // Дополнительная обработка при необходимости
      finalize(() => {
        console.log("поиск"+this.search+" "+this.squest)
        console.log('Все вопросы загружены', this.quests);
      })
    );
  }
  SearchTeg(): Observable<void> {
    // Собираем индексы выбранных тегов
    const selectedTagIndices = this.tagchek
      .map((checked, index) => (checked ? index : null))
      .filter(index => index !== null);

    // Если нет выбранных тегов — завершаем поток
    if (selectedTagIndices.length === 0) {
      return of(undefined).pipe(
        tap(() => console.log('No tags selected, skipping SearchTeg'))
      );
    }

    // Массив для хранения списков вопросов по каждому тегу
    const allQuestionsLists: number[][] = [];

    return from(selectedTagIndices).pipe(
      concatMap(index => {
        const tagId = this.tagid[index];
        return this.profileService.getDate(`/tags/${tagId}`).pipe(
          map((val: Tags) => val.questions.map(q => q.id)), // Получаем только ID вопросов
          tap(questionsIds => {
            allQuestionsLists.push(questionsIds); // Сохраняем список ID вопросов
            console.log(`Loaded questions for tag ${tagId}:`, questionsIds);
          }),
          catchError(error => {
            console.error(`Error loading tag ${tagId}:`, error);
            allQuestionsLists.push([]); // Добавляем пустой массив, чтобы не сломать intersection
            return of([]);
          })
        );
      }),
      toArray(), // Ждём загрузки всех тегов
      tap(() => {
        // Находим пересечение всех списков
        this.search = allQuestionsLists.reduce((acc, list) => {
          return acc.filter(id => list.includes(id));
        });

        // Фильтруем squest по найденным общим вопросам
        this.squest = this.squest.filter(item => this.search.includes(item));
        this.search=[];
        console.log("Финальный search (общие вопросы):", this.search);
        console.log("Финальный squest:", this.squest);
      }),
      map(() => {}),
      catchError(error => {
        console.error('Error in SearchTeg:', error);
        return throwError(() => error);
      })
    );
  }
  SearchCat(): Observable<void> {
    // Собираем индексы выбранных категорий
    const selectedIndices = this.catchek
      .map((checked, index) => ({ checked, index }))
      .filter(item => item.checked)
      .map(item => item.index);

    // Если нет выбранных категорий — завершаем поток
    if (selectedIndices.length === 0) {
      return of(undefined).pipe(
        tap(() => console.log('No categories selected, skipping SearchCat'))
      );
    }

    // Массив для хранения списков ID вопросов по каждой категории
    const allQuestionsLists: number[][] = [];

    return from(selectedIndices).pipe(
      concatMap(index => {
        const catId = this.catid[index];
        return this.profileService.getDate(`/category/${catId}`).pipe(
          map((val: Category) => val.questions.map(q => q.id)), // Получаем только ID вопросов
          tap(questionsIds => {
            allQuestionsLists.push(questionsIds); // Сохраняем список ID
            console.log(`Loaded questions for category ${catId}:`, questionsIds);
          }),
          catchError(error => {
            console.error(`Error loading category ${catId}:`, error);
            allQuestionsLists.push([]); // Добавляем пустой массив, чтобы не сломать intersection
            return of([]);
          })
        );
      }),
      toArray(), // Ждём загрузки всех категорий
      tap(() => {
        // Находим пересечение всех списков (вопросы, присутствующие во всех категориях)
        this.search = allQuestionsLists.reduce<number[]>((acc, list) => {
          return acc.filter(id => list.includes(id));
        }, allQuestionsLists[0] || []);

        // Фильтруем squest по найденным общим вопросам
        this.squest = this.squest.filter(item => this.search.includes(item));

        console.log("Финальный search (общие вопросы):", this.search);
        console.log("Финальный squest:", this.squest);
      }),
      map(() => {}),
      catchError(error => {
        console.error('Error in SearchCat:', error);
        return throwError(() => error);
      })
    );
  }
  toggleCheck(id:number,str:string){
    if(str!="cat")
      this.tagchek [this.tagid.indexOf(id)]= !this.tagchek[this.tagid.indexOf(id)];
    else
      this.catchek [this.catid.indexOf(id)]= !this.catchek[this.catid.indexOf(id)];
  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submitQuestion(form: NgForm) {

    if (form.valid) {
      for(let i=0;i<this.tagchek.length;i++){
        if(this.tagchek[i]) {
          this.questionData.tagIds.push(this.tagid[i])
        }
      }
      for(let i=0;i<this.catchek.length;i++){
        if(this.catchek[i]) {
          this.questionData.categoryIds.push(this.catid[i])
        }
      }
      console.log('Данные формы:', this.questionData);
      this.profileService.postDate("/questions?userProfileId="+this.profileService.getUserId(),this.questionData).subscribe(val=>{

        console.log(this.questionData)
      });
      this.questionData.categoryIds=[];
      this.questionData.tagIds=[];
      // Здесь можно добавить логику отправки данных
      this.closeModal();
      form.resetForm();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const modal = document.getElementById('questionModal');
    if (event.target === modal) {
      this.closeModal();
    }
  }
}
