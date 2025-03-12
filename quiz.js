export class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    checkAnswer(answer) {
        const currentQuestion = this.getCurrentQuestion();
        if (currentQuestion.correctAnswer === answer) {
            this.score++;
            return true;
        }
        return false;
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            return true;
        }
        return false;
    }

    isQuizOver() {
        return this.currentQuestionIndex >= this.questions.length - 1;
    }

    getScore() {
        return this.score;
    }
}
