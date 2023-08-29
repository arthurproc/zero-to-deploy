export type QAEvent = {
  id?: string;
  title: string;
  description: string;
  creatorId: string;
  createdAt: Date;
};

export type Question = {
  id?: string;
  question: string;
  author: string;
  authorId: string;
  createdAt: Date;
};
