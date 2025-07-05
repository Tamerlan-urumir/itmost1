import { Component, Inject } from '@angular/core';
import { 
  MAT_DIALOG_DATA, 
  MatDialogRef, 
  MatDialogModule,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-answer-dialog',
  standalone: true, // Если используете standalone компоненты
  imports: [
    // Необходимые модули
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  template: `<div style='background-color :#011036;color:white'>
    <h2 mat-dialog-title>Ответ на вопрос</h2>
    
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Ваш ответ</mat-label>
        <textarea matInput [(ngModel)]="content" rows="8" required></textarea>
      </mat-form-field>
    </mat-dialog-content>
    
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close (click)="onCancel()">Отмена</button>
      <button mat-raised-button color="primary" 
              [disabled]="!content.trim()"
              (click)="onSubmit()">
        Отправить
      </button>
    </mat-dialog-actions></div>
  `,
  styles: [`
    .full-width { width: 100%; }
    textarea { min-height: 150px; }
    mat-dialog-content { padding: 16px 24px; }
    mat-dialog-actions { padding: 8px 24px; margin-bottom: 0; }
  `]
})
export class AnswerDialogComponent {
  content: string;

  constructor(
    public dialogRef: MatDialogRef<AnswerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { content: string }
  ) {
    this.content = data.content || '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.content);
  }
}