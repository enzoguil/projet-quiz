export interface QuizConfig {

  name: string;
  numberOfQuestions: number;
  category: number;
  questionType: 'multiple' | 'boolean';
}
