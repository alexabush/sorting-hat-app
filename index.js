const state = {
  houseCount: {
    Griffindor: 0,
    Slytherin: 0,
    Ravenclaw: 0,
    Hufflepuff: 0
  },
  questions: [],
  currentQuestionIndex: 0
};

window.addEventListener('load', function() {
  console.log('All assets are loaded');
  setUp();
});

/*
  TODO
  display answers properly,
  when answer clicked, updated state and show next answer
  add end condition
  add display result
*/

// generate questions, build initial DOM state
function setUp() {
  const main = document.querySelector('main');
  state.questions = generateQuestions();
  generateStartBtn(main);
}
// adds startbtn to DOM
function generateStartBtn(main) {
  const startBtn = document.createElement('button');
  startBtn.innerText = 'Start';
  startBtn.addEventListener('click', () => displayNextQuestion(main));
  main.appendChild(startBtn);
}
// gets next question from state, generates html based on the question, empties DOM, appends new question html to dom
function displayNextQuestion(main) {
  let question = getQuestion();
  if (!question) displayResult(main);
  else {
    emptyNode(main);
    main.appendChild(generateQuestionHTML(question));
  }
}

function displayResult(main) {
  emptyNode(main);
  let resultHTML = generateResultHTMl();
  main.appendChild(resultHTML);
}

function generateResultHTMl() {
  let resultContainer = document.createElement('div');
  let resultsTitle = document.createElement('h2');
  resultsTitle.innerText = 'Congratulations';
  let results = document.createElement('h4');
  results.innerText = `You are a ${getResult()}`;

  resultContainer.appendChild(resultsTitle);
  resultContainer.appendChild(results);
  return resultContainer;
}

function getResult() {
  let count = state.houseCount;
  let highest = 0;
  let houseWithHighestCount;
  for (let house in count) {
    if (count[house] > highest) {
      highest++;
      houseWithHighestCount = house;
    }
  }
  return houseWithHighestCount;
}

function generateQuestionHTML(question) {
  // question container
  let questionContainer = document.createElement('div');
  questionContainer.classList.add('question');

  // question text
  let questionText = document.createElement('h3');
  questionText.innerText = question.text;

  let answersHTML = generateAnswersHTML(question.answers);

  questionContainer.appendChild(questionText);
  questionContainer.appendChild(answersHTML);
  return questionContainer;
}

// returns html: form -> radio inputs
function generateAnswersHTML(answers = []) {
  // < input type = "radio" id = "answer house" name = "answer group" value = "answer text"

  let answersForm = document.createElement('form');
  answersForm.classList.add('answers');
  answersForm.addEventListener('submit', handleAnswerSubmission);
  for (let answer of answers) {
    answersForm.appendChild(generateAnswerHTML(answer));
  }
  let submitBtn = document.createElement('input');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.setAttribute('value', 'Submit');
  answersForm.appendChild(submitBtn);
  return answersForm;
}

function generateAnswerHTML(answer = {}) {
  // <label for="huey">Huey</label>
  let answerContainer = document.createElement('div');

  let answerLabel = document.createElement('label');
  answerLabel.setAttribute('for', answer.id);
  answerLabel.innerText = answer.text;

  let answerInput = document.createElement('input');
  answerInput.setAttribute('type', 'radio');
  answerInput.setAttribute('value', answer.text);
  answerInput.setAttribute('id', answer.house);
  answerInput.setAttribute('name', 'answer');

  answerContainer.appendChild(answerLabel);
  answerContainer.appendChild(answerInput);
  return answerContainer;
}

// updates state to reflect new answer, displays next question/results
function handleAnswerSubmission(e) {
  let main = document.querySelector('main');
  e.preventDefault();
  let houseName = document.querySelector('input[name="answer"]:checked').id;
  submitAnswer(houseName);
  displayNextQuestion(main);
}

function submitAnswer(answer) {
  state.houseCount[answer]++;
}

function getQuestion() {
  let question = state.questions[state.currentQuestionIndex];
  state.currentQuestionIndex++;
  return question;
}

function generateQuestions() {
  class Question {
    constructor(text = '', answers = []) {
      (this.text = text), (this.answers = answers);
    }
  }
  let questions = [];
  questions.push(
    new Question('Favorite Time of Day', [
      { text: 'Morning', house: 'Hufflepuff' },
      { text: 'Afternoon', house: 'Griffindor' },
      { text: 'Dusk', house: 'Ravenclaw' },
      { text: 'Night', house: 'Slytherin' }
    ]),
    new Question('Favorite Smell', [
      { text: 'Wood', house: 'Griffindor' },
      { text: 'Ocean', house: 'Slytherin' },
      { text: 'Paper', house: 'Ravenclaw' },
      { text: 'Home', house: 'Hufflepuff' }
    ]),
    new Question('Most Desirable', [
      { text: 'To be trusted', house: 'Griffindor' },
      { text: 'To be envied', house: 'Slytherin' },
      { text: 'To be imitated', house: 'Ravenclaw' },
      { text: 'To be praised', house: 'Hufflepuff' }
    ]),
    new Question('Favorite Pet', [
      { text: 'owl', house: 'Griffindor' },
      { text: 'snake', house: 'Slytherin' },
      { text: 'cat', house: 'Ravenclaw' },
      { text: 'toad', house: 'Hufflepuff' }
    ]),
    new Question('Most desirable power?', [
      { text: 'Flight', house: 'Griffindor' },
      { text: 'Curses', house: 'Slytherin' },
      { text: 'Apparation', house: 'Ravenclaw' },
      { text: 'Transfiguration', house: 'Hufflepuff' }
    ])
  );
  return randomSort(questions);
}

// removes all elements from node
function emptyNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

// does algo to randomly sort array, returns array
function randomSort(arr) {
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  return shuffle(arr);
}
