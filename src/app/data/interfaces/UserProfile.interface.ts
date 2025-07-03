interface UserProfile {
  id: number;
  isExpert: boolean;
  fio: string;
  bio: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  telegramId: string | null;
  resumeLink: string | null;
  experienceYears: number;
  position: number;
  companyId: number;
  categoryId: number | null;
  userId: string;
}
