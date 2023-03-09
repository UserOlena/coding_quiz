// global references to an existing nodes in the document
const bodyEl = document.querySelector('body');
const mainEl = document.querySelector('main');
const timerEl = document.getElementById('timer');

// global variables
let userChoice; // stores selectEl value based on user's quiz subject choice
let quizSubject; // stores the relevant object with questions based on the userChoice value
let quizPoints = 0; // records the number of quiz answers that are correct
let secondsLeft = 60;
let timeInterval;

// HTML questions and answers object
const htmlQuestions = [
{
    question: 'Choose the correct HTML element for the largest heading:',
    answers: [
        {choice: '<head>', correct: false},
        {choice: '<heading>', correct: false},
        {choice: '<h6>', correct: false},
        {choice: '<h1>', correct: true},
    ]
},
{
    question: 'What is the correct HTML element for inserting a line break?',
    answers: [
        {choice: '<break>', correct: false},
        {choice: '<br>', correct: true},
        {choice: '<lb>', correct: false},
        {choice: '<enter>', correct: false},
    ]
},
{
    question: 'What is the correct HTML for adding a background color?',
    answers: [
        {choice: '<body style="background-color:yellow;">', correct: true},
        {choice: '<background>yellow</background>', correct: false},
        {choice: '<body bg="yellow">', correct: false},
        {choice: '<body setAttribute("style","background-color:yellow";)>', correct: false},
    ]
},
{
    question: 'What is the correct HTML for creating a hyperlink?',
    answers: [
        {choice: '<a>http://www.someAddress.com</a>', correct: false},
        {choice: '<a src="http://www.someAddress.com">someAddress</a>', correct: false},
        {choice: '<a url="http://www.someAddress">someAddress</a>', correct: false},
        {choice: '<a href="http://www.someAddress.com">someAddress</a>', correct: true},
    ]
},
{
    question: 'Which character is used to indicate an end tag?',
    answers: [
        {choice: '^', correct: false},
        {choice: '*', correct: false},
        {choice: '<', correct: false},
        {choice: '/', correct: true},
    ]
},
{
    question: 'How can you open a link in a new tab/browser window?',
    answers: [
        {choice: '<a href="url" new>', correct: false},
        {choice: '<a href="url" target="_blank">', correct: true},
        {choice: '<a href="url" target="new">', correct: false},
        {choice: '<a href="url" target="new-tab">', correct: false},
    ]
},
]

// CSS questions and answers object
const cssQuestions = [
{
    question: 'What is the correct HTML for referring to an external style sheet?',
    answers: [
        {choice: '<style src="mystyle.css">', correct: false},
        {choice: '<stylesheet>mystyle.css</stylesheet>', correct: false},
        {choice: '<link rel="stylesheet" type="text/css" href="mystyle.css">', correct: true},
        {choice: '<a href="mystyle.css">mystyle.css</a>', correct: false},
    ]
},
{
    question: 'Where in an HTML document is the correct place to refer to an external style sheet?',
    answers: [
        {choice: 'In the <head> section', correct: true},
        {choice: 'In the <body> section', correct: false},
        {choice: 'At the end of the document', correct: false},
        {choice: 'Before closing </body> tag', correct: false},
    ]
},
{
    question: 'Which is the correct CSS syntax?',
    answers: [
        {choice: '{body:color=black;}', correct: false},
        {choice: 'body:color=black;', correct: false},
        {choice: 'body {color: black;}', correct: true},
        {choice: '{body;color:black;}>', correct: false},
    ]
},
{
    question: 'How do you insert a comment in a CSS file?',
    answers: [
        {choice: '// this is a comment', correct: false},
        {choice: 'this is a comment', correct: false},
        {choice: '// this is a comment //', correct: false},
        {choice: '/* this is a comment */', correct: true},
    ]
},
{
    question: 'Which HTML tag is used to define an internal style sheet?',
    answers: [
        {choice: '<css>', correct: false},
        {choice: '<style>', correct: true},
        {choice: '<script>', correct: false},
        {choice: 'setAttribute("style", "color: somecolor;', correct: false},
    ]
},
{
    question: 'Which CSS property controls the text size?',
    answers: [
        {choice: 'text-size', correct: false},
        {choice: 'font-style', correct: false},
        {choice: 'font-size', correct: true},
        {choice: 'text-style', correct: false},
    ]
},
]

