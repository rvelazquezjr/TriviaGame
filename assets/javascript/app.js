counter = 30;
    let currentQuestion = 0;
    let score = 0;
    let lost = 0;
    let timer;



function nextQuestion() {
    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        console.log('Game over man, GAME OVER!!!');
        displayResult();

    }
    else {
        currentQuestion++;
        loadQuestion();
    }
}

function timeUp() {
    clearInterval(timer);

    lost++;

    nextQuestion();


}

function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter);

    if (counter === 0) {
        timeUp();
    }
}

function loadQuestion() {
    counter = 10;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;

    $('#time').html('Timer: ' + counter);
    $('#game').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);
}

function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
}

$(document).on('click', '.choice', function () {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        console.log('Winner winner chicken dinner!!!');
        nextQuestion();
    }
    
      else {
        lost++;
        console.log("Lewhewzaher!!!");
        nextQuestion();

        
        }
    console.log("YUUUUP", selectedAnswer);
});;

function displayResult() {
    const result = `
        <p>You got ${score} question(s) RIGHT!!!</p>
        <p>You got ${lost} question(s) WRONG!!!</p>
        <p>Total questions right: ${quizQuestions.length} question(s)</p>
        <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

    $('#game').html(result);
}

$(document).on('click', '#reset', function() {
     counter = 30;
     currentQuestion = 0;
     score = 0;
     lost = 0;
     timer = null;

     loadQuestion();

    
})


function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;

}

function preLoadImage() {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === 'win') {
        $('#game'),html(`
            <p class="preload-image">Congrtulations, you picked the correct answer</p>
            <p class="preload-image">You lost, too bad</p>
        `);
    } else {
        $('#game').html(`
            <p class="preload-image">The correct answer was ${correctAnswer}</p>
        `);
    }
}

loadQuestion();



