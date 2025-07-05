export interface UserProfile {
  id: number;
  isExpert: boolean;
  fio: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  telegramId: string;
  resumeLink: string;
  experienceYears: number;
  position: number;
  companyId: number;
  categoryId: number;
  userId: string;
}

// Дополнительные интерфейсы
export interface Company {
  id: number;
  name: string;
}

export interface Position {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}