// JS questions and answers object
const jsQuestions = [
{
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
        {choice: '<script>', correct: true},
        {choice: '<javascript>', correct: false},
        {choice: '<js>', correct: false},
        {choice: '<scripting>', correct: false},
    ]
},
{
    question: 'What is the correct JavaScript syntax to change the content of the HTML element below? \n \n <p id="demo">This is a demonstration.</p>',
    answers: [
        {choice: 'document.getElementByName("p").innerHTML = "Hello World!";', correct: false},
        {choice: 'document.getElement("p").innerHTML = "Hello World!";', correct: false},
        {choice: 'document.getElementById("demo").innerHTML = "Hello World!";', correct: true},
        {choice: '#demo.innerHTML = "Hello World!";', correct: false},
    ]
},
{
    question: 'How do you write "Hello World" in an alert box?',
    answers: [
        {choice: 'msgBox("Hello World");', correct: false},
        {choice: 'msg("Hello World");', correct: false},
        {choice: 'alertBox("Hello World");', correct: false},
        {choice: 'alert("Hello World");', correct: true},
    ]
},
{
    question: 'How to write an IF statement in JavaScript?',
    answers: [
        {choice: 'if i = 5', correct: false},
        {choice: 'if i = 5 then', correct: false},
        {choice: 'if (i == 5)', correct: true},
        {choice: 'if i == 5 then', correct: false},
    ]
},
{
    question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
    answers: [
        {choice: 'if (i <> 5)', correct: false},
        {choice: 'if i =! 5 then', correct: false},
        {choice: 'if i <> 5', correct: false},
        {choice: 'if (i != 5)', correct: true},
    ]
},
{
    question: 'How does a FOR loop start?',
    answers: [
        {choice: 'for (i <= 5; i++)', correct: false},
        {choice: 'for (i = 0; i <= 5)', correct: false},
        {choice: 'for (i = 0; i <= 5; i++)', correct: true},
        {choice: 'for i = 1 to 5', correct: false},
    ]
},
]

// rendering home page onload or "Home" link click
const renderHomePage = () => {

    timerEl.classList.add('hide');

    let homePageh1El = document.createElement('h1');
    homePageh1El.textContent = 'Welcome to the Coding Quiz!';
    
    const pEl = document.createElement('p');
    pEl.textContent = 'Please select a language category from the list provided to test your language abilities. When you click on the "start quiz" button, the timer will begin counting down. You will be presented with 6 questions and given 60 seconds to answer them. If you provide an incorrect answer, the timer will be deducted by 10 seconds.';
    
    const divForSelectEl = document.createElement('div');
    divForSelectEl.classList.add('select-el-container');
    
    const labelForSelectEl = document.createElement('label');
    labelForSelectEl.textContent = 'Please choose quiz subject: ';
    
    const selectEl = document.createElement('select');
    selectEl.setAttribute('id', 'subject-select-el');
    selectEl.setAttribute('name', 'quiz-subjects');

    // dynamically add options to the select element for the home page 
    const addOptionToSelectEl = (optionTextContent, value) => {
    
        let optionEl = document.createElement('option');
        optionEl.textContent = optionTextContent;
        optionEl.setAttribute('value', value);
        
        return optionEl;
    }

    selectEl.add(addOptionToSelectEl('-- Please choose an option --', 'default'));
    selectEl.add(addOptionToSelectEl('HTML Basics', 'html'));
    selectEl.add(addOptionToSelectEl('CSS Basics', 'css'));
    selectEl.add(addOptionToSelectEl('JavaScript Basics', 'javascript'));
    
    divForSelectEl.append(labelForSelectEl, selectEl);
    
    const startQuizButton = document.createElement('button');
    startQuizButton.textContent = 'start quiz';
    startQuizButton.setAttribute('id', 'button-start-quiz')
    
    mainEl.append(homePageh1El, pEl, divForSelectEl, startQuizButton);

    
    startQuizButton.addEventListener('click', function() {

        userChoice = selectEl.value;
    
        if (userChoice === 'default') {
            alert('You need to choose Quiz Subject to start the quiz!');
        } else {
            chosenQuizSubject();
        }
    });
}


