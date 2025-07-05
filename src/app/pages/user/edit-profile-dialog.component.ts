import { Component, Inject } from '@angular/core';
import { 
  MAT_DIALOG_DATA, 
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { UserProfile, Company, Position, Category } from '../../data/interfaces/user-profile.model';

@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    
    // Директивы для диалога
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  template: `<div style='background-color:#003A97'>
    <h2 mat-dialog-title>Редактирование профиля</h2>

    <mat-dialog-content>
      <form >
        <!-- Поле ФИО -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>ФИО</mat-label>
          <input matInput [(ngModel)]="data.profile.fio" name="fio" required>
        </mat-form-field>

        <!-- Поле "О себе" -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>О себе</mat-label>
          <textarea matInput [(ngModel)]="data.profile.bio" name="bio" rows="3"></textarea>
        </mat-form-field>

        <!-- Выбор компании -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Компания</mat-label>
          <mat-select [(ngModel)]="data.profile.companyId" name="companyId">
            @for (company of data.companies; track company.id) {
              <mat-option style='background-color :#011036' [value]="company.id">{{ company.name }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <!-- Выбор должности -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Должность</mat-label>
          <mat-select [(ngModel)]="data.profile.position" name="position">
            @for (position of data.positions; track position.id) {
              <mat-option style='background-color :#011036' [value]="position.id">{{ position.name }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <!-- Выбор категории -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Категория</mat-label>
          <mat-select [(ngModel)]="data.profile.categoryId" name="categoryId">
            @for (category of data.categories; track category.id) {
              <mat-option style='background-color :#011036' [value]="category.id">{{ category.name }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <!-- Опыт работы -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Опыт работы (лет)</mat-label>
          <input matInput type="number" [(ngModel)]="data.profile.experienceYears" name="experienceYears" min="0">
        </mat-form-field>

        <!-- Ссылка на GitHub -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>GitHub URL</mat-label>
          <input matInput [(ngModel)]="data.profile.githubUrl" name="githubUrl">
        </mat-form-field>

        <!-- Ссылка на LinkedIn -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>LinkedIn URL</mat-label>
          <input matInput [(ngModel)]="data.profile.linkedinUrl" name="linkedinUrl">
        </mat-form-field>

        <!-- Telegram ID -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Telegram ID</mat-label>
          <input matInput [(ngModel)]="data.profile.telegramId" name="telegramId">
        </mat-form-field>

        <!-- Ссылка на резюме -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Ссылка на резюме</mat-label>
          <input matInput [(ngModel)]="data.profile.resumeLink" name="resumeLink">
        </mat-form-field>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Отмена</button>
      <button mat-raised-button color="primary" (click)="onSave()">Сохранить</button>
    </mat-dialog-actions>
          </div>
  `,
  styles: [`
    .full-width {
      width: 100%;
      background-color :#011036;
      color:white;
      margin-bottom: 15px;
    }
    .mat-mdc-dialog-surface{
      background-color:#003A97
    }
    
    form {
      display: flex;
      flex-direction: column;
      padding: 10px;
    }
  
    
    mat-dialog-content {
      max-height: 70vh;
      overflow-y: auto;
      padding: 0 24px;
    }
    mat-label{
      color:white;
    }
    
    mat-dialog-actions {
      padding: 8px 24px;
      margin-bottom: 0;
    }
  `]
})
export class EditProfileDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      profile: UserProfile,
      companies: Company[],
      positions: Position[],
      categories: Category[]
    }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data.profile);
  }
}