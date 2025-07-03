import {Question} from './quest.interface';

export interface Category{
  id: number;
  name: string;
  description: string;
  updatedAt: string;
  userProfile:UserProfile[];
  questions:Question[];
}
