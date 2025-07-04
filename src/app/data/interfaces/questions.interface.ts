import {Tags} from './tags.interface';
import {Category} from './category.interface';

export interface Question {
  id: number;
  title: string;
  content: string;
  isUrgent: boolean;
  createdAt: string;
  updatedAt: string;
  userProfileId: number;
  tags: Tags[];
  categories: Category[];
}
