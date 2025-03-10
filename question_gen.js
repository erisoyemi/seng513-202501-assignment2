
let storedQuestionsEasy = [];
let storedQuestionsHard = [];
let storedQuestionsMed = [];

export async function fetchEasy(difficulty = "easy") {
    const url = 'https://opentdb.com/api.php?amount=10&difficulty=easy';

    try{
        const response = await fetch(url);
        const dataeasy = await response.json();
        return dataeasy.results;

    } catch (error){
        console.error("Error fetching questions:", error);
        return [];
    }
}

export async function fetchMedium(difficulty = "medium") {
    const url = 'https://opentdb.com/api.php?amount=10&difficulty=medium';

    try{
        const response = await fetch(url);
        const datamed = await response.json();
        return datamed.results;

    } catch (error){
        console.error("Error fetching questions:", error);
        return [];
    }
}

export async function fetchHard(difficulty = "hard") {
    const url = 'https://opentdb.com/api.php?amount=10&difficulty=hard';

    try{
        const response = await fetch(url);
        const datahard = await response.json();
        return datahard.results;

    } catch (error){
        console.error("Error fetching questions:", error);
        return [];
    }
}

export async function getQuestion(difficulty) {
    let fetchFunction = difficulty === "easy" ? fetchEasy :
                        difficulty === "medium" ? fetchMedium :
                        fetchHard;

    // Fetch questions asynchronously
    let questionArray = await fetchFunction();

    if (questionArray.length === 0) {
        return null; // No more questions of this difficulty
    }

    // Pick a random index from the array
    const randomIndex = Math.floor(Math.random() * questionArray.length);
    
    // Remove and return the selected question
    return questionArray.splice(randomIndex, 1)[0];
}



