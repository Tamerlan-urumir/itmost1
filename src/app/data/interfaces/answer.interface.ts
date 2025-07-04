export interface QuestTag {
  id: number;
  name: string;
  updatedAt: string;
}

export interface QuestCategory {
  id: number;
  name: string;
  description: string;
  updatedAt: string;
}

export interface Quest {
  id: number;
  title: string;
  content: string;
  isUrgent: boolean;
  createdAt: string;
  updatedAt: string;
  userProfileId: number;
  tags: QuestTag[];
  categories: QuestCategory[];
}