// determine the appropriate object with questions based on the user's selection of the select element and its corresponding value
const chosenQuizSubject = () => {
    
    if (userChoice === 'html') {
        quizSubject = htmlQuestions;
        renderQuizPage();
    } else if (userChoice === 'css') {
        quizSubject = cssQuestions;
        renderQuizPage();
    } else if (userChoice === 'javascript') {
        quizSubject = jsQuestions;
        renderQuizPage();
    } else {
        console.log('User choice could not be assigned to correct questions object.');
        alert('Oops! There was a problem on our end :( \n We are working on it and apologizing for causing any disappointment.');
        renderHomePage();
        return
    }
}

// called once "start quiz" button is clicked
const renderQuizPage = () => {

    mainEl.innerHTML = '';
    timerEl.classList.remove('hide');
    timerEl.textContent = '';
    quizTimer();
    index = 0;
    
    genNextQuestion();   
}


// render quiz question and answers
const genNextQuestion = () => {

    mainEl.innerHTML = '';
    bodyEl.classList.remove('wrong', 'correct');

    const questionEl = document.createElement('h1');
    questionEl.setAttribute('id', 'question');
    
    const answerButtonsEl = document.createElement('div');

    if (index >= quizSubject.length) {
        quizIsOver();
    } else {
        questionEl.textContent = quizSubject[index].question;
        
        answerButtonsEl.setAttribute('id', 'answer-buttons');
        answerButtonsEl.setAttribute('class', 'btn-grid');
        
        answerButtonsEl.appendChild(questionEl);

        let answersObjLength = quizSubject[index].answers.length;
        
        for (let j = 0; j < answersObjLength; j++) {
            let answerBtn = document.createElement('button');
            answerBtn.setAttribute('class', 'btn');
            answerBtn.textContent = quizSubject[index].answers[j].choice;
            answerBtn.dataset.correct = quizSubject[index].answers[j].correct;
            answerButtonsEl.appendChild(answerBtn);
        }
    }
    
    mainEl.appendChild(answerButtonsEl);
    
    index++;
    
    answerButtonsEl.addEventListener('click', checkAnswer);
}

// checks if user's answer was correct or wrong
const checkAnswer = (event) => {

    event.stopPropagation();
    
    let chosenButton = event.target;
    let chosenButtonAttrVal = chosenButton.getAttribute('data-correct');
    
    if (chosenButtonAttrVal === 'false') {
        if (secondsLeft <= 10) {
            chosenButton.classList.add('wrong');
            bodyEl.classList.add('wrong');
            secondsLeft = 0;
            timerEl.textContent = `Timer: 0`;
            quizIsOver();
        } else {
            chosenButton.classList.add('wrong');
            bodyEl.classList.add('wrong');
            secondsLeft -= 10;
            nextQuestionTimer();
        }
    } else if (chosenButtonAttrVal === 'true') {
        chosenButton.classList.add('correct');
        bodyEl.classList.add('correct');
        quizPoints++
        nextQuestionTimer();
    } else {
        console.log('Hello there!')
    }
}

