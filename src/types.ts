export type Event = {
  title: string;
  description: string;
  creatorId: string;
  questions: Question[];
  createdAt: Date;
};

export type Question = {
  question: string;
  author: string;
  authorId: string;
  createdAt: Date;
};
