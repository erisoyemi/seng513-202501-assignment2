export class Question{
    constructor(question) {
        this.question = question.question;
        this.correctAnswer = question.correct_answer;
        this.incorrectAnswers = question.incorrect_answers;
        this.difficulty = question.difficulty;
        this.category = question.category
        this.question_type = question.type
      }

    // Method to display the question
    displayQuestion() {
        return `
        Question: ${this.question}
        Category: ${this.category}
        Difficulty: ${this.difficulty}
        Type: ${this.question_type}
        Correct Answer: ${this.correctAnswer}
        Incorrect Answers: ${this.incorrectAnswers.join(", ")}
        `;
    }

    getQuestion(){
        return this.question;
    }

    getChoices(){
        return [this.correctAnswer, ...this.incorrectAnswers];
    }

    getCorrectAnswer(){
        return this.correctAnswer;
    }

}