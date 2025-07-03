import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../data/services/qa';
import { QuestionData } from '../../data/interfaces/question.model';
import { MatDialog } from '@angular/material/dialog';
import { AnswerDialogComponent } from './answer-dialog.component';
import { CommentDialogComponent } from './comment-dialog.component';


@Component({
  selector: 'app-question-detail',
  templateUrl: './q-a-page.html',
  styleUrls: ['./q-a-page.scss']
})
export class QuestionDetailComponent implements OnInit {
  data: QuestionData | null = null;
  loading = true;
  error = false;
  showAnswerDialog = false;
  answerContent = '';

  constructor(
    private questionService: QuestionService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.questionService.getQuestionData().subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  // Открытие диалога ответа
  openAnswerDialog(): void {
    const dialogRef = this.dialog.open(AnswerDialogComponent, {
      width: '600px',
      data: { content: this.answerContent }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.answerContent = result;
        this.submitAnswer();
      }
    });
  }

  // Отправка ответа
  submitAnswer(): void {
    if (!this.answerContent.trim()) return;

    this.questionService.postAnswer(this.answerContent).subscribe({
      next: (newAnswer) => {
        // Добавляем новый ответ в список
        if (this.data) {
          this.data.answers = [newAnswer, ...this.data.answers];
          this.data.answerComments[newAnswer.id] = [];
        }
        this.answerContent = '';
      },
      error: (err) => {
        console.error('Ошибка отправки ответа:', err);
        // Здесь можно добавить обработку ошибки
      }
    });
  }
  openQuestionCommentDialog(): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '500px',
      data: { title: 'Комментарий к вопросу' }
    });

    dialogRef.afterClosed().subscribe(content => {
      if (content) {
        this.submitQuestionComment(content);
      }
    });
  }
   openAnswerCommentDialog(answerId: number): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '500px',
      data: { title: 'Комментарий к ответу' }
    });

    dialogRef.afterClosed().subscribe(content => {
      if (content) {
        this.submitAnswerComment(answerId, content);
      }
    });
  }

  // Отправка комментария к вопросу
  submitQuestionComment(content: string): void {
    this.questionService.postQuestionComment(content).subscribe({
      next: (newComment) => {
        if (this.data) {
          this.data.questionComments = [...this.data.questionComments, newComment];
        }
      },
      error: (err) => {
        console.error('Ошибка отправки комментария:', err);
      }
    });
  }

  // Отправка комментария к ответу
  submitAnswerComment(answerId: number, content: string): void {
    this.questionService.postAnswerComment(answerId, content).subscribe({
      next: (newComment) => {
        if (this.data) {
          this.data.answerComments[answerId] = [
            ...(this.data.answerComments[answerId] || []),
            newComment
          ];
        }
      },
      error: (err) => {
        console.error('Ошибка отправки комментария:', err);
      }
    });
  }

  

  getRatingValue(positive: number, negative: number): number {
    return positive - negative;
  }

  getRatingClass(positive: number, negative: number): string {
    return this.getRatingValue(positive, negative) >= 0 ? 'rang-p' : 'rang-n';
  }
}