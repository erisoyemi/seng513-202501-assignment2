let storedQuestionsEasy = [];
let storedQuestionsHard = [];
let storedQuestionsMed = [];


 //function to delay execution (for retry handling).
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchEasy(difficulty = "easy") {
    const url = 'https://opentdb.com/api.php?amount=10&difficulty=easy';

    let retries = 5;
    const retryDelay = 2000; // 2 seconds

    while (retries > 0) {
        try {
            const response = await fetch(url);

            if (response.status === 429) {  
                await delay(retryDelay);
                retries--;
                continue;
            }

            const data = await response.json();
            return data.results || [];

        } catch (error) {
            await delay(retryDelay);
            retries--;
        }
    }

    return [];
}
export async function fetchMedium(difficulty = "medium") {
    const url = 'https://opentdb.com/api.php?amount=10&difficulty=medium';

    let retries = 5;
    const retryDelay = 2000; // 2 seconds

    while (retries > 0) {
        try {
            const response = await fetch(url);

            if (response.status === 429) {  
                await delay(retryDelay);
                retries--;
                continue;
            }

            const data = await response.json();
            return data.results || [];

        } catch (error) {
            await delay(retryDelay);
            retries--;
        }
    }

    return [];
}

export async function fetchHard(difficulty = "hard") {
    const url = 'https://opentdb.com/api.php?amount=10&difficulty=hard';
    let retries = 5;
    const retryDelay = 2000; // 2 seconds

    while (retries > 0) {
        try {
            const response = await fetch(url);

            if (response.status === 429) {  
                await delay(retryDelay);
                retries--;
                continue;
            }

            const data = await response.json();
            return data.results || [];

        } catch (error) {
            await delay(retryDelay);
            retries--;
        }
    }

    return [];
}



// Loads all questions once into the stored arrays.
export async function loadAllQuestions() {
    [storedQuestionsEasy, storedQuestionsMed, storedQuestionsHard] = await Promise.all([
        fetchEasy(),
        fetchMedium(),
        fetchHard()
    ]);
}

/**
 * Retrieves a question from the stored arrays based on difficulty.
 */
export async function getQuestion(difficulty) {
    let questionArray;
    if (difficulty === "easy") {
        questionArray = storedQuestionsEasy;
    } else if (difficulty === "medium") {
        questionArray = storedQuestionsMed;
    } else if (difficulty === "hard") {
        questionArray = storedQuestionsHard;
    }

    if (questionArray.length === 0) {
        return null; // No more questions of this difficulty
    }

     // Pick a random index from the array
     const randomIndex = Math.floor(Math.random() * questionArray.length);
    
     // Remove and return the selected question
     return questionArray.splice(randomIndex, 1)[0];
}


// Generator function that adjusts difficulty based on user responses.

export async function* questionGenerator() {
    let currentDifficulty = "easy";

    while (true) {
        let questionData = await getQuestion(currentDifficulty);
        if (!questionData) {
            yield null;
            break;
        }

        let userResponse = yield questionData;

        if (userResponse === "correct") {
            if (currentDifficulty === "easy") {
                currentDifficulty = "medium";
            } else if (currentDifficulty === "medium") {
                currentDifficulty = "hard";
            }
        } else if (userResponse === "incorrect") {
            if (currentDifficulty === "hard") {
                currentDifficulty = "medium";
            } else if (currentDifficulty === "medium") {
                currentDifficulty = "easy";
            }
        }
    }
}
