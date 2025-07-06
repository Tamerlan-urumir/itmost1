// question.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Question, Answer, Comment, QuestionData } from '../../data/interfaces/question.model';
import {profileService} from './profile';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'https://localhost:7164/api';
  private questionId:number=0;
  constructor(private http: HttpClient, private profileservise:profileService) {}
  setId(id:number){this.questionId=id;}
  getQuestionData(): Observable<QuestionData> {
    // Загрузка вопроса
    const question$ = this.http.get<Question>(`${this.baseUrl}/questions/${this.questionId}`);

    // Загрузка комментариев вопроса
    const questionComments$ = this.http.get<Comment>(`${this.baseUrl}/comment-question/questions/${this.questionId}`).pipe(
      map(comment => comment ? [comment] : [])
    );

    // Загрузка ответов
    const answers$ = this.http.get<Answer[]>(`${this.baseUrl}/answer/question/${this.questionId}`);

    return forkJoin([question$, questionComments$, answers$]).pipe(
      switchMap(([question, questionComments, answers]) => {
        // Загрузка комментариев для каждого ответа
        const answerCommentsRequests = answers.map(answer =>
          this.http.get<Comment[]>(`${this.baseUrl}/comment-answer/answer/${answer.id}`).pipe(
            map(comments => ({ answerId: answer.id, comments: comments || [] }))
        ));

        return forkJoin(answerCommentsRequests).pipe(
          map(answerCommentsData => {
            const answerComments: { [key: number]: Comment[] } = {};
            answerCommentsData.forEach(item => {
              answerComments[item.answerId] = item.comments;
            });

            return {
              question,
              questionComments,
              answers,
              answerComments
            };
          })
        );
      })
    );
  }
  postAnswer(content: string): Observable<Answer> {
    const body = {
      content: content,
      userProfileId: this.profileservise.getUserId(), // В реальном приложении брать из авторизации
      questionId: this.questionId     // Фиксированный ID вопроса
    };
    return this.http.post<Answer>(`${this.baseUrl}/answer`, body);

  }
  // Добавим новые методы для комментариев
postQuestionComment(content: string): Observable<Comment> {
  const body = {
    content: content,
    userProfileId: this.profileservise.getUserId(), // В реальном приложении брать из авторизации
    questionId: this.questionId   // Фиксированный ID вопроса
  };
  return this.http.post<Comment>(`${this.baseUrl}/comment-question`, body);
}

postAnswerComment(answerId: number, content: string): Observable<Comment> {
  const body = {
    content: content,
    userProfileId: this.profileservise.getUserId(), // В реальном приложении брать из авторизации
    answerId: answerId
  };
  return this.http.post<Comment>(`${this.baseUrl}/comment-answer`, body);
}
}
