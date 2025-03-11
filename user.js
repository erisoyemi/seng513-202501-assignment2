export class User {
    constructor(username) {
        this.username = username;
        this.scoreHistory = [];
        this.currentScore = 0;
    }

    addScore(correctAnswer) {
        if (correctAnswer) {
            this.currentScore += 1;
        }
    }

    saveScore() {
            this.scoreHistory.push(this.currentScore);
            this.currentScore = 0;  
    }

    getUsername() {
        return this.username;
    }

    getCurrentScore() {
        return this.currentScore;
    }

    getScoreHistory() {
        return this.scoreHistory;
    }
}
