export interface Question {

    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: any;
    incorrect_answers: Array<string>;

}