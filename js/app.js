'use strict';

// variables
const questionArray = ['First, what is your name?','Do I like to code?', 'Was I in the military?', 'Do I have a sibling?', 'Do I like the rain?', 'Do I have a pet corgi?', 'What is my favorite number? Hint it is between 1-10', 'Can you guess what my favorite pizza toppings are?'];
const possibleAnswersArray = ['Yes', 'y', 'Y', 'yeah', 'yes', 'No', 'n', 'N', 'nah', 'no'];
const answerArray = ['yes', 'yes', 'yes', 'yes', 'no', 'yes', '8', ['pepperoni', 'cheese', 'onions']];

// DOM elements
const form = document.getElementById('guessingGame');
const questionField = document.getElementById('gameQuestion');
const resultField = document.getElementById('userResult');
const answerField = document.getElementById('answerField');
const nextBtn = document.getElementById('nextQuestion');
const submitBtn = document.getElementById('submit');

let questionIndex = 0; // used to track what question the user is at, also used to determine correct answer
let total = 0;
let playerName = '';
let questionSixTries = 0;
let questionSevenTries = 0;

// set first question
questionField.innerHTML = questionArray[0];

/**
 *  This function generates the response to user
 *  given an element and message
 */
const setElementConfiguration = (ele, value) => {

    return ele.innerHTML = value;

};
/**
 *  This function changes the question displayed to the user
 */
const changeQuestion = () => {
// increment question index
    questionIndex++;
    // clear these fields
    resultField.innerHTML = '';
    answerField.value = '';

    // enable submit button
    submitBtn.disabled = false;

    // change question
    if (questionIndex < questionArray.length) {
        questionField.innerHTML = questionArray[questionIndex];
    } else {
        console.log(`The user's total was: ${total}`);
        total === 7 ? // perfect
            setElementConfiguration(questionField, `You got ${total} out of 7 questions right! ${playerName}, that was a perfect score!`) :
            total === 0 ? // doesn't know me at all
                setElementConfiguration(questionField, `You got ${total} out of 7 questions right! ${playerName}, you didn't get anything right..`) :
                setElementConfiguration(questionField, `You got ${total} out of 7 questions right! Thanks for playing ${playerName}!`); // got some questions right
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
    const answ = questionIndex > 5 ? answer :
        answer.indexOf('y') !== -1 ? 'yes' :
            answer.indexOf('n') !== -1 ? 'no' :
                '';
    // enable next question button
    nextBtn.disabled = false;
    correctAnswer === answ ?
        (
            setElementConfiguration(resultField, `Your answer was: ${answer}, and that was <b>correct</b>!`),
            total++,
            submitBtn.disabled = true,
            console.log(`Question was: ${questionArray[questionIndex]}. User answered with: ${answ}`)
        ) :
        (
            console.log(`User answered with: ${answ}`),
            submitBtn.disabled = true,
            setElementConfiguration(resultField, `Your answer was: ${answer}, and that was <b>wrong</b>`) // user has no points
        );
};

/**
 *  This function handles the last two questions, basically generates a response to the user and logs that to the console
 */
const handleLastTwoQuestions = (respToUser, logStatement) => {
    setElementConfiguration(resultField, respToUser);
    console.log(logStatement);
};

/**
 *  This function is the game handler. Takes the user inputs and ensure it is first
 *  a valid answer, then passes that input to a separate function
 */
const handleGame = (event) => {
    event.preventDefault();
    const answer = event.target.answerField.value;
    const correctA = answerArray[questionIndex];

    // change text on next button
    nextBtn.value = 'Next Question';
    if (questionIndex < 6) {
        if (questionIndex === 0) { // first question is asking for the name of player
            playerName = answer !== '' ? answer : 'Creeper';
            setElementConfiguration(resultField, `Hi ${playerName}, let's start the game!`);
            // disable submit button
            submitBtn.disabled = true;
            // enable next question button
            nextBtn.disabled = false;
        } else if (possibleAnswersArray.indexOf(answer) !== -1) {
            userAnswer(answer.toLowerCase(), correctA);
        } else {
            setElementConfiguration(resultField, 'Bad input, try again');
        }
    } else {
        questionIndex === 6 ?
            (
                answer === correctA ? // answer was correct
                    (
                        userAnswer(answer, correctA)
                    ) :
                    (
                        questionSixTries < 4 ? // only allow the user to guess four times
                            (
                                answer > correctA ? // check to see if user should guess higher or lower
                                    (
                                        handleLastTwoQuestions('I would guess a little <b>lower</b>', `User has tried to answer the question ${questionSixTries} times.`),
                                        questionSixTries++
                                    ) :
                                    (
                                        handleLastTwoQuestions('I would guess a little <b>higher</b>', `User has tried to answer the question ${questionSixTries} times.`),
                                        questionSixTries++
                                    )
                            ) :
                            (
                                setElementConfiguration(resultField, 'Sorry that is all the tries you get'),
                                // enable next question button
                                nextBtn.disabled = false
                            )
                    )
            ) :
            (

                correctA.indexOf(answer.toLowerCase()) !== -1 ? // answer was found in the array
                    ( // Paula reminded me of a great method arrays have, the .join(), annotating that here
                        setElementConfiguration(resultField, `Your answer was: ${answer}, and that was <b>correct</b>! Some other choices are: ${correctA.join(', ')}.`),
                        total++,
                        // disable submit button
                        submitBtn.disabled = true,
                        // enable next question button
                        nextBtn.disabled = false
                    ) :
                    (
                        questionSevenTries < 6 ? // only allow the user to guess four times
                            (
                                handleLastTwoQuestions('I would try to guess again!', `User has tried to answer the question ${questionSevenTries} times.`),
                                questionSevenTries++
                            ) :
                            (
                                setElementConfiguration(resultField, `Sorry that is all the tries you get. The correct answers are ${correctA.join(', ')}.`),
                                // disable submit button
                                submitBtn.disabled = true,
                                // enable next question button
                                nextBtn.disabled = false
                            )
                    )
            );
    }
};

form.addEventListener('submit', handleGame);
form.addEventListener('button', changeQuestion);
