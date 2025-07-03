// question.models.ts
export interface Question {
  id: number;
  title: string;
  content: string;
  ratingPositive: number;
  ratingNegative: number;
  tags: Tag[];
  author: Author;
  categories: Category[];
}

export interface Answer {
  id: number;
  content: string;
  createdAt: string;
  authorFIO: string;
}

export interface Comment {
  id: number;
  content: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Author {
  fio: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface QuestionData {
  question: Question;
  questionComments: Comment[];
  answers: Answer[];
  answerComments: { [key: number]: Comment[] };
}