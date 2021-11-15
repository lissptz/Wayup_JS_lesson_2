
// варианты ответа
const option1=document.querySelector(".option1"),
      option2=document.querySelector(".option2"),
      option3=document.querySelector(".option3"),
      option4=document.querySelector(".option4");


const optionElements = document.querySelectorAll('.option');//все наши опции

const question = document.getElementById('question'); //сам вопрос

const numberOfQuestion = document.getElementById('number-of-question'),//номер вопроса
      numberOfAllQuestions = document.getElementById('number-of-all-questions');// колличество всех вопросов

let indexOfQuestion, //индекс текущего вопроса
    indexOfPage = 0; //индекс страницы

const answersTracker=document.getElementById("answers-tracker"); //обертка для трекеров
const btnNext=document.getElementById("btn-next");//кнопка далее

let score =0; //итоговый результат викторины

const correctAnswer=document.getElementById("correct-answer"),//количество правильных ответов
numberOfAllQuestions2=document.getElementById("number-of-all-questions-2"),//количество всех вопросов( в модальном окне)
btnTryAgain=document.getElementById("btn-try-again");//кнопка начать викторину заново

const questions=[
    {
    question: "Что означает аббревиатура HTML?",
    options: [
        "Helicopters Terminal Motorboats Lamborginis",
        "Hypertext Markup Laguage",
        "Hyperloop Machine Language",
        "Союз Советских Социалистических Республик",
    ],
    rightAnswers:1
},
{
    question: "Что означает аббревиатура CSS?",
    options: [
        "Cascading Style Sheets",
        "Cars SUVs Sailboats",
        "Central Style Sheets",
        "Федеральная Служба Безопасности",
    ],
    rightAnswers:0
},

{
    question: "Кто является автором языка JavaScript?",
    options: [
        "СТив Джобс",
        "Брендан Эйх",
        "Билл Гейтс",
        "Гуманоиды",
    ],
    rightAnswers:1
},
{
    question: "На каком языке написан этот проект?",
    options: [
        "Ruby",
        "C++",
        "JavaScript",
        "Говяжий",
    ],
    rightAnswers:2
}
];
numberOfAllQuestions.innerHTML = questions.length;//выводим колличество вопросов

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question;//сам вопрос

  option1.innerHTML = questions[indexOfQuestion].options[0];//пишем ответы
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера текущей страницы
  indexOfPage++;//увеличения индекса страницы
};

let completedAnswers = []; //массив для уже заданных вопросов

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false;// якорь для проверки одинаковых вопросов
  

  if(indexOfPage == questions.length) {
    quizOver()
  } else {
    if(completedAnswers.length > 0) {
      completedAnswers.forEach(item => {
        if(item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if(hitDuplicate) {
        randomQuestion();
      }else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if(completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if ( el.target.dataset.id == questions[indexOfQuestion].rightAnswers) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
    score ++;
  
}
    else{
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disableOptions();
}
for(option of optionElements){
    option.addEventListener("click", e=>checkAnswer(e));

}
const disableOptions =() => {
    optionElements.forEach(item =>{
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswers){
           item.classList.add('correct');
        }
    })
}


//удаление всех классов со всех ответов
const enableOptions=()=>{
    optionElements.forEach(item=>{
        item.classList.remove('disabled','correct','wrong');

    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement ('div');
        answersTracker.appendChild(div)
    
})
};
const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage-1].classList.add (`${status}`);
}
const validate=()=>{
    if( !optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать один из вариантов ответа');

    }
    else{
        randomQuestion();
        enableOptions();
    }
}


const quizOver=()=>{
  document.querySelector('.quiz-over-modal').classList.add('active'),
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML=questions.length;
};
const tryAgain=()=>{
    window.location.reload();
};
btnTryAgain.addEventListener('click',tryAgain);
btnNext.addEventListener('click', ()=>{
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
   answerTracker();
});