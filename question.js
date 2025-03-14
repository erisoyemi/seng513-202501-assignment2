export class Question{
    constructor(question) {
        this.question = this.decodeHTML(question.question);
        this.correctAnswer = this.decodeHTML(question.correct_answer);
        this.incorrectAnswers = question.incorrect_answers.map(ans => this.decodeHTML(ans));
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

    decodeHTML(html) {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(html, "text/html").body.textContent;
        return decodedString;
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