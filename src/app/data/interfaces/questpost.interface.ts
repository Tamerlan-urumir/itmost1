import {Tags} from './tags.interface';
import {Category} from './category.interface';

export interface QuestPost {
  title: string;
  content: string;
  isUrgent: boolean;
  tagIds: number[];
  categoryIds: number[];
}
