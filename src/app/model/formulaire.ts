/**
 * Interface representing the configuration for a quiz.
 */
export interface QuizConfig {
  /** The name of the quiz */
  name: string;

  /** The number of questions in the quiz */
  numberOfQuestions: number;

  /** The category ID of the quiz */
  category: number;

  /** The type of questions in the quiz (e.g., multiple choice) */
  questionType: string;

  /** The difficulty level of the quiz (e.g., easy, medium, hard) */
  difficulty: string;
}