// timer implemented to automatically load the next question
const nextQuestionTimer = () => {
    
    let nextQuestionSecondsLeft = 1;
    let nextQuestion = setInterval(function() {
    nextQuestionSecondsLeft--;
        
        if (nextQuestionSecondsLeft === 0) {

            clearInterval(nextQuestion);
            genNextQuestion();
        }
        
    }, 500);
}

// countdown timer starts when "start quiz" button is clicked
function quizTimer() {
    
    timeInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = `Timer: ${secondsLeft}`;
        
        if (secondsLeft <= 0) {

            clearInterval(timeInterval);
            timerEl.textContent = `Timer: 0`;
            quizIsOver();
        }
        
    }, 1000);
}

// the function is called when the user answers all the questions within the chosen subject or when the timer reaches the condition specified by clearInterval()
const quizIsOver = () => {
    
    //timerEl.textContent = ''
    mainEl.innerHTML = '';

    clearInterval(timeInterval);
    renderAddInitialsPage();
}

// the page displays the quiz results when either the timer reaches 0 seconds or the user answers all the questions in the chosen subject
const renderAddInitialsPage = () => {

    mainEl.innerHTML = '';
    bodyEl.classList.remove('wrong', 'correct');

    const initialsPageH1 = document.createElement('h1');
    initialsPageH1.textContent = 'Quiz is over!';
    
    const scoreNumber = document.createElement('h2');
    scoreNumber.setAttribute('id', 'score-number');
    scoreNumber.textContent = 'You scored: ';
    
    const scoreMessage = document.createElement('h3');
    scoreMessage.setAttribute('id', 'score-message');

    const initialsLabel = document.createElement('label');
    initialsLabel.setAttribute('for', 'user-initials');
    initialsLabel.textContent = 'Enter your initials to be added to High Scores Board.';

    const userInitials = document.createElement('input');
    userInitials.setAttribute('id', 'user-initials');
    userInitials.setAttribute('type', 'text');
    userInitials.setAttribute('placeholder', 'Enter your initials');
    userInitials.setAttribute('maxlength', '2');
    userInitials.setAttribute('required', 'true');

    const addInitialsBtn = document.createElement('button');
    addInitialsBtn.setAttribute('id', 'button-add-scores');
    addInitialsBtn.textContent = 'ADD';

    mainEl.append(initialsPageH1, scoreNumber, scoreMessage, initialsLabel, userInitials, addInitialsBtn);

    const quizScore = calculateScore();
    
    if (quizScore < 70) {
        scoreNumber.textContent = `${scoreNumber.innerText} ${quizScore}%`;
        scoreMessage.textContent = `With more practice, you will improve!`
    } else if (quizScore < 90) {
        scoreNumber.textContent = `${scoreNumber.innerText} ${quizScore}%`;
        scoreMessage.textContent = `That was rather impressive!`
    } else if (quizScore >= 90) {
        scoreNumber.textContent = `${scoreNumber.innerText} ${quizScore}%`;
        scoreMessage.textContent = `"Wow! That was impressive!`
    } else {
        console.log('There was a problem calculating user score in renderAddInitialsPage().');
        alert('Oops! There was a problem on our end :( \n We are working on it and apologizing for causing any disappointment.');
        renderHomePage();
        return
    }
    
    addInitialsBtn.addEventListener('click', function() {
        if (!userInitials.value) {
            alert('You must enter your initials to save your score!');
        } else if (userInitials.value.length < 2) {
            alert('Please enter initials in the format of "AB".')
        } else {
            savingQuizResult(userInitials.value, quizScore);
        }
    });
}

// retrieves an array of quiz results from localStorage, adds a new player's result to it, sorts the array by highest score, and saves it back to localStorage
const savingQuizResult = (userInitials, quizScore) => {

    let highScoresDB = JSON.parse(localStorage.getItem('highScoresDB') || '[]');
    
    if (secondsLeft < 0) {
        secondsLeft = 0;
    }

    let quizPlayer = {
        initials: userInitials.toUpperCase(),
        score: quizScore,
        timeLeft: secondsLeft,
    }

    highScoresDB.push(quizPlayer);
    highScoresDB.sort((a, b) => b.score - a.score);
    localStorage.setItem('highScoresDB', JSON.stringify(highScoresDB));
    
    renderHighScoresPage();
}

