const state = {
  houseCount: {
    h: 0,
    s: 0,
    r: 0,
    h: 0
  },
  questions: [],
  currentQuestionIndex: 0
};

window.addEventListener('load', function() {
  console.log('All assets are loaded');
  setUp();
});

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
  startBtn.addEventListener('click', () => displayQuestion(main));
  main.appendChild(startBtn);
}
// gets next question from state, generates html based on the question, empties DOM, appends new question html to dom
function displayQuestion(main) {
  let question = getQuestion();
  let questionHTML = generateQuestionHTML(question);
  emptyNode(main);
  main.appendChild(questionHTML);
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

function generateAnswersHTML(answers) {
  // < input type = "radio" id = "answer house" name = "answer group" value = "answer text"

  let answersForm = document.createElement('form');
  answersForm.classList.add('answers');
  for (let answer of answers) {
    let answerBtn = document.createElement('input');
    answerBtn.setAttribute('type', 'radio');
    answerBtn.setAttribute('value', answer.text);
    answerBtn.setAttribute('id', answer.house);
    answerBtn.setAttribute('name', 'answer');
    answersForm.appendChild(answerBtn);
  }
  return answersForm;
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
    new Question('q1', [
      { text: 'a1', house: 'g' },
      { text: 'a2', house: 's' },
      { text: 'a3', house: 'r' },
      { text: 'a4', house: 'h' }
    ]),
    new Question('q2', [
      { text: 'a1', house: 'g' },
      { text: 'a2', house: 's' },
      { text: 'a3', house: 'r' },
      { text: 'a4', house: 'h' }
    ]),
    new Question('q3', [
      { text: 'a1', house: 'g' },
      { text: 'a2', house: 's' },
      { text: 'a3', house: 'r' },
      { text: 'a4', house: 'h' }
    ]),
    new Question('q4', [
      { text: 'a1', house: 'g' },
      { text: 'a2', house: 's' },
      { text: 'a3', house: 'r' },
      { text: 'a4', house: 'h' }
    ])
  );
  return randomSort(questions);
}

function emptyNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

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
