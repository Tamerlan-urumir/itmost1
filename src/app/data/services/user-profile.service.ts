import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserProfile, Company, Position, Category } from '../../data/interfaces/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private baseUrl = 'https://localhost:7164/api';

  constructor(private http: HttpClient) { }

  // Получение профиля пользователя по ID
  getUserProfile(userId: number = 1): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/user-profile/${userId}`);
  }

  // Обновление профиля
  updateUserProfile(profile: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(
      `${this.baseUrl}/user-profile/${profile.id}`, 
      profile
    );
  }

  // Получение компаний (заглушка)
  getCompanies(): Observable<Company[]> {
    // В реальном приложении будет запрос к API
    return of([
      { id: 1, name: 'Яндекс' },
      { id: 2, name: 'Сбербанк' },
      { id: 3, name: 'Тинькофф' }
    ]);
  }

  // Получение должностей (заглушка)
  getPositions(): Observable<Position[]> {
    return of([
      { id: 1, name: 'Frontend Developer' },
      { id: 2, name: 'Backend Developer' },
      { id: 3, name: 'DevOps Engineer' }
    ]);
  }

  // Получение категорий (заглушка)
  getCategories(): Observable<Category[]> {
    return of([
      { id: 1, name: 'Web Development' },
      { id: 2, name: 'Mobile Development' },
      { id: 3, name: 'Data Science' }
    ]);
  }
}