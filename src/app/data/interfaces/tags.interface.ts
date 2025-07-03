import {Question} from './quest.interface';

export interface Tags {
  id: number;
  name: string;
  updatedAt: string;
  questions:Question[];
}
