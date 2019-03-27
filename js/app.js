'use strict';

// variables
const questionArray = ['Do I like to code?', 'Was I in the military?', 'Do I have any siblings?', 'Do I like the rain?', 'Do I have a pet corgi', 'What is my favorite number? Hint it is between 1-10'];
const possibleAnswersArray = ['Yes', 'y', 'yeah', 'yes', 'No', 'n', 'nah', 'no'];
const answerArray = ['yes', 'yes', 'yes', 'no', 'yes', '8'];
const form = document.getElementById('guessingGame');
const questionField = document.getElementById('gameQuestion');
const resultField = document.getElementById('userResult');
const answerField = document.getElementById('answerField');
const nextBtn = document.getElementById('nextQuestion');
let questionIndex = 0;
let total = 0;

// set first question
questionField.innerHTML = questionArray[0];

/**
 *  This function changes the question displayed to the user
 */
const changeQuestion = () => {
// increment question index
    questionIndex++;
    // clear these fields
    resultField.innerHTML = '';
    answerField.value = '';

    // change question
    if(questionIndex < questionArray.length) {
        questionField.innerHTML = questionArray[questionIndex];
    } else {
        questionField.innerHTML = `Total Score: ${total}`;
        nextBtn.style.display = 'none';
    }

    // disable next button
    nextBtn.disabled = true;
};
/**
 *  This function basically determines what to render for the result,
 *  given user input, we determine if that answer was the correct or incorrect
 *  and return a message within the result field area
 */
const userAnswer = (answer, correctAnswer) => {
    // forcing a yes or no depending on what the user inputed
    const answ = questionIndex > 4 ? answer :
        answer.indexOf('y') !== -1 ? 'yes' :
            answer.indexOf('n') !== -1 ? 'no' :
                '';
    // enable next question button
    nextBtn.disabled = false;
    correctAnswer === answ ?
        (
            resultField.innerHTML = `Your answer was: ${answer}, and that was correct!`,
            total++,
            console.log(`Question was: ${questionArray[questionIndex]}. User answered with: ${answ}`)
        ) : total !== 0 ? (
            resultField.innerHTML = `Your answer was: ${answer}, and that was wrong :(`,
            total--,
            console.log(`User answered with: ${answ}`)
        ) :
            resultField.innerHTML = `Your answer was: ${answer}, and that was wrong :(` ; // user has no points
};

/**
 *  This function is the game handler. Takes the user inputs and ensure it is first
 *  a valid answer, then passes that input to a separate function
 */
const handleGame = (event) => {
    event.preventDefault();
    const answer = event.target.answerField.value.toLowerCase();
    const correctA = answerArray[questionIndex];
    if(questionIndex < 5) {
        if(possibleAnswersArray.indexOf(answer) !== -1) {
            userAnswer(answer, correctA);
        } else {
            resultField.innerHTML = 'Bad input, try again';
        }
    } else {
        questionIndex === 5 ?
            (
                answer === correctA ?
                    (
                        userAnswer(answer, correctA)
                    ) :
                    (
                        answer > correctA ?
                            resultField.innerHTML = 'I would guess a little lower' :
                            resultField.innerHTML = 'I would guess a little higher'
                    )
            ) :
            (
                console.log('blarg')
            );
    }
};

form.addEventListener('submit', handleGame);
form.addEventListener('button', changeQuestion);
