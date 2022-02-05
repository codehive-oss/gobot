export interface QuizCategory {
  id: number;
  name: string;
}
export interface CategoryResponseType {
  trivia_categories: QuizCategory[];
}

export interface QuizResponseType {
  response_code: number;
  results: Quiz[];
}

export interface Quiz {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