// calculates quiz score based on the number of correctly answered questions
const calculateScore = () => {

    const quizScore = Math.round(100 / quizSubject.length * quizPoints);
    return quizScore;
}

// the high scores page is constructed either when the user saves their initials or when they click the "view high scores" navigation link
const renderHighScoresPage = () => {

    clearInterval(timeInterval);
    timerEl.textContent = '';
    mainEl.innerHTML = '';

    const scorePageH1 = document.createElement('h1');
    scorePageH1.textContent = 'Quiz High Scores';

    const scoreTable = document.createElement('table');
    
    const scorePageBtnDiv = document.createElement('div');
    scorePageBtnDiv.setAttribute('class', 'btn-container');
    
    const clearScoreBtn = document.createElement('button');
    clearScoreBtn.setAttribute('id', 'button-clear-high-scores');
    clearScoreBtn.textContent = 'clear high scores';
    
    const backHomeBtn = document.createElement('button');
    backHomeBtn.setAttribute('id', 'button-home');
    backHomeBtn.textContent = 'back home';
    
    scorePageBtnDiv.append(clearScoreBtn, backHomeBtn);
    
    mainEl.append(scorePageH1, scoreTable, scorePageBtnDiv);

    const scorePageH2 = document.createElement('h2'); // will be used later inside the ()
    
    const scoreMessageH2 = () => {
        
        scorePageH2.textContent = 'No saved results yet. Perhaps your result is going to appear here first 🙂';
        mainEl.insertBefore(scorePageH2, scorePageBtnDiv);
    }
        
    // retrieves an array of saved quiz results from the browser's localStorage
    let localStorageHighScores = JSON.parse(localStorage.getItem('highScoresDB') || '[]');
        
    // iterates over an array and populates a high scores table with data retrieved from previously saved quiz results
    if (localStorageHighScores.length > 0) {
            
        scoreTable.setAttribute('id', 'high-score-table');

        const tableTR = document.createElement('tr');

        const tableTH1 = document.createElement('th');
        tableTH1.textContent = 'Player';

        const tableTH2 = document.createElement('th');
        tableTH2.textContent = 'Score';
        
        const tableTH3 = document.createElement('th');
        tableTH3.textContent = 'Remaining Seconds';

        tableTR.append(tableTH1, tableTH2, tableTH3);

        scoreTable.appendChild(tableTR);

        for (let i = 0; i < localStorageHighScores.length; i++) {
            
            const playerTR = document.createElement('tr');
            
            const playerInitials = document.createElement('td');
            playerInitials.textContent = localStorageHighScores[i].initials;
            
            const playerScore = document.createElement('td');
            playerScore.textContent = localStorageHighScores[i].score;
            
            const playerTime = document.createElement('td');
            playerTime.textContent = localStorageHighScores[i].timeLeft;

            playerTR.append(playerInitials, playerScore, playerTime); 
            scoreTable.appendChild(playerTR);
        }

    } else {

        scoreMessageH2();
    }

    clearScoreBtn.addEventListener('click', function() {
             
        scoreTable.classList.add('hide');
        
        scoreMessageH2();
        
        localStorage.clear();
    });

    backHomeBtn.addEventListener('click', homeOnClick);
}

// loads home page  on click ofo "home' nav link
const homeOnClick = () => {

    clearInterval(timeInterval);
    
    mainEl.textContent = '';

    timerEl.classList.add('hide');

    userChoice = '';
    quizSubject = '';
    quizPoints = 0;
    secondsLeft = 60;

    renderHomePage();
}

// rendering home page onload
renderHomePage();

