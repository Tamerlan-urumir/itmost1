import {Question} from './questions.interface';

export interface Tags {
  id: number;
  name: string;
  updatedAt: string;
  questions:Question[];
}
