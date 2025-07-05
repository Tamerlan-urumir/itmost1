import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../data/services/user-profile.service';
import { UserProfile, Company, Position, Category } from '../../data/interfaces/user-profile.model';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from './edit-profile-dialog.component';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})
export class UserProfileComponent implements OnInit {
  profile!: UserProfile;
  companies: Company[] = [];
  positions: Position[] = [];
  categories: Category[] = [];
  loading = true;
  error = false;

  constructor(
    private profileService: UserProfileService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    // Указываем ID пользователя (в данном случае 1)
    this.profileService.getUserProfile(1).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.loadAdditionalData();
      },
      error: (err) => {
        console.error('Ошибка загрузки профиля:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
  loadAdditionalData() {
    this.profileService.getCompanies().subscribe(companies => {
      this.companies = companies;
    });

    this.profileService.getPositions().subscribe(positions => {
      this.positions = positions;
    });

    this.profileService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loading = false;
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '600px',
      data: {
        profile: {...this.profile},
        companies: this.companies,
        positions: this.positions,
        categories: this.categories
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateProfile(result);
      }
    });
  }

  updateProfile(updatedProfile: UserProfile): void {
    this.profileService.updateUserProfile(updatedProfile).subscribe({
      next: (profile) => {
        this.profile = profile;
      },
      error: (err) => {
        console.error('Ошибка обновления профиля:', err);
      }
    });
  }

  getCompanyName(id: number): string {
    const company = this.companies.find(c => c.id === id);
    return company ? company.name : 'Не указано';
  }

  getPositionName(id: number): string {
    const position = this.positions.find(p => p.id === id);
    return position ? position.name : 'Не указано';
  }

  getCategoryName(id: number): string {
    const category = this.categories.find(c => c.id === id);
    return category ? category.name : 'Не указано';
  }
}